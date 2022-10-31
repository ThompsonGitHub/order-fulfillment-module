export class Product {
    private _productId: number;
    private _quantityOnHand: number;
    private _reorderThreshold: number;
    private _reorderAmount: number;

    get productId(): number {
        return this._productId;
    }

    get reorderAmount(): number {
        return this._reorderAmount;
    }

    constructor(
        productId: number,
        quantityOnHand: number,
        reorderThreshold: number,
        reorderAmount: number
    ) {
        this._productId = productId;
        this._quantityOnHand = quantityOnHand;
        this._reorderThreshold = reorderThreshold;
        this._reorderAmount = reorderAmount;
    }

    isStockAvailable(amountRequired: number): boolean {
        return this._quantityOnHand >= amountRequired ? true : false;
    }

    allocateStock(amountAllocated: number): void {
        if (!this.isStockAvailable(amountAllocated)) {
            throw new Error("Not enough stock available to allocate.");
        }

        this._quantityOnHand -= amountAllocated;
    }

    needsReordering(): boolean {
        return this._quantityOnHand < this._reorderThreshold ? true : false;
    }
}
