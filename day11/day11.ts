import { readFileToListMapping } from "../util/parse";

const INPUT_PATH = 'day11/input';

const inputList: string[][] = readFileToListMapping(INPUT_PATH, '\n', s => s.split(''));

function adjacentSeatsFilled(inputMap: string[][], x: number, y: number): number {
    let adjCount = 0;
    [-1, 0, 1].forEach(xDirection => {
        const xTarget = x + xDirection;
        if (xTarget >= 0 && xTarget < inputMap[0].length) {
            [-1, 0, 1].forEach(yDirection => {
                const yTarget = y + yDirection;
                if (!(xTarget === x && yTarget === y)
                                    && yTarget >= 0 && yTarget < inputMap.length
                                    && inputMap[yTarget][xTarget] === "#") {
                    adjCount++;
                }
            })
        }
    })
    return adjCount;
}

function visibleSeatsFilled(inputMap: string[][], x: number, y: number): number {
    let adjCount = 0;
    [-1, 0, 1].forEach(xDirection => {
        [-1, 0, 1].forEach(yDirection => {
            if (!(xDirection === 0 && yDirection === 0)) {
                let distance = 1;
                let visible = true;
                while (visible) {
                    const yTarget = y + distance * yDirection;
                    const xTarget = x + distance * xDirection;
                    if (yTarget >= 0 && yTarget < inputList.length && xTarget >= 0 && xTarget < inputList[0].length) {
                        const spot = inputMap[yTarget][xTarget];
                        if (spot === "#") {
                            adjCount++;
                        }
                        if (["#", "L"].includes(spot)) {
                            visible = false;
                        }
                    } else {
                        visible = false;
                    }
                    distance++;
                }
            }
        })
    })
    return adjCount;
}

function printMap(inputMap: string[][]) {
    inputMap.forEach(row => {
        console.log(row.join(''))
    });
    console.log('\n')
}

function updateMap(inputMap: string[][], adjacentLimit: number,
                   adjacentFunc: (map: string[][], x: number, y: number) => number,) {
    let checkingMap = inputMap;
    let isChanging = true;

    while (isChanging) {
        let updatedMap: string[][] = []
        checkingMap.forEach(line => {
            updatedMap.push(Array.from(line))
        })

        let changed = false;
        checkingMap.forEach((row, y) => {
            row.forEach((char, x) => {
                if (char === "#" && adjacentFunc(checkingMap, x, y) >= adjacentLimit) {
                    updatedMap[y][x] = "L";
                    changed = true;
                } else if (char === "L" && adjacentFunc(checkingMap, x, y) === 0) {
                    updatedMap[y][x] = "#";
                    changed = true;
                }
            })
        })
        if (!changed) {
            isChanging = false;
        }
        checkingMap = updatedMap;
    }
    return checkingMap;

}

function part1(inputList: string[][]) {
    const finalMap = updateMap(inputList, 4, adjacentSeatsFilled);
    let sumSeats = 0;
    finalMap.forEach(row => {
        const rowSum = (row.join('').match(/#/g) || []).length
        sumSeats += rowSum;
    })

    console.log("Part 1:", sumSeats);
}

function part2(inputList: string[][]) {
    const finalMap = updateMap(inputList, 5, visibleSeatsFilled);
    let sumSeats = 0;
    finalMap.forEach(row => {
        const rowSum = (row.join('').match(/#/g) || []).length
        sumSeats += rowSum;
    })

    console.log("Part 2:", sumSeats);

}

part1(inputList);
part2(inputList);
