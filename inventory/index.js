import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import path from "path";
import expressLayouts from "express-ejs-layouts";

const app = express();
const port = 3000;

app.use(express.static("src/views"));

//setup view engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
app.use(expressLayouts);

app.get('/', (ProductController.getProducts));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
