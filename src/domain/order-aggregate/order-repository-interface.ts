import { Order } from "./order";

export interface IOrderRepository {
    getByPrority(orderIds: number[]): Order[];
}