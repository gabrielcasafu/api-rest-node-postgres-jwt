import express from 'express';
import swaggerUI from 'swagger-ui-express'
import { swaggerSpect } from './swagger'
import userRoutes from './routes/users.routes'
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/v1/', userRoutes);
app.use('/api/v1/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerSpect));

//En caso de solicitar una url que no este definida
app.use((req, res, next ) => {
    res.status(404).json({
        message: 'url not found'
    })
})

export default app;


