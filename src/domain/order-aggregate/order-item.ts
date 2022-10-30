import { Product } from "../product-aggregate/product";

export class OrderItem {
    _productId: number;
    _quantity: number;

    constructor(
        productId: number,
        quantity: number
    ) {
        this._productId = productId;
        this._quantity = quantity;
    }

    get productId(): number {
        return this._productId;
    }

    get quantity(): number {
        return this.quantity;
    }

    canBeFulfilled(availableProducts: Product[]): boolean {
        return this.findProduct(availableProducts).isStockAvailable(this._quantity);
    }

    fulfill(availableProducts: Product[]): void {
        if (this.canBeFulfilled(availableProducts)) {

        } else {
            throw new Error('The order item cannot be fulfilled.');
        }
    }

    private findProduct(availableProducts: Product[]): Product {
        const product = availableProducts.find(availableProduct => availableProduct.productId === this._productId);
        if (!product) {
            throw new Error(`The product id ${this._productId} cannot be found in the available products`);
        }

        return product;
    }
}
