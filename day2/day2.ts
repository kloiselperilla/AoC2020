import fs = require('fs')

const INPUT_PATH: string = './day2/input2'

class Password {
    min: number;
    max: number;
    targetLetter: string;
    password: string;

    constructor(min, max, targetLetter, password) {
        this.min = min;
        this.max = max;
        this.targetLetter = targetLetter;
        this.password = password;
    }

    validateOld() {
        const re = new RegExp(this.targetLetter, "g");
        const count: number = (this.password.match(re) || []).length
        return (this.max >= count) && (count >= this.min);
    }
    validateNew() {
        const aPos = (this.password[this.min - 1] === this.targetLetter);
        const bPos = (this.password[this.max - 1] === this.targetLetter);
        return (aPos ? !bPos : bPos)
    }
}

let passList: Password[] = fs.readFileSync(INPUT_PATH, 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map((x: string) => {
        const min = x.substring(0, x.indexOf('-'))
        const max = x.substring(x.indexOf('-') + 1, x.indexOf(' '))
        const targetLetter = x.substring(x.indexOf(' ') + 1, x.indexOf(':'))
        const password = x.substring(x.indexOf(':') + 2)
        return new Password(min, max, targetLetter, password);
    })


const part1 = () => {
    let validPasswords: Password[] = passList.filter((pass) => pass.validateOld());
    console.log("Part 1: ", validPasswords.length)
}

const part2 = () => {
    let validPasswords: Password[] = passList.filter((pass) => pass.validateNew());
    console.log("Part 2: ", validPasswords.length)
}

part1()
part2()
