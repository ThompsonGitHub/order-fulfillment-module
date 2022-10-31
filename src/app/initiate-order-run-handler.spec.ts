import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { Logger } from '@nestjs/common';
import { PurchaseOrderRepository } from '../infrastructure/repositories/purchase-order-repository';
import { OrderRepository } from '../infrastructure/repositories/order-repository';
import { ProductRepository } from '../infrastructure/repositories/product-repository';
import { IPurchaseOrderRepository } from '../domain/purchase-order-aggregate/purchase-order-respository-interface';
import { IOrderRepository } from '../domain/order-aggregate/order-repository-interface';
import { IProductRepository } from '../domain/product-aggregate/product-respository-interface';
import { InitiateOrderRunHandler } from './initiate-order-run-handler';
import { Order } from '../domain/order-aggregate/order';
import { OrderStatus } from '../domain/order-aggregate/order-status';
import { Product } from '../domain/product-aggregate/product';

describe('InitiateOrderRunHandler', () => {
  let handler: InitiateOrderRunHandler;
  let orderRepo: IOrderRepository;
  let productRepo: IProductRepository;
  let purchaseOrderRepo: IPurchaseOrderRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        InitiateOrderRunHandler,
        { provide: 'IOrderRepository', useValue: createMock<OrderRepository>()},
        { provide: 'IProductRepository', useValue: createMock<ProductRepository>()},
        { provide: 'IPurchaseOrderRepository', useValue: createMock<PurchaseOrderRepository>()},
        { provide: Logger, useValue: createMock<Logger>()}
    ],
    }).compile();
    
    handler = moduleRef.get(InitiateOrderRunHandler);
    orderRepo = moduleRef.get('IOrderRepository');
    productRepo = moduleRef.get('IProductRepository');
    purchaseOrderRepo = moduleRef.get('IPurchaseOrderRepository');
  });

  it('should be created', () => {
    expect(handler).toBeTruthy();
  });

  describe('handle', () => {
    it('should run successfully', () => {
        //Assert
        orderRepo.getPendingSortedByOrderId = jest.fn().mockReturnValue(
            [
                new Order(1122, OrderStatus.pending, [{
                    productId: 1,
                    quantity: 4
                },{
                    productId: 2,
                    quantity: 7
                }]),
                new Order(1123, OrderStatus.pending, [{
                    productId: 1,
                    quantity: 4
                },{
                    productId: 2,
                    quantity: 3
                },{
                    productId: 3,
                    quantity: 5
                }]),
                new Order(1124, OrderStatus.pending, [{
                    productId: 1,
                    quantity: 1
                },{
                    productId: 2,
                    quantity: 3
                }]),
                new Order(1125, OrderStatus.pending, [{
                    productId: 1,
                    quantity: 6
                },{
                    productId: 2,
                    quantity: 8
                },{
                    productId: 3,
                    quantity: 3
                }]),
            ]
        );

        productRepo.getAll = jest.fn().mockReturnValue([
            new Product(1, 50, 10, 50),
            new Product(2, 10, 10, 10),
            new Product(3, 0, 10, 20)
        ]);

        const ordersToSelect = [1122, 1123, 1124, 1125];

        // Act
        const unfulfilledOrderIds =  handler.handle(ordersToSelect);

        // Assert
        expect(unfulfilledOrderIds).toEqual([1123, 1125]);
        expect(purchaseOrderRepo.add).toHaveBeenNthCalledWith(1, expect.objectContaining(
            {
                _productId: 2,
                _reorderAmount: 10
            }
        ));
        expect(purchaseOrderRepo.add).toHaveBeenNthCalledWith(2, expect.objectContaining(
            {
                _productId: 3,
                _reorderAmount: 20
            }
        ));
    });
  });
});