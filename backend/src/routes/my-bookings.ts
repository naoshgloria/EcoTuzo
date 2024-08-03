import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import shop from "../models/shop";
import { shopType } from "../shared/types";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const shops = await shop.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const results = shops.map((shop) => {
      const userBookings = shop.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const shopWithUserBookings: shopType = {
        ...shop.toObject(),
        bookings: userBookings,
      };

      return shopWithUserBookings;
    });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

export default router;
