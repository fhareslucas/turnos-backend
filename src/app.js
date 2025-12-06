//cambia todo a imports
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

import routes from "./routes/index.js";
import { errorHandler } from "./middleware/index.js";
import corsConfig from "./config/cors.js";

const app = express();

app.use(helmet());
app.use(cors(corsConfig));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({
    message: "Sistema de Turnos API",
    version: "2.0.0",
    status: "running",
  });
});

// Error handler
app.use(errorHandler);

export default app;
