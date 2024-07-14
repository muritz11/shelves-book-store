import express, { Application } from "express";
import bodyParser from "body-parser";
import dbConnect from "../db/dbConnect";
import cors from "../middleware/cors";
import router from "../routes/router";

// Initialize the Express application
const app: Application = express();

// Connect to the database
dbConnect();

// Middleware setup
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use("/api/v1/", router);

export default app;
