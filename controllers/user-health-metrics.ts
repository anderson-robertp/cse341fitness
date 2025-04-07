import { Request, Response } from "express";
import { UserHealthMetrics } from "../models/user-health-metrics"; // Adjust import path
import { Types } from "mongoose"; // Import Types for ObjectId validation

// Get all health records for a user
export const getUserHealthMetrics = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { userId } = req.params;
        console.log(`Fetching health metrics for userId: ${userId}`); // Debug log to check the userId

        //Validate userId format (optional, depending on your requirements)
        if (!Types.ObjectId.isValid(userId)) {
            console.log(`Invalid userId format: ${userId}`); // Debug log for invalid userId
            return res.status(400).json({ message: "Invalid userId format" });
        } else {
            console.log(`Valid userId format: ${userId}`); // Debug log for valid userId
        }

        const userObjectId = new Types.ObjectId(userId); // Convert userId to ObjectId
        console.log(`Converted userId to ObjectId: ${userObjectId}`); // Debug log to check the conversion

        const healthMetrics = await UserHealthMetrics.find({
            userId: userObjectId,
        }).sort({ timestamp: -1 }); // Sort by timestamp in descending order
        if (healthMetrics.length === 0) {
            console.log(`No health metrics found for userId: ${userId}`); // Debug log if no records found
            return res
                .status(404)
                .json({ message: "No health records found for this user" });
        }

        // If records are found, return them in descending order of timestamp
        console.log(
            `Found ${healthMetrics.length} health metrics for userId: ${userId}`,
        ); // Debug log to check the number of records found
        return res.status(200).json(healthMetrics);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error fetching user health metrics", error });
    }
};

// Get the latest health record for a user
export const getLatestUserHealthMetrics = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { userId } = req.params;
        const latestMetric = await UserHealthMetrics.findOne({ userId }).sort({
            timestamp: -1,
        });
        if (!latestMetric)
            return res.status(404).json({ message: "No health records found" });
        return res.status(200).json(latestMetric);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error fetching latest health metric", error });
    }
};

// Get All health records for testing only (not recommended for production use)
export const getAllUserHealthMetrics = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "dev") {
        try {
            const healthMetrics = await UserHealthMetrics.find().sort({
                timestamp: -1,
            });
            if (healthMetrics.length === 0)
                return res
                    .status(404)
                    .json({ message: "No health records found" });
            return res.status(200).json(healthMetrics);
        } catch (error) {
            return res.status(500).json({
                message: "Error fetching all user health metrics",
                error,
            });
        }
    } else {
        // Return 403 Forbidden if not in test environment
        return res.status(403).json({
            message:
                "Access to this endpoint is restricted to test environment only",
        });
    }
};

// Add a new health record
export const addUserHealthMetric = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { userId } = req.params; // Extract userId from request parameters
        const { metrics } = req.body; // Extract metrics directly from request body

        // Debugging logs
        //console.log("Incoming userId:", userId);
        //console.log("Full req.body:", JSON.stringify(req.body, null, 2));
        //console.log("metrics:", req.body.metrics);
        //console.log(`Received metrics: ${JSON.stringify(metrics)}`);

        // Validate userId format (optional)
        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        const userObjectId = new Types.ObjectId(userId); // Convert userId to ObjectId

        // Adding health metric for the user
        console.log(
            `Adding health metric for userId: ${userId} with metrics: ${JSON.stringify(
                metrics,
            )}`,
        );

        const timestamp = new Date(); // Set current timestamp
        const newMetric = new UserHealthMetrics({
            userId: userObjectId, // Store userId as an ObjectId
            metrics, // Store the received metrics
            timestamp, // Timestamp for the record
        });

        // Save the new metric to the database
        await newMetric.save();

        return res
            .status(201)
            .json({ message: "Health metric added", data: newMetric });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res
            .status(500)
            .json({ message: "Error adding health metric", error });
    }
};

// Delete a health record
export const deleteUserHealthMetric = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        const deletedMetric = await UserHealthMetrics.deleteOne({ _id: id });
        if (!deletedMetric)
            return res.status(404).json({ message: "Health metric not found" });
        return res
            .status(200)
            .json({ message: "Health metric deleted", data: deletedMetric });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error deleting health metric", error });
    }
};
