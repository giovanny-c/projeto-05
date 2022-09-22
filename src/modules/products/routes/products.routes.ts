import { Router } from "express"
import ProductsController from "../controllers/ProductsController"

const productRoutes = Router()

const productsController = new ProductsController()

productRoutes.get("/", productsController.index)
productRoutes.post("/create", productsController.create)
productRoutes.get("/:id", productsController.show)
productRoutes.put("/:id/update", productsController.update)
productRoutes.delete("/:id/delete", productsController.delete)

export default productRoutes
