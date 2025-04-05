import express, { Request, Response, RequestHandler } from "express";
import { HealthMetric } from "../models/health-metrics";

//Create a new health metric
export const createHealthMetric: RequestHandler = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { userId, healthMetric, value, unit, timestamp } = req.body;
        const newHealthMetric = new HealthMetric({
            userId,
            healthMetric,
            value,
            unit,
            timestamp,
        });
        await newHealthMetric.save();
        res.status(201).json(newHealthMetric);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating health metric" });
    }
};

//Get all health metrics
export const getHealthMetrics: RequestHandler = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const healthMetrics = await HealthMetric.find();
        res.status(200).json(healthMetrics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching health metrics" });
    }
};

//Get a health metric by ID
export const getHealthMetricById: RequestHandler = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        const healthMetric = await HealthMetric.findById(id);
        if (!healthMetric) {
            res.status(404).json({ message: "Health metric not found" });
            return;
        }
        res.status(200).json(healthMetric);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching health metric" });
    }
};

//Update a health metric by ID
export const updateHealthMetric: RequestHandler = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId, healthMetric, value, unit, timestamp } = req.body;

        const updatedHealthMetric = await HealthMetric.findByIdAndUpdate(
            id,
            { userId, healthMetric, value, unit, timestamp },
            { new: true },
        );

        if (!updatedHealthMetric) {
            res.status(404).json({ message: "Health metric not found" });
            return;
        }

        res.status(200).json(updatedHealthMetric);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating health metric" });
    }
};

//Delete a health metric by ID
export const deleteHealthMetric: RequestHandler = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedHealthMetric = await HealthMetric.findByIdAndDelete(id);
        if (!deletedHealthMetric) {
            res.status(404).json({ message: "Health metric not found" });
            return;
        }
        res.status(200).json({ message: "Health metric has been deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting health metric" });
    }
};

//Get health metrics by user ID
export const getHealthMetricsByUserId: RequestHandler = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { userId } = req.params;
        const healthMetrics = await HealthMetric.find({ userId });
        res.status(200).json(healthMetrics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching health metrics" });
    }
};
