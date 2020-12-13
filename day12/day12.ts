import { add, complex, multiply, Complex, MathType } from 'mathjs';
import { readFileToList } from "../util/parse";

const INPUT_PATH = 'day12/input';

class Coord {
    position: MathType;
    direction: MathType;
    constructor(position: Complex, direction: Complex) {
        this.position = position;
        this.direction = direction;
    }
    manDistance(other: Coord): number {
        return Math.abs((this.position as Complex).re - (other.position as Complex).re)
             + Math.abs((this.position as Complex).im - (other.position as Complex).im);
    }
    turn(dir: string, degrees: number) {
        const turnDir: Complex = dir === "L" ? complex('1i') : complex('-1i')
        let degTurned = 0;
        while (degTurned < degrees) {
            this.direction = multiply(this.direction, turnDir);
            degTurned += 90;
        }
    }
    moveCardinalDir(dir: string, dist: number) {
        let moveDir: Complex;
        switch (dir) {
            case ("N"):
                moveDir = complex('1i');
                break;
            case ("E"):
                moveDir = complex('1');
                break;
            case ("S"):
                moveDir = complex('-1i');
                break;
            case ("W"):
                moveDir = complex('-1');
                break;
            default:
                console.log("You fucked up")
                moveDir = complex('0')
        }
        this.position = add(this.position, multiply(dist, moveDir))
    }
    moveForward(dist: number) {
        this.position = add(this.position, multiply(this.direction, dist))
    }
    executeInstructions(inputList: string[]) {
        inputList.forEach(instruction => {
            const dir: string = instruction[0];
            const num: number = parseInt(instruction.substring(1));
            if (["N", "E", "S", "W"].includes(dir)) {
                this.moveCardinalDir(dir, num);
            } else if (["L", "R"].includes(dir)) {
                this.turn(dir, num);
            } else if (dir === "F") {
                this.moveForward(num);
            } else {
                console.log("YOU FUCKED UP")
            }
        })
    }
}

class ActualCoord {
    position: MathType;
    waypointPos: MathType;
    constructor(position: Complex) {
        this.position = position;
        this.waypointPos = add(this.position, complex('10 + 1i'))
    }
    manDistance(other: ActualCoord): number {
        return Math.abs((this.position as Complex).re - (other.position as Complex).re)
             + Math.abs((this.position as Complex).im - (other.position as Complex).im);
    }
    turn(dir: string, degrees: number) {
        const turnDir: Complex = dir === "L" ? complex('1i') : complex('-1i')
        let degTurned = 0;
        while (degTurned < degrees) {
            this.waypointPos = multiply(this.waypointPos, turnDir);
            degTurned += 90;
        }
    }
    moveCardinalDir(dir: string, dist: number) {
        let moveDir: Complex;
        switch (dir) {
            case ("N"):
                moveDir = complex('1i');
                break;
            case ("E"):
                moveDir = complex('1');
                break;
            case ("S"):
                moveDir = complex('-1i');
                break;
            case ("W"):
                moveDir = complex('-1');
                break;
            default:
                console.log("You fucked up")
                moveDir = complex('0')
        }
        this.waypointPos = add(this.waypointPos, multiply(dist, moveDir))
    }
    moveForward(dist: number) {
        this.position = add(this.position, multiply(this.waypointPos, dist))
    }
    executeInstructions(inputList: string[]) {
        inputList.forEach(instruction => {
            const dir: string = instruction[0];
            const num: number = parseInt(instruction.substring(1));
            if (["N", "E", "S", "W"].includes(dir)) {
                this.moveCardinalDir(dir, num);
            } else if (["L", "R"].includes(dir)) {
                this.turn(dir, num);
            } else if (dir === "F") {
                this.moveForward(num);
            } else {
                console.log("YOU FUCKED UP")
            }
        })
    }
}

let inputList = readFileToList(INPUT_PATH, '\n');

function part1(inputList: string[]) {
    let pos = new Coord(complex('0'), complex('1'))
    pos.executeInstructions(inputList);
    console.log("Part 1:", pos.manDistance(new Coord(complex('0'), complex('1'))));
}
function part2(inputList: string[]) {
    let pos = new ActualCoord(complex('0'));
    pos.executeInstructions(inputList);
    console.log("Part 2:", pos.manDistance(new ActualCoord(complex('0'))));

}
part1(inputList);
part2(inputList);