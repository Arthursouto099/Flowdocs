import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import { usersController } from "../../controllers/users.controllers";



const userRouter = Router()

userRouter.get("/all", authMiddleware, usersController.getAll)
userRouter.get("/:id", usersController.getUnique )
userRouter.post("/create", usersController.create)
userRouter.put("/update/:id", authMiddleware, usersController.update )
userRouter.delete("/delete", authMiddleware, usersController.delete)

export default userRouter