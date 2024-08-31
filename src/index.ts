import express from 'express';
import testRoutes from './routes/test_routes';
import uploadRoutes from './routes/upload_routes';
import confirmRoutes from './routes/confirm_routes';
import routes from './routes/routes';

const app = express();
const port = 3000;

app.use(express.json({limit: '10mb'}));

app.use('/', routes)
app.use('/test', testRoutes);
app.use('/upload', uploadRoutes);
app.use('/confirm', confirmRoutes);

app.listen(port, ()=>{
    console.log(`Servidor rodando em: ${port}`)
})