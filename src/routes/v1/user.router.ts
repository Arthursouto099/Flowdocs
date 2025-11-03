import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import { usersController } from "../../controllers/users.controllers";
import { authController } from "../../controllers/auth.controller";



const userRouter = Router()



userRouter.post("/login", authController.login)
userRouter.get("/all", authMiddleware, usersController.getAll)
userRouter.get("/:id", usersController.getUnique )
userRouter.post("/create", usersController.create)
userRouter.put("/update/:id", authMiddleware, usersController.update )
userRouter.delete("/delete", authMiddleware, usersController.delete)

export default userRouter