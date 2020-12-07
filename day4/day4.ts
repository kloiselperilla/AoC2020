import { readFileToListMapping } from '../util/parse'
const INPUT_PATH = 'day4/input'

class Passport {
    static REQUIRED_ATRS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    static ATR_VALIDATORS: { [key: string]: (f: string) => boolean} = {
        "byr": (f: string) => { return parseInt(f) >= 1920 && parseInt(f) <= 2002},
        "iyr": (f: string) => { return parseInt(f) >= 2010 && parseInt(f) <= 2020},
        "eyr": (f: string) => { return parseInt(f) >= 2020 && parseInt(f) <= 2030},
        "hgt": (f: string) => {
            const num = f.substring(0, f.length - 2);
            const unit = f.substring(f.length - 2);
            if (unit === "cm") {
                return parseInt(num) >= 150 && parseInt(num) <= 193;
            } else if (unit === "in") {
                return parseInt(num) >= 59 && parseInt(num) <= 76;
            } else {
                return false;
            }
        },
        "hcl": (f: string) => {
            return f.length === 7 && f[0] === "#" && parseInt(f.substring(1), 16) <= 0xFFFFFF
        },
        "ecl": (f: string) => {
            return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(f);
        },
        "pid": (f: string) => {
            return f.length === 9 && parseInt(f) < 1e10;
        },
    }
    attributes: { [key: string]: string } = {}
    validateWeak() {
        let isValid = true;
        Passport.REQUIRED_ATRS.forEach(atr => {
            if (!(atr in this.attributes)) {
                isValid = false;
            }
        })
        return isValid;
    }
    validateStrong() {
        let isValid = true;
        Passport.REQUIRED_ATRS.forEach(atr => {
            if (!(atr in this.attributes && Passport.ATR_VALIDATORS[atr](this.attributes[atr]))) {
                isValid = false;
            }
        })
        return isValid;
    }
    constructor(defStr: string) {
        // this.defStr = defStr;
        this.attributes = {}
        const atrListStr = defStr.split('\n').join(' ').split(' ')
        atrListStr.forEach(atrStr => {
            const pair = atrStr.split(':');
            this.attributes[pair[0]] = pair[1];
        })
    }
}

let inputList: Passport[] = readFileToListMapping(INPUT_PATH, '\n\n', (e) => new Passport(e))

function part1() {
    const validPass: Passport[] = inputList.filter(pass => pass.validateWeak())
    console.log("Part 1:", validPass.length)
}
function part2() {
    const validPass: Passport[] = inputList.filter(pass => pass.validateStrong())
    console.log("Part 2:", validPass.length)
}

part1();
part2();
