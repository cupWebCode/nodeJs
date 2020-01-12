import "reflect-metadata";
import { Service } from "typedi";
import { Pool } from 'pg';
import { environment } from "../config/environment";


@Service()
export class PgService {
  private _pool: Pool = new Pool(environment.pg);

  constructor() {
    this.pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err)
      process.exit(-1)
    })
  }

  get pool(): Pool {
    return this._pool;
  }
}
