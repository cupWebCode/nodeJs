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
        this.userService.createUser(req.body)
          .then(() => {
            res
              .json({ message: `User ${req.body.login} was created successfully.` })
              .status(200);
          })
          .catch(e => console.error(e.stack));
      }
    );

    this.router.get(
      "/list",
      this.validator.checkGetUserList,
      (req: Request, res: Response, next: NextFunction) => {

        this.userService.getSortedUserList(req.headers)
          .then(data => {
            if (data.length) {
              return res.json({ userList: data }).status(200);
            }

            res.json({ message: "Users weren't found." }).status(200);
          })
          .catch(e => console.error(e.stack));
      }
    );

    this.router.get(
      "/",
      this.validator.checkGetUser,
      (req: Request, res: Response) => {
        this.userService.getUser(req.headers.id as string)
          .then(data => {
            if (data.rowCount) {
              const user = data.rows[0];
              return res.json({ user }).status(200);
            }
            res
              .status(204)
              .json({ message: "User with specified ID was't found." });
          })
          .catch(e => console.error(e.stack));
      }
    );

    this.router.put(
      "/edit",
      this.validator.checkCreateUser,
      (req: Request, res: Response) => {

        this.userService.updateUser(req.body)
          .then((status: boolean) => {
            if (status) {
              return res
                .json({ message: "User data was updated successfully." })
                .status(200);
            }
            res
              .status(204)
              .json({ message: "User with specified ID was't found." });
          })
          .catch(e => console.error(e.stack));
      }
    );

    this.router.delete(
      "/delete",
      this.validator.checkGetUser,
      (req: Request, res: Response) => {

        this.userService.deleteUser(req.headers.id as string)
          .then((status: boolean) => {
            if (status) {
              return res.json({ user: "User was successfully deleted" }).status(200);
            }
            res
              .status(204)
              .json({ message: "User with specified ID was't found." });
          })
          .catch(e => console.error(e.stack));
      }
    );
  }
}
