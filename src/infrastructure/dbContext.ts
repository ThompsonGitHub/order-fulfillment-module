import { Injectable, Logger } from "@nestjs/common";
import * as fs from "fs"
import { OrderDto } from "./dtos/order-dto";
import { ProductDto } from "./dtos/product-dto";

@Injectable()
export class DbContext {

    private readonly dbPath = './data/data.json';

    constructor(private readonly logger: Logger) {}

    get orders(): OrderDto[] {
        return this.readDbFile().orders;
    }

    get products(): ProductDto[] {
        return this.readDbFile().products;
    }

    private readDbFile(): any {
        const data = fs.readFileSync(this.dbPath);
        return JSON.parse(data.toString());
    } 
}