import fs from 'fs';
import csv from 'csvtojson';
import { ErrorLogger } from '../../services/logger';

const fsPromises = fs.promises;
const _filePath = './scv/node_mentoring_t1_2_input_example.csv';
const _writer = fs.createWriteStream('./task2.txt');
let _reader;

const _convertoToJson = chunk => {
  return csv()
    .fromString(chunk)
    .then(data => data);
}

const _slicedData = data => data.slice(1, data.length);

export class Task2 extends ErrorLogger {

  constructor() {
    super();

    this.subscribe('r_w_error');
    fsPromises.access(_filePath, fs.constants.F_OK)
      .then(() => this.init())
      .catch(e => this.log('r_w_error', e));
  }

  init() {
    _reader = fs.createReadStream(_filePath);
    _reader.on('readable', () => this.read());

    _reader.on('end', () => {
      console.log(`reader ENDED`);
    });

    _writer.on('finish', () => {
      console.log(`writer ENDED`);
    });
  }

  read() {
    try {
      let chunk = null;
      while (null !== (chunk = _reader.read())) {
        _convertoToJson(chunk.toString())
          .then(data => this.write(data))
      }
    } catch (e) {
      this.log('r_w_error', e);
    }
  }

  write(data) {
    try {
      if (!data.length) return;

      const isWritable = _writer.write(`${JSON.stringify(data[0])}\n`);

      if (isWritable) {
        this.write(_slicedData(data));
      } else {
        _writer.once('drain', () => {
          this.write(_slicedData(data));
          if (!_writer.listenerCount('drain')) _writer.end();
        });
      }

    } catch (e) {
      this.log('r_w_error', e);
    }
  }
}
