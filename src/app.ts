import express from 'express';
import swaggerUI from 'swagger-ui-express'
import cors from "cors";
import { swaggerSpect } from './swagger'
import userRoutes from './routes/users.routes'
import authRoutes from './routes/auth.routes'
import ordersRoutes from './routes/order.routes'

const app = express();

// middlewares
app.use(
    cors({
      // origin: "http://localhost:3001",
    })
  );
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/v1/', userRoutes);
app.use('/api/v1/', authRoutes);
app.use('/api/v1/', ordersRoutes);

//swagger documentation
app.use('/api/v1/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerSpect));


//En caso de solicitar una url que no este definida
app.use((req, res, next ) => {
    res.status(404).json({
        message: 'url not found'
    })
})

export default app;


