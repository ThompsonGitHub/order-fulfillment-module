import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { OrderRepository } from './order-repository';
import { DbContext } from "../DbContext";
import { OrderStatus } from '../../domain/order-aggregate/order-status';
import { Logger } from '@nestjs/common';

describe('OrderRepository', () => {
  let respository: OrderRepository;
  let dbContext: DbContext;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        OrderRepository,
        DbContext,
        { provide: Logger, useValue: createMock<Logger>()}
    ],
    }).compile();
    
    respository = moduleRef.get(OrderRepository);
    dbContext = moduleRef.get(DbContext);
    
  });

  it('should be created', () => {
    expect(respository).toBeTruthy();
  });

  describe('getPendingSortedByPrority', () => {
    it('should return the selected pending order dtos sorted by prority', () => {
        // Arange
        const dbOrders = [{
            orderId: 1122,
            status: "Pending",
            dateCreated: "2018-05-09 10:59",
            items: [
              {
                orderId: 1122,
                productId: 1,
                quantity: 4,
                costPerItem: 10.45
              }
            ]
          },
          {
            orderId: 1123,
            status: "Pending",
            dateCreated: "2018-05-09 14:21",
            items: []
          },
          {
            orderId: 1124,
            status: "Unfulfilled",
            dateCreated: "2018-05-09 14:22",
            items: []
          },
          {
            orderId: 1125,
            status: "Fulfilled",
            dateCreated: "2018-05-09 14:22",
            items: []
          },
          {
            orderId: 1126,
            status: "Pending",
            dateCreated: "2018-05-09 14:22",
            items: []
          }];

        const ordersToSelect = [1126, 1122, 1124, 1125];
        jest.spyOn(dbContext, 'orders', 'get').mockReturnValue(dbOrders);

        // Act
        const selectedOrders = respository.getPendingSortedByOrderId(ordersToSelect);

        // Assert
        expect(selectedOrders).toEqual([
          {
            _orderId: 1122,
            _orderItems: [{
              _productId: 1,
              _quantity: 4
            }],
            _status: OrderStatus.pending
          },
          {
            _orderId: 1126,
            _orderItems: [],
            _status: OrderStatus.pending
          }]);
    });
  });
});