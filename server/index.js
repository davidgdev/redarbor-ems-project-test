import { connectDB } from "./db.js";
import app from "./app.js";
import { PORT } from "./config.js";

connectDB();

app.listen(PORT);
console.log("Server is running on port: ", PORT);