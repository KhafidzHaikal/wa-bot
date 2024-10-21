const {
    Client,
    LocalAuth
} = require('whatsapp-web.js');
const express = require('express');
const SocIo = require('socket.io');
const http = require('http');
const qrcode = require('qrcode');
const fs = require('fs');
const req = require('express/lib/request');
const res = require('express/lib/response');
// const con = require('./db_config');
const {
    response
} = require('express');
const Connection = require('tedious').Connection;
const app = express();
const server = http.createServer(app);
const io = SocIo(server);
const { body, validationResult } = require('express-validator');
// const bodyParser = require('body-parser');

// app.use(bodyParser);

app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: __dirname
    });
});

const client = new Client({
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one doesn't works in Windows
            '--disable-gpu'
        ],
    },
    authStrategy: new LocalAuth()
});

const db = require('./helpers/db')

// client.on('message', async message => {
//     // const keyword = message.body.toLowerCase();
//     // const replyMessage = await db.getReply(keyword);
//     const user = message.body.toLowerCase();
//     const getUser = await db.createUser(user);

client.on('message', async message => {
    let keyword = message.body.toLowerCase();
    const replyMessage = await db.getReply(keyword);
    const replyMessageRuangan = await db.getReplyRuangan(keyword);
    // const ReplyNamaRuangan = await db.getReplyNamaRuangan();
    // const user = message.body.toLowerCase();
    // const getUser = db.createUser(user);

    // searchMessage(message)
    console.log(message.body)
    if (message.body === 'halo') {
        message.reply('Selamat Datang Di Perpustakaan Undip\n\nMasukkan Nama Buku:\n\nKetik *Ruangan* jika ingin mengetahui ruangan di Perpustakaan Undip\n\nKalau sudah selesai bisa kunjungi alamat link berikut\nhttps://digilib.undip.ac.id/');
    }
    else if (message.body === 'pinjam'){
        message.reply('Silakan Masukkan identitas diri')
    }
    else if (message.body === 'Ruangan'){
        // message.reply(ReplyNamaRuangan)
        message.reply('Tipe Ruangan : VVIP\nTipe Ruangan : VIP\nTipe Ruangan : A\nTipe Ruangan : B\nTipe Ruangan : C\n\nMasukkan Tipe Ruangan')
    }
    else if (replyMessage !== false) {
        message.reply(replyMessage)
    }
    else if (replyMessage === false){
        message.reply(replyMessageRuangan)
    }
    // else if (message.body === 'pinjam buku'){
    //     message.reply('masukkan nama')
    //     if (message.reply === 'masukkan nama'){
    //         if (getUser !== false){
    //             message.reply(getUser)
    //         }
    //     }
    // }
    // else if (getUser !== false){
    //     message.reply(getUser)
    // }
    // else {
    //     message.reply('Maaf WA sedang uji coba Whatsapp API')
    // }
});

client.initialize();

// Socket.io

//send-message

io.on('connection', function(socket) {
    socket.emit('message', 'Connecting.....');

    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        qrcode.toDataURL(qr, (err, url) => {
            socket.emit('qr', url);
            socket.emit('message', 'QR Code received, scan please!');
        });
    });

    client.on('ready', () => {
        socket.emit('ready', 'Whatsapp is ready!');
        socket.emit('message', 'Whatsapp is ready!');
    });
});


server.listen(7000, () => {
    console.log('Server started at 7000');
   });