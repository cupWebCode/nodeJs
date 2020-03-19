import * as dotenv from 'dotenv';

export class ConfigModel {
  db_name: string;
  db_host: string;
  db_user: string;
  db_pass: string;
  db_port: string;
  constructor() {
    this.setEnvVar();
    this.init();
  }

  private init() {
    this.db_name = process.env.DB_NAME;
    this.db_host = process.env.DB_HOST;
    this.db_user = process.env.DB_USER;
    this.db_pass = process.env.DB_PASS;
    this.db_port = process.env.DB_PORT;
  }

  private setEnvVar() {
    const getEnvPath = () => {
      const env_mode = process.env.NODE_ENV || '';
      
      switch(env_mode.toLowerCase()) {
        case 'production':
          return '.env';
        default:
          return '.env.dev';
      }
    }
    const envPath = getEnvPath();
    
    dotenv.config({
      path: envPath
    });
  }
}
