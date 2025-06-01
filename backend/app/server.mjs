import path from "path";
import fs from "fs";
import express from "express";
import cookieParser from "cookie-parser";
import sequelize from "./backend/db/sequelize.mjs";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./backend/swagger.mjs";

// Create app
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

// Import routes
import userRoute from "./backend/routes/user.mjs";
import bookRoute from "./backend/routes/book.mjs";
import categoryRoute from "./backend/routes/category.mjs";
import authorRoute from "./backend/routes/author.mjs";
import editorRoute from "./backend/routes/editor.mjs";
import searchRoute from "./backend/routes/search.mjs";
import tagRoute from "./backend/routes/tag.mjs";
// Routes
app.use("/api/user", userRoute);
app.use("/api/book", bookRoute);
app.use("/api/category", categoryRoute);
app.use("/api/author", authorRoute);
app.use("/api/editor", editorRoute);
app.use("/api/search", searchRoute);
app.use("/api/tag", tagRoute);

app.listen(8080, () => {
  console.log("Server running on port http://localhost:8080");
});
