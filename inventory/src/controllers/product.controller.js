import path from 'path';
import ProductModel from '../models/product.model.js';

const ProductController = {
  getProducts: (req, res) => {
    const products = ProductModel.get();
   res.render("products", { products });
  }
};

export default ProductController;