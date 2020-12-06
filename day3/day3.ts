import * as fs from 'fs';

const INPUT_PATH: string = './day3/input'

class Position {
    x: number;
    y: number;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    move(dX: number, dY: number) {
        this.x += dX;
        this.y += dY;
    }
}

const countTrees = (dX: number, dY: number, map: string[]) => {
    const xPeriod: number = map[0].length
    const yLength: number = map.length
    let pos: Position = new Position(0, 0)
    let treeCount: number = 0;
    while (pos.y + dY < yLength) {
        if (map[pos.y + dY][(pos.x + dX) % xPeriod] === "#") {
            treeCount++;
        }
        pos.move(dX, dY);
    }
    return treeCount;
}

let inputList: string[] = fs.readFileSync(INPUT_PATH, 'utf-8')
    .split('\n')
    .filter(Boolean)

const part1 = () => {
    const treeCount = countTrees(3, 1, inputList);
    console.log("Part 1:", treeCount);
}

const part2 = () => {
    const count11 = countTrees(1, 1, inputList);
    const count31 = countTrees(3, 1, inputList);
    const count51 = countTrees(5, 1, inputList);
    const count71 = countTrees(7, 1, inputList);
    const count12 = countTrees(1, 2, inputList);
    console.log("Part 2:", count11 * count31 * count51 * count71 * count12)
}

part1();
part2();
