export class PurchaseOrder {
    private _productId: number;
    private _reorderAmount: number;

    constructor(
        productId: number, 
        reorderAmount: number) {
            this._productId = productId;
            this._reorderAmount = reorderAmount;
        // Stub.
        // This function would raise a PurchaseOrderCreated domain event.
        // The event could then be handled to inform a purchasing module.
    }
}
