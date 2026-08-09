import Order from "../models/order.js";

// Place Order
export const placeOrder = async (req, res) => {
    try {
        // 1. Verify user
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // 2. Get product ID
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required"
            });
        }

        // 3. Find product
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // 4. Get ordered quantity
        const data = req.body;
        
        const orderProductQuantity = req.body.products[0].quantity;

        if (!orderProductQuantity || orderProductQuantity < 1) {
            return res.status(400).json({
                message: "Invalid quantity"
            });
        }

        // 5. Check available stock
        if (orderProductQuantity > product.quantity) {
            return res.status(400).json({
                message: "Quantity not enough"
            });
        }

        // 6. Create order data
        const orderData = {
            ...req.body,
            user: req.user.id,
            product: productId
        };

        // 7. Create order
        const newOrder = new Order(orderData);

        const savedOrder = await newOrder.save();

        // 8. Reduce product stock
        product.quantity -= orderProductQuantity;

        await product.save();

        // 9. Send response
        return res.status(201).json({
            message: "Order placed successfully",
            order: savedOrder,
            remainingStock: product.quantity
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

//get all order history
export const orders = async (req,res) => {
     try {
        if(!req.user){
            return res.status(401).json({message:"unauthorized:"});
        }

        const order = await Order.find();
        

        return res.status(200).json({message:"All Orders fetched successfully:" ,order:order});


    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error:"});
    }
}