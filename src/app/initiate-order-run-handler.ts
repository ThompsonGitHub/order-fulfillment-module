import { Inject, Injectable, Logger } from "@nestjs/common";
import { IOrderRepository } from "../domain/order-aggregate/order-repository-interface";
import { IProductRepository } from "../domain/product-aggregate/product-respository-interface";
import { IPurchaseOrderRepository } from "../domain/purchase-order-aggregate/purchase-order-respository-interface";
import { PurchaseOrder } from "../domain/purchase-order-aggregate/purchase-order";

@Injectable()
export class InitiateOrderRunHandler {

    constructor(
        @Inject('IOrderRepository') private readonly ordersRespository: IOrderRepository,
        @Inject('IProductRepository') private readonly productsRespository: IProductRepository,
        @Inject('IPurchaseOrderRepository') private readonly purchaseOrderRespository: IPurchaseOrderRepository,
        private readonly logger: Logger
    ) {}

    handle(orderIds: number[]):  number[] {

        this.logger.log('Handling InitiateOrderRun.');
        this.logger.debug(`orderIds: ${orderIds}.`);

        const orders = this.ordersRespository.getPendingSortedByOrderId(orderIds);
        const products = this.productsRespository.getAll();

        // TBD: Check for unknown order ids.
        // Currently not a requirement.

        // Maintain a list of the unfulfilled order ids.
        const unfulfilledOrderIds: number[] = [];

        // Fulfill the orders by priority.
        for (let order of orders) {
            this.logger.debug(`Processing order id: ${order.orderId}.`);
            const fulfilled = order.process(products);
            
            if (!fulfilled) {
                unfulfilledOrderIds.push(order.orderId)
            }

            this.logger.debug(`Order id ${order.orderId} was ${order.status}.`);
        }

        // Check each product to see if it needs re-ordering.
        for (let product of products) {
            this.logger.debug(`Checking stock levels for product ${product.productId}.`);
            if (product.needsReordering()) {
                this.logger.debug(`Creating purchase order for product ${product.productId}.`);
                // Create the purchase order.
                const purchaseOrder = new PurchaseOrder(product.productId, product.reorderAmount);
                // Added the purchase order to the repository.
                this.purchaseOrderRespository.add(purchaseOrder);
            }
        }

        // Return the unfulfilled order Ids.
        this.logger.debug(`Unfulfilled order ids: ${unfulfilledOrderIds}.`)
        return unfulfilledOrderIds;
    }
}