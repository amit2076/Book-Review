import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';

import connectToMonogoDB from './db/connectToMongodb.js';
dotenv.config();
import bookRoutes from './routes/bookRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import userRoutes from './routes/userRoutes.js'
import errorMiddleware from './middlewares/errorMiddleware.js'
import authMiddleware from './middlewares/authMiddleware.js'



const app = express();


app.use(cors());
app.use(express.json());



// Routes
app.use('/api/books', bookRoutes);

app.use('/api/reviews', authMiddleware, reviewRoutes);
app.use('/api/users', userRoutes);




// Error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectToMonogoDB();
  console.log(`server running on ${PORT}`)
})

// mongoose.connect(uri)
//   .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
//   .catch((err) => console.error(err));

