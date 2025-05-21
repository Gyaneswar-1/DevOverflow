import { type Request, type Response } from "express";
export const healthCheck = (req: Request, res: Response) => {
  try {
    res.json({hello:"hello World 🌏"}).status(200)
  } catch (error) {}
};
