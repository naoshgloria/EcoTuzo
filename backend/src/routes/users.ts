import express, { Request, Response, response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";
import { UserType } from "../shared/types";
import { createRedeemRequest,  rejectRedeemRequest } from '../controllers/redeemController';

import { getUsers, approveUser, rejectUser } from '../controllers/userConroller';

const router = express.Router();
router.get('/users', getUsers);
router.post('/users/:id/approve', approveUser);
router.post('/users/:id/reject', rejectUser);
router.post('/redeem', createRedeemRequest);
router.post('/redeem/:id/reject', rejectRedeemRequest);
router.put("/:id", async (req :Request, res:Response) => {
  try {
    const post = await User.findByIdAndUpdate(
      req.params,
      { role: req.body.role },
      { new: true }
    );
    if (!post) return res.status(404).send("not found");
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/find/:id", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/allUser", verifyToken, async (req: Request, res: Response) => {
  

  try {
    const user = await User.find().select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});



router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("PhoneNumber", "Phone Number is required").isNumeric(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        "secretekey",
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).send({ message: "User registered OK" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);


  


// Get a single post by id






export default router;








