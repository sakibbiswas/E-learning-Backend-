"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminAnalytics = void 0;
const adminAnalytics_service_1 = require("../services/adminAnalytics.service");
const getAdminAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const analytics = yield (0, adminAnalytics_service_1.fetchAdminAnalytics)();
        res.json(analytics);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch analytics", error });
    }
});
exports.getAdminAnalytics = getAdminAnalytics;
