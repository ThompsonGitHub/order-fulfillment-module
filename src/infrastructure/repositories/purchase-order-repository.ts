import { Injectable } from "@nestjs/common";
import { PurchaseOrder } from "src/domain/purchase-order-aggregate/purchase-order";
import { IPurchaseOrderRepository } from "src/domain/purchase-order-aggregate/purchase-order-respository-interface";

@Injectable()
export class PurchaseOrderRepository implements IPurchaseOrderRepository {
    add(purchaseOrder: PurchaseOrder): void {
        // Stub.
    }
}