import express from 'express'
import cors from "cors"
import helmet from 'helmet';
import morgan from 'morgan';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app = express()

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler)
app.use(notFound)

export default app