// import fs from 'fs';
// import csv from 'csvtojson';
// import { pipeline } from 'stream';
// import { ErrorLogger } from '../../services/logger';

// const fsPromises = fs.promises;

// const readableStream = fs.createReadStream;
// const writableStream = fs.createWriteStream;
// const inputfilePath = './csv/node_mentoring_t1_2_input_example.csv';
// const outputFilePath = './task2.txt';

// export class Task2 extends ErrorLogger {

//   constructor() {
//     super();

//     this.subscribe('r_w_error');
//     fsPromises.access(inputfilePath, fs.constants.F_OK)
//       .then(() => this.convertCsvToJson())
//       .catch(e => this.log('r_w_error', e));
//   }

//   convertCsvToJson() {
//     pipeline(
//       readableStream(inputfilePath),
//       csv(),
//       writableStream(outputFilePath),
//       (e: NodeJS.ErrnoException) => {
//         if (e) {
//           this.log('r_w_error', e);
//         } else {
//           console.log('CSV file was created successfully.');
//         }
//       }
//     );
//   }

// }
