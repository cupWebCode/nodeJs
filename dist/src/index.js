"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks = __importStar(require("./tasks/index"));
const argv = process.argv;
const taskName = argv[2] || '';
if (tasks.hasOwnProperty(taskName)) {
    new tasks[taskName]();
}
//# sourceMappingURL=index.js.map