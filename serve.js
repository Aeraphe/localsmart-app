const express = require('express');
const app = express();

const PORT = process.env.PORT || 4700;


app.use(express.static(__dirname + '/dist/smart-adv'));

app.get('/*',(req,res)=>{
    res.sendFile(__dirname + '/dist/smart-adv/index.html');
})

app.listen(PORT,()=>{
    console.log('Servidor iniciado na porta:' + PORT);
})