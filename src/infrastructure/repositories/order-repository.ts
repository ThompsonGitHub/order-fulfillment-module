import { Injectable } from '@nestjs/common';
import { Order } from "../../domain/order-aggregate/order";
import { IOrderRepository } from "../../domain/order-aggregate/order-repository-interface";
import { OrderStatus } from '../../domain/order-aggregate/order-status';
import { DbContext } from "../DbContext";
import { OrderDto } from "../dtos/order-dto";

@Injectable()
export class OrderRepository implements IOrderRepository {
    constructor(
        private readonly dbContext: DbContext
    ) {}

    getPendingSortedByOrderId(orderIds: number[]): Order[] {
        return this.dbContext.orders
        .filter(dto => dto.status === OrderStatus.pending && orderIds.includes(dto.orderId))
        .sort((a, b) => a.dateCreated > b.dateCreated ? 1 : -1)
        .map(dto => this.convertToDomain(dto));
    }

    private convertToDomain(orderDto: OrderDto): Order {
        return new Order(
            orderDto.orderId,
            orderDto.status,
            orderDto.items);
    }
}