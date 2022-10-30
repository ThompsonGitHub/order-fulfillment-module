import { Logger, Module } from '@nestjs/common';
import { InitiateOrderRunHandler } from './app/initiate-order-run-handler';
import { InitiateOrderRunRunner } from './cli/initiate-order-run-runner';
import { DbContext } from './infrastructure/DbContext';
import { OrderRepository } from './infrastructure/repositories/order-repository';
import { ProductRepository } from './infrastructure/repositories/product-repository';
import { PurchaseOrderRepository } from './infrastructure/repositories/purchase-order-repository';

@Module({
  imports: [],
  providers: [
    DbContext, 
    { provide: 'IOrderRepository', useClass: OrderRepository },
    { provide: 'IProductRepository', useClass: ProductRepository },
    { provide: 'IPurchaseOrderRepository', useClass: PurchaseOrderRepository },
    InitiateOrderRunRunner,
    InitiateOrderRunHandler,
    Logger
  ]
})
export class AppModule {}
