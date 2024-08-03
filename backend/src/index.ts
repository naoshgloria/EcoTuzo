import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import myshopRoutes from "./routes/my-shops";
import shopRoutes from "./routes/shops";
import bookingRoutes from "./routes/my-bookings";
import redeemRoutes from './routes/users';
import Shop from "./models/shop";
import redeemModel from "./redeemModel.";


// ??PASS ="zdssyW9syzhZPVGm"

cloudinary.config({
  cloud_name: "dbzzdkgru",
  api_key: "866173369285343",
  api_secret: "C-OBvl0qOuR2ta-F6JVxmXOkajc",
});

mongoose.connect("mongodb+srv://naoshgloria:noPaDBEphgdREId9@cluster0.og99qtu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").catch((error) =>{
  console.log(error)}
);


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api', userRoutes);
app.use("/api/my-shops", myshopRoutes);
app.use("/api", shopRoutes);
app.use("/api/my-bookings", bookingRoutes);


// const approveRedeemRequest = async (req: Request, res: Response) => {
//   try {
//     const { userId, shopId, Collection, points } = req.body;

//     const shop = await Shop.findById(shopId);

//     // Uncomment these lines if you want to handle shop data updates
//     // if (!shop) {
//     //   return res.status(404).json({ message: "Shop not found" });
//     // }

//     // shop.childCount += points;
//     // shop.collection += Collection;

//     // const updatedShop = await shop.save();

//     const redeemRequest = new redeemModel({
//       userId,
//       shopId,
//       Collection,
//       points,
//       status: 'pending'
//     });

//     const savedRedeemRequest = await redeemRequest.save();

//     res.json({
//       message: "successful",
//       redeemRequest: savedRedeemRequest
//     });
//   } catch (error) {
//     console.error("Error processing redemption request:", error);
//     res.status(500).json({ message: "Error processing redemption request", error: error });
//   }
// };


// app.use('/api/redeem', (req: Request, res: Response) => {
//   if (req.method === 'POST') {
//     approveRedeemRequest(req, res);
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// });


app.get('/shops', async (req: Request, res: Response) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

app.post('/shops', async (req: Request, res: Response) => {
  const shop = new Shop(req.body);
  try {
    const savedShop = await shop.save();
    res.status(201).json(savedShop);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

app.delete('/shops/:id', async (req: Request, res: Response) => {
  try {
    await Shop.findByIdAndDelete(req.params.id);
    res.json({ message: 'Shop deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});
app.get('/shops', async (req: Request, res: Response) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

app.get('/shops/admin/:adminId', async (req: Request, res: Response) => {
  const { adminId } = req.params;
  try {
    const shops = await Shop.find({ adminId });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

app.post('/shops', async (req: Request, res: Response) => {
  const shop = new Shop(req.body);
  try {
    const savedShop = await shop.save();
    res.status(201).json(savedShop);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

app.delete('/shops/:id', async (req: Request, res: Response) => {
  try {
    await Shop.findByIdAndDelete(req.params.id);
    res.json({ message: 'Shop deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});
// app.get("*", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
// });

app.listen(7012, () => {
  console.log("server running on localhost:7012");
});
