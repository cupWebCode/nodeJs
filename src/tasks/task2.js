import fs from 'fs';
import csv from 'csvtojson';
import { ErrorLogger } from '../../services/logger';

const fsPromises = fs.promises;
const filePath = './csv/node_mentoring_t1_2_input_example.csv';
const writer = fs.createWriteStream('./task2.txt');
let reader;

const convertoToJson = chunk => {
  return csv()
    .fromString(chunk)
    .then(data => data);
}

const slicedData = data => data.slice(1, data.length);

export class Task2 extends ErrorLogger {

  constructor() {
    super();

    this.subscribe('r_w_error');
    fsPromises.access(filePath, fs.constants.F_OK)
      .then(() => this.init())
      .catch(e => this.log('r_w_error', e));
  }

  init() {
    reader = fs.createReadStream(filePath);
    reader.on('readable', () => this.read());

    reader.on('end', () => {
      console.log(`reader ENDED`);
    });

    writer.on('finish', () => {
      console.log(`writer ENDED`);
    });
  }

  read() {
    try {
      let chunk = null;
      while (null !== (chunk = reader.read())) {
        convertoToJson(chunk.toString())
          .then(data => this.write(data))
      }
    } catch (e) {
      this.log('r_w_error', e);
    }
  }

  write(data) {
    try {
      if (!data.length) return;

      const isWritable = writer.write(`${JSON.stringify(data[0])}\n`);

      if (isWritable) {
        this.write(slicedData(data));
      } else {
        writer.once('drain', () => {
          this.write(slicedData(data));
          if (!writer.listenerCount('drain')) writer.end();
        });
      }

    } catch (e) {
      this.log('r_w_error', e);
    }
  }
}
