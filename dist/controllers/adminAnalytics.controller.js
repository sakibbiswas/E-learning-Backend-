"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminAnalytics = void 0;
const adminAnalytics_service_1 = require("../services/adminAnalytics.service");
const getAdminAnalytics = async (req, res) => {
    try {
        const analytics = await (0, adminAnalytics_service_1.fetchAdminAnalytics)();
        res.json(analytics);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch analytics", error });
    }
};
exports.getAdminAnalytics = getAdminAnalytics;
