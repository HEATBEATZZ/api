import mysql from 'mysql2/promise';

export async function getConnection() {
  return await mysql.createConnection({
    host: 'sql310.infinityfree.com',
    user: 'if0_39222194',
    password: 'qu1U5qcDyNxZ',
    database: 'if0_39222194_new'
  });
} 