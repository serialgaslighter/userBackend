import express from 'express';
import { userRouter } from './routes/userRouter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { invalidPathHandler } from './middleware/invalidPath.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.use("*", invalidPathHandler);
app.use(errorHandler);


// =================== SERVER START ===================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
