import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { shopType } from "../shared/types";
import Shop from "../models/shop";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("shop type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newshop: shopType = req.body;

      const imageUrls = await uploadImages(imageFiles);

      newshop.imageUrls = imageUrls;
      newshop.lastUpdated = new Date();
      newshop.userId = req.userId;

      const shop = new Shop(newshop);
      await shop.save();

      res.status(201).send(shop);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const shops = await Shop.find({ userId: req.userId });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shops" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const shop = await Shop.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shops" });
  }
});

router.put(
  "/:shopId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedshop: shopType = req.body;
      updatedshop.lastUpdated = new Date();

      const shop = await Shop.findOneAndUpdate(
        {
          _id: req.params.shopId,
          userId: req.userId,
        },
        updatedshop,
        { new: true }
      );

      if (!shop) {
        return res.status(404).json({ message: "shop not found" });
      }

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);

      shop.imageUrls = [
        ...updatedImageUrls,
        ...(updatedshop.imageUrls || []),
      ];

      await shop.save();
      res.status(201).json(shop);
    } catch (error) {
      res.status(500).json({ message: "Something went throw" });
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
