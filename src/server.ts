import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';
//No tipyScrypt tem que vim com as definições de tipos, que traz para o editor, no caso do express 
//todas as opções que temos no express. precisamos instalar o npm @types/express ai vem todas as opçoes
//Assim obtemos a inteligencia da IDE

//Rota: o endereço completo da requisição
//Recurso: Qual entidade estamos acessando do sistema

//Metodos HTTP
//GET, PUT, DELETE, POST

//Req Param: Parametros que vem na propria rota que identifica um recurso, 
//e sempre é obrigatorio para a req daquele recurso. = :id
//Req Query: São opcionaise vai na rota para filtrar algo = ?

const app = express();

app.use(cors());//Todas as urls vão acessar
app.use(express.json());
app.use(routes);

//função para acessar arquivos statics
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);