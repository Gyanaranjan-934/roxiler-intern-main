import { asyncHandler } from '../../utils/asyncHandler.js';
import { Product } from '../models/product.js';

const getMonthlyData = asyncHandler(async (req, res) => {
    try {
        const { month } = req.query;
        if (month) {
            let allProducts = [];
            // find all the products of the month first
            allProducts = await Product.find({
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, parseInt(month)]
                }
            });
            let totAmount = 0.0;
            let soldItems = 0;
            let unsoldItems = 0;
            let productCnt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            allProducts.map((product) => {
                // classify according to the price range
                const price = product.price.toFixed(2);
                let rem = Math.floor(price % 100);
                let quo = Math.floor(price / 100);
                if (price > 900.00) {
                    productCnt[9]++;
                } else {
                    if (rem == 0) {
                        productCnt[(quo) - 1]++;
                    } else {
                        productCnt[(quo)]++;
                    }
                }

                // classify the product sold and unsold
                if (product.sold) soldItems++;
                else unsoldItems++;
                totAmount += parseFloat(product.price)

            })
            // classify according to the category of product
            const groupedCategories = allProducts.reduce((result, product) => {
                const { category } = product;
                result[category] = (result[category] || 0) + 1;
                return result;
            }, {});

            res.status(200).json({
                "price-range-products":productCnt,
                "total sale amount":totAmount,
                "total product sold":soldItems,
                "total unsold products":unsoldItems,
                "product categories": groupedCategories
            })
        }else{
            res.status(404).json({ message: "Please select a month first" })
        }
    } catch (error) {
        console.error('Error finding the data of the month:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default getMonthlyData