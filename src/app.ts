import express from 'express'
import cors from "cors"
import helmet from 'helmet';
import morgan from 'morgan';

const app = express()

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


export default app