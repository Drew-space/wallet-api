import express from "express";
import dotenv, { parse } from "dotenv";
import { sql } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";
dotenv.config();

import transactionsRoute from "./routes/transactionsRoute.js";

import job from "./config/cron.js";
if (process.env.NODE_ENV === "production") job.start();



const app = express();
// middles ware
app.use(express.json());

app.use(ratelimiter);

app.use("/api/transactions", transactionsRoute);

// app.use((req, res, next) => {
//   console.log("Hey we hit a req, the method is", req.method);
//   next()
// });

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(225) NOT NULL,
    title VARCHAR(225) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(225) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
)`;
    // DECIMAL(10, 2)
    // means: a fixed-point number with:
    // 10 digits total
    // 2 digits after the decimal point
    // so: the max value it can store is 99999999.99 (8 digits before the decimal, 2 after)

    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initializing DB", error);
    process.exit(1); // status code 1 means failure, 0 sucess
  }
}

async function test() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log("Connected! Current time:", result[0].now);
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

test();

app.get("/", (req, res) => {
  res.send("its working ");
});

const PORT = process.env.PORT || 5001;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on PORT:", PORT);
  });
});
