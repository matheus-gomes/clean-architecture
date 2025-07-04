import Product from "../entity/product";
import RepositoryInterface from "../../@shared/event/repository/repository-interface";
import ProductInterface from "../entity/product.interface";

export default interface ProductRepositoryInterface extends RepositoryInterface<ProductInterface> {}