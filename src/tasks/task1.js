let _chunk;
const _reverse = str => {
  return str.split('').reverse((a, b) => {
    if (a > b) return 0;
    if (a < b) return -1;
  }).join(',').replace(/,/g, '')
}

export class Task1 {

  constructor() {
    this.init();
  }

  init() {
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
      while ((_chunk = process.stdin.read()) !== null) {
        process.stdout.write(`Chunk data is: ${_reverse(_chunk)}`);
      }
    });

    process.stdin.on('end', () => {
      process.stdout.write('END');
      _chunk = null;
    });
  }
}
