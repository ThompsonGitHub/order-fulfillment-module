export interface OrderDto {
    orderId: number;
    status: string;
    dateCreated: string;
    items: {
        productId: number;
        quantity: number
    }[]
}
