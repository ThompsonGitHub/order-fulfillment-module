import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { ProductRepository } from './product-repository';
import { DbContext } from '../DbContext';
import { Logger } from '@nestjs/common';

describe('ProductRepository', () => {
  let respository: ProductRepository;
  let dbContext: DbContext;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProductRepository,
        DbContext,
        { provide: Logger, useValue: createMock<Logger>()}
    ],
    }).compile();
    
    respository = moduleRef.get(ProductRepository);
    dbContext = moduleRef.get(DbContext);
    
  });

  it('should be created', () => {
    expect(respository).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return all product dtos', () => {
        // Arange
        const dbProducts = [
            {
              productId: 1,
              description: "Small Widget",
              quantityOnHand: 50,
              reorderThreshold: 10,
              reorderAmount: 50,
              deliveryLeadTime: 5
            },
            {
              productId: 2,
              description: "Medium Widget",
              quantityOnHand: 10,
              reorderThreshold: 10,
              reorderAmount: 10,
              deliveryLeadTime: 5
            },
            {
              productId: 3,
              description: "Large Widget",
              quantityOnHand: 0,
              reorderThreshold: 10,
              reorderAmount: 20,
              deliveryLeadTime: 5
            }
          ]

        jest.spyOn(dbContext, 'products', 'get').mockReturnValue(dbProducts);

        // Act
        const products = respository.getAll();

        // Assert
        expect(products).toEqual([
            {
              _productId: 1,
              _quantityOnHand: 50,
              _reorderThreshold: 10,
              _reorderAmount: 50
            },
            {
              _productId: 2,
              _quantityOnHand: 10,
              _reorderThreshold: 10,
              _reorderAmount: 10
            },
            {
              _productId: 3,
              _quantityOnHand: 0,
              _reorderThreshold: 10,
              _reorderAmount: 20
            }
          ]);
    });
  });
});