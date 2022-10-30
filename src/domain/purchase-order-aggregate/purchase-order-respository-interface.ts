import { PurchaseOrder } from "./purchase-order";

export interface IPurchaseOrderRepository {
    add(purchaseOrder: PurchaseOrder): void
}
