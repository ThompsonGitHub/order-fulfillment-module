export const OrderStatus = {
    pending: "Pending",
    fulfilled: "Fulfilled",
    unfulfillable: "Unfillfillable"
}

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];