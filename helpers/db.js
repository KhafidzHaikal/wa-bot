var mysql = require('mysql2/promise')

const createConnection = async () => {
    return await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "perpustakaan"
    });
}

const getReply = async (nama_buku) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM bukus WHERE nama_buku = ?', [nama_buku]);
    if (rows.length > 0) return `Nama buku : ${rows[0].nama_buku}\nNama Pengarang: ${rows[0].pengarang}\nNama Penerbit : ${rows[0].penerbit}\nTahun Terbit : ${rows[0].tahun_terbit}\nKeyword : ${rows[0].keyword}\nTempat Buku : ${rows[0].nama_buku}\n`;
    return false;
}

const getReplyRuangan = async (tipe) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM ruangans WHERE tipe = ?', [tipe]);
    if (rows.length > 0) return `Kode Ruangan: ${rows[0].kode_ruangan}\nNama ruangan : ${rows[0].nama_ruangan}\nTipe : ${rows[0].tipe}\nHarga : ${rows[0].harga}\nKetersediaan : ${rows[0].ketersediaan}\nTempat ruangan : ${rows[0].tempat_ruangan}\n`;
    return false;
}

// const getReplyNamaRuangan = async() => {
//     const connection = await createConnection();
//     const [rows] = await connection.execute('SELECT nama_ruangan FROM ruangans');
//     for (rows=0; rows.length>0; rows++){
//         `Nama Ruangan : ${rows[0].nama_ruangan}`
//     } 
// }
// const createUser = async(user_name) => {
//   const connection = await createConnection();
//   const [rows] = await connection.execute(`INSERT INTO pinjaman (id, user_name, user_nim, no_telpon, keyword) VALUES (NULL, 'ahsasa', '02567423', '082021201', 'HK02')`);
//   createConnection.query(rows[0], function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
//  if (rows.length > 0) return rows[0].user_name;
//  return false;
// }

module.exports = {
    createConnection,
    getReply,
    getReplyRuangan,
    // getReplyNamaRuangan
    // createUser
}