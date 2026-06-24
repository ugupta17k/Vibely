import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"


export async function authMiddleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers.token as string
  if (!token) {
    res.status(403).send({
      message: "Token not found",
    });
    return;
  }
  let decode;
  try {
    decode = jwt.verify(token, "vibely123");
  } catch (error) {
    res.status(403).send({
      message: "Invalid token",
    });
    return;
  }

  const userId = '';
  if (!userId) {
    res.status(403).send({
      message: "Userid not found",
    });
    return;
  }
  req.userId = userId;
  next();
}
}