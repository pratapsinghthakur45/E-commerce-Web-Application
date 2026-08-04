import Cart from '../models/cart.js';


// Add Product to Cart
export const addProductInCart = async (req, res) => {
    try {
        // Logged in user
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // Product ID
        const productId = req.params.id;

        // Check whether product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Find user's cart
        let cart = await Cart.findOne({ user: user.id });

        // If cart doesn't exist, create one
        if (!cart) {
            cart = new Cart({
                user: user.id,
                products: [
                    {
                        product: productId,
                        quantity: 1
                    }
                ]
            });

            await cart.save();

            return res.status(201).json({
                message: "Cart created and product added",
                cart
            });
        }

        // Check if product already exists in cart
        const existingProduct = cart.products.find(
            (item) => item.product.toString() === productId
        );

        if (existingProduct) {
            // Increase quantity
            existingProduct.quantity += 1;
        } else {
            // Add new product
            cart.products.push({
                product: productId,
                quantity: 1
            });
        }

        await cart.save();

        return res.status(200).json({
            message: "Product added to cart successfully",
            cart
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

//get cart
export const getCart = async (req,res) => {
    try {
        const user = req.user;

        //if user not logged in
        if(!user){
            return res.status(401).json({message:"Unauthorized:"});
        }

        const cart = await Cart.findOne({user:user.id}).populate("products.product");;//find cart

        //if cart does not exist
        if(!cart){
            return res.status(404).json({message:"Cart is empty:"});
        }

        return res.status(200).json({message:"Cart fetched successfully:",cart});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error:"});
    }
}

// Remove Product from Cart
export const removeProduct = async (req, res) => {
    try {
        const user = req.user;

        // Check if user is logged in
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // Get product ID
        const productId = req.params.id;

        // Find user's cart
        const cart = await Cart.findOne({ user: user.id });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        // Find product inside cart
        const existingProduct = cart.products.find(
            (item) => item.product.toString() === productId
        );

        if (!existingProduct) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        // Decrease quantity or remove product completely
        if (existingProduct.quantity > 1) {
            existingProduct.quantity -= 1;
        } else {
            cart.products = cart.products.filter(
                (item) => item.product.toString() !== productId
            );
        }

        await cart.save();

        return res.status(200).json({
            message: "Product removed successfully",
            cart
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};