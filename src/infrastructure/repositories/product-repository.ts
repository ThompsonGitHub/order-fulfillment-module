import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/product-aggregate/product';
import { IProductRepository } from "../../domain/product-aggregate/product-respository-interface";
import { DbContext } from '../DbContext';
import { ProductDto } from '../dtos/product-dto';

@Injectable()
export class ProductRepository implements IProductRepository {
    constructor(
        private readonly dbContext: DbContext
    ) {}

    getAll(): Product[] {
        return this.dbContext.products
        .map(dto => this.convertToDomain(dto));
    }

    private convertToDomain(productDto: ProductDto): Product {
        return new Product(
            productDto.productId,
            productDto.quantityOnHand,
            productDto.reorderThreshold,
            productDto.reorderAmount);
    }
}