import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { Pool } from "pg";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

// Load dotenv variables.
dotenv.config();

// Initialise the backend of the app.
const backendApp = express();
backendApp.use(cors());
backendApp.use(express.json());

// Define a PostgreSQL connection pool.
const postgresPool = new Pool();

// Endpoint
backendApp.get("/api/chars", async (req: Request, resp: Response) => {
  try {
    const queryRes = await postgresPool.query("SELECT * FROM gi.all_chars_app_view;");
    resp.json(queryRes.rows);
  } catch (err: unknown) {
    if (err instanceof Error) {
      // Declare the status code for the response
      const responseStatus = 500;

      // Display the error message in the console.
      console.error(err.message);

      // Send the response with status 500
      resp.status(responseStatus).json({ 
        error: err.name, 
        message: err.message, 
        status: responseStatus 
      });
    } else {
      console.debug(`Non-error caught: ${err}`);
    }
  }
});

// Define the port of the app.
const PORT = process.env.APP_PORT || 3000;

// Clear the console.
console.clear();

// Make the backend app listen on 
backendApp.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});

const rl = createInterface({ input: stdin, output: stdout});

(async function awaitEnd () {
  while (true) {
    const shouldEnd = await rl.question("Enter \"X\" to close the server and exit.\n");
    
    if (shouldEnd.toLowerCase().charAt(0) === 'x') {
      process.exit(0);
    } else {
      console.log('\n"X" not entered. Continuing app.\n')
    }
  }
})();
