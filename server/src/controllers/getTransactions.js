import { asyncHandler } from "../../utils/asyncHandler.js";
import { Product } from "../models/product.js";

const getAllTransactions = asyncHandler(async (req, res) => {
    try {
        console.log(req.query);
        const { month, searchName, pageNumber, itemsPerPage } = req.query;
        
        let filter = {};
        if (searchName) {
            filter = {
                $or: [
                    { name: { $regex: searchName, $options: 'i' } },
                    { description: { $regex: searchName, $options: 'i' } },
                    { category: { $regex: searchName, $options: 'i' } },
                    { price: parseFloat(searchName) || 0 },
                ],
            };
        }
        let results;
        if (month) {
            // console.log("months diya he");
            let monthInt = parseInt(month);
            if(monthInt>0){
                filter.$expr = {
                    $and: [
                        { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
                    ],
                };
            }
        }
        results = await Product.find(filter)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(parseInt(itemsPerPage));

        res.status(200).json({ results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default getAllTransactions;
