const http = require('http')
const express = require('express');
const morgan = require('morgan')
const server =  express()
const PORT = 3000


server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'))



server.use(require('./routes'))

// Configuração do servidor node
server.listen(PORT,() => {
    console.log('Servidor rodando!')
})