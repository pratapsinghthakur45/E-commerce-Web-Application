import Order from "../models/order.js";
import Product from "../models/product.js";

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
        let user = req.user;
        if(!user){
            return res.status(401).json({message:"unauthorized:"});
        }
        const userId = req.user.id;
        user = await Order.findOne({user:userId});

        if(!user){
            return res.status(404).json({message:"User Order Not Found:"});
        }
        const userOrders = await Order.find({user:userId});
        

        return res.status(200).json({message:"All User Orders fetched successfully:" ,order:userOrders});


    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error:"});
    }
}


//get one order details
export const order = async (req,res)=>{
    try {
        if(!req.user){
            return res.status(401).json({message:"unauthorized:"});
        }
        const userId = req.user.id;
        const user = await Order.findOne({user:userId});

        if(!user){
            return res.status(404).json({message:"User Order Not Found:"});
        }
        const orderId = req.params.id;

        const order = await Order.findById(orderId);

        if(!orderId){
            return res.status(404).json({message:"Order Not Found:"});
        }

        return res.status(200).json({message:"Order fetched successfully:",order});


    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error:"});
    }
}

//get admin orders
export const adminOrders = async (req,res) => {
    try {
        const user = req.user;

        //user logged in or not
        if(!user){
            return res.status(401).json({message:"Unauthrized:"});
        }

        //checking user is have admin role or not
        if(user.role !== 'admin'){
            return res.status(403).json({message:"Unauthorized"});
        }

        const order = await Order.find();

        return res.status(200).json({message:"Orders fetched successfully:",order});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error:"});
    }
}

//get one orders details
export const adminOneOrderDetails = async (req,res) => {
      try {
        const user = req.user;
      if(!user){
        return res.status(401).json({message:"Unauthorized:"});
      }

      if(user.role !== 'admin'){
        return res.status(403).json({message:"Unauthorized:"});
      }

      const orderId = req.params.id;

      const order = await Order.findById(orderId);

      if(!order){
        return res.status(404).json({message:"Order not found:"})
      }
      return res.status(200).json({message:"Order details:",order});
      } catch (error){
        console.log(error);
        return res.status(500).json({message:"Internal Server Error:"});
      }
}

//admin status change of order
export const statusChange = async (req,res) => {
   try {
    const user = req.user;
      if(!user){
        return res.status(401).json({message:"Unauthorized:"});
      }

      if(user.role !== 'admin'){
        return res.status(403).json({message:"Unauthorized:"});
      }

      const orderId = req.params.id;
      

      const order = await Order.findById(orderId);

      if(!order){
        return res.status(404).json({message:"Order not found:",order})
      }

      const{status} = req.body;

      const response = await Order.findByIdAndUpdate(orderId,{status:status},{
        new:true,
        runValidators: true
      });

      return res.status(200).json({message:"Update Order Status:",response});
    } catch (error){
        console.log(error);
        return res.status(500).json({message:"Internal Sever Error"});
    }
}