// import _ from 'lodash';
// import './style.css';

import ddb_init from './duckdb';

async function query() {
    const db = await ddb_init();
    const conn = await db.connect();
    const result = await conn.query(`SELECT count(*)::INTEGER as v FROM generate_series(0, 100) t(v)`);
    console.log(result);
    return result;
//     const result_set = await conn.query<{ v: arrow.Int }>(`
//     SELECT * FROM generate_series(1, 100) t(v)
// `);

}

(async function () {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    // element.classList.add('hello');
    const result = await query();
    console.log(result);
    element.innerHTML = "<b>" + result.data[0] + "</b>"
    document.body.appendChild(element);
})()
