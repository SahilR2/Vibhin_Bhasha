import 'dotenv/config';
import express from 'express';
import { AdminJS } from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { connectDB } from './config/databse.js';
import { adminOptions } from './admin/admin.options.js';
import cors from 'cors';
import session from 'express-session';


// dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


await connectDB();

app.use(express.json());
app.use(cors());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

const admin = new AdminJS(adminOptions);
const adminRouter = AdminJSExpress.buildRouter(admin);
app.use(admin.options.rootPath, adminRouter);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
});