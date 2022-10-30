import { Product } from "../product-aggregate/product";
import { OrderItem } from "./order-item";
import { OrderStatus } from "./order-status";

export class Order {
    private _orderId: number;
    private _status: OrderStatus;
    private readonly _orderItems: OrderItem[];

    constructor(
        orderId: number,
        status: OrderStatus,
        dateCreated: Date,
        orderItems: {
            productId: number, 
            quantity: number}[]
    ) {
        this._orderId = orderId;
        this._status = status;
        this._orderItems = [];
        this._orderItems.push(...orderItems.map(item => new OrderItem(item.productId, item.quantity)));
    }

    get orderId(): number {
        return this._orderId;
    }

    get status(): string {
        return this._status;
    }

    process(availableProducts: Product[]): boolean {
        if (this.canBeFulfilled(availableProducts)) {
            this.fulfill(availableProducts);
            return true;
        } else {
            this._status = OrderStatus.unfulfillable;
            return false;
        }
    }

    private canBeFulfilled(availableProducts: Product[]): boolean {
        for (let orderItem of this._orderItems) {
            const canBeFulfill = orderItem.canBeFulfilled(availableProducts);
            if (!canBeFulfill) {
                return false;
            }
        }

        return true;
    }

    private fulfill(availableProducts: Product[]): void {
        this._orderItems.forEach(orderItem => {
            orderItem.fulfill(availableProducts);
        });
        this._status = OrderStatus.fulfilled;
    }
}