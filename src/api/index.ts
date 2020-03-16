import { Router } from "express";
import { UserRoutes } from "./routes/user";

export class Routes {
  app: Router = Router();

  constructor() {
    this.init();
  }

  private init(): void {
    new UserRoutes(this.app);
  }
}
