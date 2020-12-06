import * as fs from "fs";

const INPUT_PATH: string = './day1/input1a'

const findTwoAddTo = (target: number, numList: number[]) => {
    let addToMatches: number[][] = [];
    for (let i = 0; i < numList.length; i++) {
        for (let j = i + 1; j < numList.length; j++) {
            if (numList[i] + numList[j] === target){
                addToMatches.push([numList[i], numList[j]]);
            }
        }
    }
    return addToMatches;
}

const findThreeAddTo = (target: number, numList: number[]) => {
    let addToMatches: number[][] = [];
    for (let i = 0; i < numList.length; i++) {
        for (let j = i + 1; j < numList.length; j++) {
            for (let l = j + 1; l < numList.length; l++) {
                if (numList[i] + numList[j] + numList[l] === target){
                    addToMatches.push([numList[i], numList[j], numList[l]]);
                }
            }
        }
    }
    return addToMatches;
}

let inputList: number[] = fs.readFileSync(INPUT_PATH, 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map((x) => {
        return parseInt(x, 10);
    })

const partA = () => {
    let addToMatches: number[][] = findTwoAddTo(2020, inputList);
    if (addToMatches.length == 1) {
        let p: number[] = addToMatches[0];
        const sum = p.reduce((a, b) => a * b)
        console.log("Part 1 Answer: ", sum)
    } else {
        console.log("You made a mistake, dummy")
    }
}

const partB = () => {
    let addToMatches: number[][] = findThreeAddTo(2020, inputList);
    if (addToMatches.length == 1) {
        let p: number[] = addToMatches[0];
        const sum = p.reduce((a, b) => a * b)
        console.log("Part 2 Answer: ", sum)
    } else {
        console.log("You made a mistake, dummy")
    }
}

partA();
partB();
