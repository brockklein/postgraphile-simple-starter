import { run } from 'graphile-worker'
import { POSTGRAPHILE_OWNER_DATABASEURL } from '../config/constants'
import { taskList } from './tasks/index'

async function main() {
    // Run a worker to execute jobs:
    const runner = await run({
        connectionString: POSTGRAPHILE_OWNER_DATABASEURL,
        concurrency: 5,
        // Install signal handlers for graceful shutdown on SIGINT, SIGTERM, etc
        noHandleSignals: false,
        pollInterval: 1000,
        // you can set the taskList or taskDirectory but not both
        taskList,
        // or:
        //   taskDirectory: `${__dirname}/tasks`,
    })

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
    await runner.promise
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})