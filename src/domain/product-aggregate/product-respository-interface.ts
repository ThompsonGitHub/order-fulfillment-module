import { Product } from "./product";

export interface IProductRepository {
    getAll(): Product[];
}