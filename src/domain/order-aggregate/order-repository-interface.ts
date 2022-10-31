import { Order } from "./order";

export interface IOrderRepository {
    getPendingSortedByOrderId(orderIds: number[]): Order[];
}