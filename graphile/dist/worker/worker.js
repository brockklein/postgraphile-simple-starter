"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphile_worker_1 = require("graphile-worker");
const index_1 = require("./tasks/index");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Run a worker to execute jobs:
        const runner = yield graphile_worker_1.run({
            connectionString: "postgres:///my_db",
            concurrency: 5,
            // Install signal handlers for graceful shutdown on SIGINT, SIGTERM, etc
            noHandleSignals: false,
            pollInterval: 1000,
            // you can set the taskList or taskDirectory but not both
            taskList: index_1.taskList,
        });
        // Or add a job to be executed:
        // await quickAddJob(
        //     // makeWorkerUtils options
        //     { connectionString: "postgres:///my_db" },
        //     // Task identifier
        //     "hello",
        //     // Payload
        //     { name: "Bobby Tables" },
        // )
        // If the worker exits (whether through fatal error or otherwise), this
        // promise will resolve/reject:
        yield runner.promise;
    });
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
