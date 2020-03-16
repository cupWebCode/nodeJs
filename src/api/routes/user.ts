import "reflect-metadata";
import express, { Router, Request, Response, NextFunction } from "express";
import Container from "typedi";
import { UserValidatorService } from "../validators/user.validator";

import { UserService } from "../../services/user.service";
import { IdGeneratorService } from "../../services/id-generator.service";

export class UserRoutes {
  private router = Router();

  private userService = Container.get(UserService);
  private generateId = Container.get(IdGeneratorService).generateId;
  private validator = Container.get(UserValidatorService);

  constructor(private app: Router) {
    this.init();
  }

  private init(): void {
    this.app.use("/user", this.router);

    this.router.post(
      "/",
      this.generateId,
      this.validator.checkCreateUser,
      (req: Request, res: Response) => {
        this.userService.createUser(req.body);
        res
          .json({ message: `User ${req.body.login} was created successfully.` })
          .status(200);
      }
    );

    this.router.get(
      "/list",
      this.validator.checkGetUserList,
      (req: Request, res: Response, next: NextFunction) => {
        const usersList = this.userService.getSortedUserList(req.headers);
        if (usersList.length) {
          return res.json({ userList: usersList }).status(200);
        }
        res.json({ message: "Users weren't found." }).status(200);
      }
    );

    this.router.get(
      "/",
      this.validator.checkGetUser,
      (req: Request, res: Response) => {
        const userData = this.userService.getUser(req.headers.id as string);

        if (userData) {
          return res.json({ user: userData }).status(200);
        }
        res
          .status(204)
          .json({ message: "User with specified ID was't found." });
      }
    );

    this.router.put(
      "/edit",
      this.validator.checkCreateUser,
      (req: Request, res: Response) => {
        if (this.userService.updateUser(req.body)) {
          return res
            .json({ message: "User data was updated successfully." })
            .status(200);
        }
        res
          .status(204)
          .json({ message: "User with specified ID was't found." });
      }
    );

    this.router.delete(
      "/delete",
      this.validator.checkGetUser,
      (req: Request, res: Response) => {
        const isUserDeleted = this.userService.deleteUser(
          req.headers.id as string
        );
        if (isUserDeleted) {
          res.json({ user: "User was successfully deleted" }).status(200);
          return;
        }
        res
          .status(204)
          .json({ message: "User with specified ID was't found." });
      }
    );
  }
}
