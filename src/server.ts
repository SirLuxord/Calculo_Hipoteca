
import express, { Express, Request, Response} from 'express';
import Hipoteca from './hipoteca';

const app : Express = express();
const port : number = 3000;

app.get('/', (req : Request, res : Response) => {
    res.send('Hola Node.js!')
});

app.get('/hello', (req : Request, res : Response) => {
    const name = req.query.name ? req.query.name : '';
    const greeting = {
        message: `Hola ${name}! Estamos aprendiendo algo de Node.js + Express`,
        date: new Date()
    }
    /*
    res.status(200);
    res.type('application/json');
    res.send(greeting);
    */
   res.json(greeting);

});

app.get('/add', (req, res) => {
    const texto = req.query.a ? req.query.a : '';
    const numero = Number(texto);
    const texto1 = req.query.b ? req.query.b : '';
    const numero1 = Number(texto1);
    //const suma = numero + numero1;
    const add = {
        message: `La suma del numero ${numero} + ${numero1} = ${numero+numero1}`
    }
    res.json(add);

});

app.get('/hipoteca', (req, res) => {
    const capital : number = Number(req.query.capital);
    const interes : number = Number(req.query.interes);
    const años : number = Number(req.query.años);
    try{
        const hipoteca = new Hipoteca(capital, interes, años);
        const cuotas = hipoteca.calcularCuotas();

        res.json({
            hipoteca,
            cuotas
        })
    } catch (error) {
        res.status(400).json({
            message : error
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

