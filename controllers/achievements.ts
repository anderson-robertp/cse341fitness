import express, { Request, Response, RequestHandler } from "express";
import { Achievement, UserAchievement } from "../models/achievement";

 const achievementsRouter = express.Router();

/**
 * @swagger
 * /achievements:
 *   post:
 *     tags:
 *       - Achievements
 *     description: Create a new achievement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               progressGoal:
 *                 type: number
 *     responses:
 *       201:
 *         description: Achievement created successfully
 *       400:
 *         description: Invalid input
 */
export const createAchievement: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, description, progressGoal } = req.body;
      const achievement = new Achievement({ title, description, progressGoal });
      await achievement.save();
      res.status(201).json(achievement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating achievement" });
    }
  };
  achievementsRouter.post("/", createAchievement);


/**
 * @swagger
 *  /achievements:
 *   get:
 *     tags:
 *       - Achievements
 *     description: Get all achievements
 *     responses:
 *       200:
 *         description: A list of achievements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   progressGoal:
 *                     type: number
 */

export const getAchievements: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const achievements = await Achievement.find();
        res.status(200).json(achievements); // Call res directly instead of returning it
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching achievements' });
    }
};

achievementsRouter.get("/", getAchievements);

/**
 * @swagger
 * /achievements/{id}:
 *   get:
 *     tags:
 *       - Achievements
 *     description: Get an achievement by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the achievement to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The achievement details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 progressGoal:
 *                   type: number
 *       404:
 *         description: Achievement not found
 *       500:
 *         description: Error fetching achievement
 */
export const getAchievementById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const achievement = await Achievement.findById(id);
        if (!achievement) {
            res.status(404).json({ message: "Achievement not found" });
            return;
        }
        res.status(200).json(achievement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching achievement" });
    }
};

achievementsRouter.get("/:id", getAchievementById);

/**
 * @swagger
 * /achievements/{id}:
 *   put:
 *     tags:
 *       - Achievements
 *     description: Update an achievement by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the achievement to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               progressGoal:
 *                 type: number
 *     responses:
 *       200:
 *         description: Achievement updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 progressGoal:
 *                   type: number
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Achievement not found
 *       500:
 *         description: Error updating achievement
 */
export const updateAchievement: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description, progressGoal } = req.body;

        // Find the achievement by ID
        const achievement = await Achievement.findById(id);

        if (!achievement) {
            res.status(404).json({ message: "Achievement not found" });
            return;
        }

        // Update the fields
        achievement.title = title || achievement.title;
        achievement.description = description || achievement.description;
        achievement.progressGoal = progressGoal || achievement.progressGoal;

        // Save the updated achievement
        await achievement.save();

        res.status(200).json({ message: "Achievement has been updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating achievement" });
    }
};

achievementsRouter.put("/:id", updateAchievement);


 /**
 * @swagger
 * /achievements/{id}:
 *   delete:
 *     tags:
 *       - Achievements
 *     description: Delete an achievement by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true  
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Achievement deleted successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Achievement not found
 *       500:
 *         description: Error deleting achievement
 */
 export const deleteAchievement: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const achievement = await Achievement.findByIdAndDelete(id);
        if (achievement) {
            res.status(200).json({ message: 'Achievement deleted successfully' });
        } else {
            res.status(404).json({ message: 'Achievement not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting achievement' });
    }
};

achievementsRouter.delete("/:id", deleteAchievement);

export default achievementsRouter;
