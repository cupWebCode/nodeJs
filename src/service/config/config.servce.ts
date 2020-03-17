import { Injectable } from "@nestjs/common";
import { ConfigModel } from "./config.model";

@Injectable()
export class ConfigService {
  config: ConfigModel;
  constructor() {
    this.config = new ConfigModel();
  }
}
