var mysql = require('mysql');

const createConnection = async () => {
  return await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "perpustakaan"
  });
}

// const getReply = async() =>{
//   const connection = await createConnection();
//   const [rows] = await connection.execute('SELECT nama_buku FROM bukus WHERE id =?', [id]);
//   if (rows.length > 0) return rows[0].nama_buku;
//   return false;
// }

// const getReplyRuangan = async () =>{
//   const connection = await createConnection();
//   const [rows] = await connection.execute('SELECT nama_ruangan FROM ruangans WHERE id =?', [id]);
//   if (rows.length > 0) return rows[0].nama_ruangan;
//   return false
// }

module.export = {
  createConnection,
  getReply,
};