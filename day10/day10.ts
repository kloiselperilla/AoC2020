import { readFileToListMapping } from "../util/parse";

const INPUT_PATH = 'day10/input';

function getDiffCounts(sortedList: number[]): { [diff: number]: number} {
    let counts: { [diff: number]: number } = { 0: 0, 1: 0, 2: 0, 3: 0 };

    for (let i = 0; i < sortedList.length - 1; i++) {
        const diff = sortedList[i + 1] - sortedList[i];
        counts[diff]++;
    }
    return counts;
}

function totalCombosCountBack(inputList: number[]) {
    let results = new Array(inputList.length - 1)
    results[inputList.length - 1] = 1;
    for (let i = inputList.length - 2; i >= 0; i--) {
        results[i] = totalCombos(inputList, i, results);
    }
    return results;
}

function totalCombos(inputList: number[], inputIx: number, results: number[]): number {
    if (inputIx >= inputList.length - 1) {
        return 1;
    }
    let combos: number = 0;
    for (let i = 1; i <= 3; i++) {
        if (inputList[inputIx + i] - inputList[inputIx] <= 3) {
            combos += results[inputIx + i];
        }
    }
    return combos;
}

let inputList = readFileToListMapping(INPUT_PATH, '\n', s => parseInt(s));

inputList.sort((a, b) => a - b);
inputList.splice(0, 0, 0);
const maxAdapter = Math.max(...inputList);
inputList.push(maxAdapter + 3);

function part1(inputList: number[]) {
    const counts = getDiffCounts(inputList);
    console.log("Part 1:", counts[1] * counts[3])
}

function part2(inputList: number[]) {
    const results = totalCombosCountBack(inputList)
    console.log("Part 2:", results[0]);
}

part1(inputList);
part2(inputList);
