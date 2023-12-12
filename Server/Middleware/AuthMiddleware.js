import Jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";

// Middleware bảo vệ các tuyến đường
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Trích xuất token từ tiêu đề Authorization
      token = req.headers.authorization.split(" ")[1];

      // Giải mã token và đặt req.user
      const decoded = Jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Không được ủy quyền, token không hợp lệ");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Không được ủy quyền, không có token");
  }
});


const admin =(req,res,next)=>{
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};
export {protect,admin};
