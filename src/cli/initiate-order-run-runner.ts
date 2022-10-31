import { Command, CommandRunner } from 'nest-commander';
import { InitiateOrderRunHandler } from 'src/app/initiate-order-run-handler';

@Command({
    name: 'initiate-order-run', 
    description: 'Initiates an order run',
    arguments: '<orderIds>' })
export class InitiateOrderRunRunner extends CommandRunner {
    constructor(
        private readonly initiateOrderRunHandler: InitiateOrderRunHandler) { 
            super();
        }

    async run (
        inputs: string[],
    ): Promise<void> {
        if(this.inputsValid(inputs)) {
            const orderIds = this.convertOrderIds(inputs);
            const unfilledOrders = this.initiateOrderRunHandler.handle(orderIds);
            console.log(unfilledOrders);
        }
    }

    private inputsValid(inputs: string[]): boolean {
        for (let input of inputs) {
            if (input === null ||
                input === '' ||
                isNaN(Number(input.toString()))) {
                    console.error(`${input} is not a valid order ID.`)
                    return false;
            }
        }

        return true;
    }

    private convertOrderIds(orderIdStrings: string[]): number[] {
        return orderIdStrings.map(idStr => parseInt(idStr));
    }
}
