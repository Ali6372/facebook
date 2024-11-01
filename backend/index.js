const express = require ('express');
const userRouter = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const connectDB = require('./config/connect');
const app = express();

require ('dotenv').config();
require ('colors');

const cors = require('cors');
app.use(cors());

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.use('/api/user/',userRouter);

app.use(errorHandler);

app.listen(process.env.PORT,() => console.log(`server is started on PORT:${process.env.PORT.yellow}`))