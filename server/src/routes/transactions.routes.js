import { Router } from "express";
import getAllTransactions from "../controllers/getTransactions.js";
import getStatistics from "../controllers/statisticsController.js";
import getProductsInRange from "../controllers/getItemsPriceRange.js";
import getProductCategories from "../controllers/getProductCategories.js";
import getMonthlyData from "../controllers/getMonthlyData.js";
const router = Router();
router.route('/get-transactions').get(getAllTransactions)
router.route('/get-statistics').get(getStatistics)
router.route('/get-products-in-range').get(getProductsInRange)
router.route('/get-products-categories').get(getProductCategories)
router.route('/get-month-data').get(getMonthlyData)
export default router;