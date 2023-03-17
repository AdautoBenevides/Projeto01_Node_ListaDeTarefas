const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
//Express é o framework


app.use( bodyParser.json() );  // to suport Json-encoded bodiews
app.use(bodyParser.urlencoded({ // to support Url-encoded bodies
    extended:true
}));


//setar a engine pra renderização do tipo html e vai utilizar o ejs para renderizar
app.engine('html', require('ejs').renderFile);

//Setar a view engine pra ser html
app.set('view engine', 'html');

//diretorio estatico(arquivos, fotos, css) vai ficar na pasta publica express.static pra pegar o diretorio atual e pegar a pasta public
app.use('/public', express.static(path.join(__dirname, 'public')));

//a pasta onde esta as views funções proprias pra pegar o diretorio completo 
app.set('views', path.join(__dirname, '/views'));



var tarefas = ['Arrumar o quarto', 'terminar a aula de ingles'];

app.post('/',(req,res)=>{

    tarefas.push(req.body.tarefa);
    res.render('index',{taskList:tarefas})
})

app.get('/', (req, res) => {
    
    res.render('index', { taskList: tarefas });

})

app.get('/deletar/:id', (req, res) => {
    tarefas = tarefas.filter(function(val, index){
        if(index != req.params.id){
            return val;
        }
    })
    res.render('index', { taskList: tarefas });

})

app.listen(5000, () => {
    console.log('server rodando')
})