import { readFileToListMapping } from "../util/parse";

const INPUT_PATH = 'day9/input'


class XmasSystem {
    preLen: number;
    availQueue: number[];
    fullInput: number[];
    ix: number;

    constructor(fullInput: number[], preLen: number) {
        this.preLen = preLen;
        this.ix = preLen;
        this.availQueue = fullInput.slice(0, preLen).reverse();
        this.fullInput = fullInput;
    }

    isValidNext(candidate: number): boolean {
        let availCopy = [...this.availQueue].sort((a, b) => a - b);

        for (let i = 0; availCopy[i] <= candidate / 2; i++) {
            for (let j = i + 1; availCopy[i] + availCopy[j] <= candidate; j++) {
                if (availCopy[i] + availCopy[j] === candidate) {
                    return true;
                }
            }
        }
        return false;
    }
    next() {
        const candidate = this.fullInput[this.ix]
        if (this.isValidNext(candidate)) {
            this.availQueue.pop();
            this.availQueue.splice(0, 0, candidate);
            this.ix++;
            return true;
        }
        return false;
    }

    contiguousSlice() {

    }
}

const inputList: number[] = readFileToListMapping(INPUT_PATH, '\n', s => parseInt(s))

function day1(inputList: number[]): number {
    let system = new XmasSystem(inputList, 25)
    let stillValid: boolean = system.next();
    while (stillValid) {
        stillValid = system.next();
    }
    const invalidNumber = system.fullInput[system.ix]
    console.log("Part 1:", invalidNumber)
    return invalidNumber
}
function day2(inputList: number[], invalidNumber: number) {
    for (let front = 0; front < inputList.length - 1; front++) {
        let testSegment: number[] = [inputList[front]];
        for (let back = front + 1; back < inputList.length; back++) {
            testSegment.push(inputList[back]);
            const segSum = testSegment.reduce((sum, x) => sum + x, 0);
            if (segSum === invalidNumber) {
                const min = Math.min(...testSegment);
                const max = Math.max(...testSegment)
                console.log("Part 2:", min + max)
                return;
            } else if (segSum > invalidNumber) {
                break;
            }
        }
    }

}

const invalidNumber = day1(inputList);
day2(inputList, invalidNumber);
