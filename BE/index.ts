import expess, { Express } from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import cors from "cors";

dotenv.config()
const app: Express = expess()
app.use(cors({ origin: process.env.ORIGINAL_URL, credentials: true }));
app.use(cookieParser());


const PORT = process.env.PORT || 3000
app.use(expess.json())
app.use(expess.urlencoded({ extended: true }))
clientRoutes(app);
adminRoutes(app)

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`)
})