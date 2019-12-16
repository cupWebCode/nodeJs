import "reflect-metadata";
import { Router, Request, Response } from "express";
import Container from "typedi";
import { UserService } from "../../services/user.service";
import {
  userValidator,
  userBodySchema,
  UserBodySchema
} from "../validators/user.validator";
import { ExpressJoiInstance, ValidatedRequest } from "express-joi-validation";

import { IdGeneratorService } from "../../services/id-generator.service";

export class UserRoutes {
  private route = Router();

  private userService = Container.get(UserService);
  private generateId = Container.get(IdGeneratorService).generateId;

  private userValidator: ExpressJoiInstance = userValidator;
  private userBodySchema = userBodySchema;

  constructor(private app: Router) {
    this.init();
  }

  private init(): void {
    this.app.use("/user", this.route);

    this.route.post(
      "/",
      this.generateId,
      this.userValidator.body(this.userBodySchema),
      (req: ValidatedRequest<UserBodySchema>, res: Response) => {
        this.userService.createUser(req.body);
        return res.json({ user: "Created" });
      }
    );

    this.route.get("/list", (req: Request, res: Response, next) => {
      // GET get all users
      const usersList = this.userService.getAllUsers();

      return res
        .json({ user: `Show list of all users` })
        .status(200)
        .end(); // TODO
    });

    this.route.get("/", (req: Request, res: Response) => {
      console.log("Request Id:", req.params);

      const userId = req.headers.id as string;
      const userData = this.userService.getUser(userId);

      return res
        .json({ user: userData })
        .status(200)
        .end(); // TODO
    });

    this.route.put(
      "/edit",
      this.userValidator.body(this.userBodySchema),
      (req: Request, res: Response) => {
        this.userService.updateUser(req.body);
        return res.json({ user: "Has updated" }).status(200); // TODO
      }
    );

    this.route.delete("/delete", (req: Request, res: Response) => {
      const userId = req.headers.id as string;
      this.userService.deleteUser(userId);
      return res.json({ user: "Has deleted" }).status(200); // TODO
    });
  }
}
