export class FlipCardModel {
    number: number = 1;
    isFlipped: boolean = false;
    isLocked: boolean = false;

    constructor(number: number) {
        this.number = number;
    }
}
