import { readFileToListMapping } from '../util/parse'

class AocInstruction {
    command: string;
    amount: number;
    constructor(instruction: string) {
        let [command, num] = instruction.split(' ');
        this.command = command;
        this.amount = parseInt(num);
    }
}

class AocAsmEngine {
    instructionList: AocInstruction[];
    accumulator: number = 0;
    pc: number = 0;

    instrLog: Set<number> = new Set();

    constructor(instructionList: AocInstruction[]) {
        this.instructionList = instructionList;
    }

    run(): boolean {
        while(this.pc < this.instructionList.length) {
            let currInstr = this.instructionList[this.pc];
            if (this.instrLog.has(this.pc)) {
                return false;
            }
            this.instrLog.add(this.pc)

            switch(currInstr.command) {
                case "jmp":
                    this.pc += currInstr.amount - 1
                    break;
                case "acc":
                    this.accumulator += currInstr.amount;
                    break;
                case "nop":
                    break;
                default:
                    console.log("YOU'RE NOT SUPPOSED TO BE HERE")
            }
            this.pc += 1;
        }
        return true
    }
}

const INPUT_PATH = 'day8/input'

function part1() {
    const eng = new AocAsmEngine(readFileToListMapping(INPUT_PATH, '\n', s => new AocInstruction(s)))
    eng.run()
    console.log("Part 1:", eng.accumulator)
}

function part2() {
    let inputList = readFileToListMapping(INPUT_PATH, '\n', s => new AocInstruction(s))
    // deep copy
    let fixList: AocInstruction[] = []
    inputList.forEach((instr) => {
        const plus = instr.amount >= 0 ? "+" : ""
        const newInstr = instr.command + ` ${plus}${instr.amount}`
        fixList.push(new AocInstruction(newInstr))
    })

    for (let i = 0; i < inputList.length; i++) {
        let origCmd = inputList[i].command;
        if (["jmp", "nop"].includes(origCmd)) {
            fixList[i].command = origCmd == "jmp" ? "nop" : "jmp"

            let eng = new AocAsmEngine(fixList);
            if (eng.run()) {
                console.log("Part 2:", eng.accumulator)
                return;
            }

            fixList[i].command = origCmd;
        }

    }
}

part1();
part2();
