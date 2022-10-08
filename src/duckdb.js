// import * as duckdb from '@duckdb/duckdb-wasm';
// import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm';
// import duckdb_wasm_next from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm';


// const MANUAL_BUNDLES: duckdb.DuckDBBundles = {
//     mvp: {
//         mainModule: duckdb_wasm,
//         mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js', import.meta.url).toString(),
//     },
//     eh: {
//         mainModule: duckdb_wasm_next,
//         mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js', import.meta.url).toString(),
//     },
// };

// function ddb_init() {


//     // Select a bundle based on browser checks
//     const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);
//     // Instantiate the asynchronus version of DuckDB-wasm
//     const worker = new Worker(bundle.mainWorker!);
//     const logger = new duckdb.ConsoleLogger();
//     const db = new duckdb.AsyncDuckDB(logger, worker);
//     await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
// }

// import * as duckdb from '@duckdb/duckdb-wasm';
// function ddb_init() {
//     const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();

//     // Select a bundle based on browser checks
//     const bundle = duckdb.selectBundle(JSDELIVR_BUNDLES);

//     const worker_url = URL.createObjectURL(
//         new Blob([`importScripts("${bundle.mainWorker!}");`], {type: 'text/javascript'})
//     );

//     // Instantiate the asynchronus version of DuckDB-wasm
//     const worker = new Worker(worker_url);
//     const logger = new duckdb.ConsoleLogger();
//     const db = new duckdb.AsyncDuckDB(logger, worker);
//     // await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
//     db.instantiate(bundle.mainModule, bundle.pthreadWorker);
//     URL.revokeObjectURL(worker_url);
// }


// import * as duckdb from '@duckdb/duckdb-wasm';
// import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm';
// import duckdb_wasm_next from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm';


// const MANUAL_BUNDLES = {
//     mvp: {
//         mainModule: duckdb_wasm,
//         mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js', import.meta.url).toString(),
//     },
//     eh: {
//         mainModule: duckdb_wasm_next,
//         mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js', import.meta.url).toString(),
//     },
// };
// // Select a bundle based on browser checks
// const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);
// // Instantiate the asynchronus version of DuckDB-wasm
// const worker = new Worker(bundle.mainWorker!);
// const logger = new duckdb.ConsoleLogger();
// const db = new duckdb.AsyncDuckDB(logger, worker);
// await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

// import * as duckdb from './duckdb-browser.mjs';

// import * as duckdb from '@duckdb/duckdb-wasm';
// (async () => {
// async function ddb_init() {
//     try {
//         const DUCKDB_CONFIG = await duckdb.selectBundle({
//             mvp: {
//                 mainModule: './duckdb.wasm',
//                 mainWorker: './duckdb-browser.worker.js',
//             },
//             eh: {
//                 mainModule: './duckdb-eh.wasm',
//                 mainWorker: './duckdb-browser-eh.worker.js',
//             },
//         });

//         const logger = new duckdb.ConsoleLogger();
//         const worker = new Worker(DUCKDB_CONFIG.mainWorker);
//         const db = new duckdb.AsyncDuckDB(logger, worker);
//         await db.instantiate(DUCKDB_CONFIG.mainModule, DUCKDB_CONFIG.pthreadWorker);

//         const conn = await db.connect();
//         await conn.query(`SELECT count(*)::INTEGER as v FROM generate_series(0, 100) t(v)`);

//         await conn.close();
//         await db.terminate();
//         await worker.terminate();
//     } catch (e) {
//         console.error(e);
//     }
// };




import * as duckdb from '@duckdb/duckdb-wasm';

async function ddb_init() {
    const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();

    // Select a bundle based on browser checks
    const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);

    var list_entry = `importScripts("${bundle.mainWorker}");`;
    const worker_url = URL.createObjectURL(
        new Blob([list_entry], {type: 'text/javascript'})
    );

    // Instantiate the asynchronus version of DuckDB-wasm
    const worker = new Worker(worker_url);
    const logger = new duckdb.ConsoleLogger();
    const db = new duckdb.AsyncDuckDB(logger, worker);
    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    URL.revokeObjectURL(worker_url);
    return db;
}
export default ddb_init;
