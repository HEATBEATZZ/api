import { getConnection } from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const user_id = req.query.user_id;
  if (!user_id) {
    return res.status(400).json({ success: false, error: 'Missing user_id' });
  }

  const conn = await getConnection();
  const [rows] = await conn.execute(
    'SELECT id, item_type, item_name, item_data FROM favorites WHERE user_id=?',
    [user_id]
  );
  await conn.end();

  const favorites = rows.map(row => ({
    ...row,
    item_data: JSON.parse(row.item_data)
  }));

  res.json({ success: true, favorites });
} 