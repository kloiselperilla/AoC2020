import { readFileToList } from '../util/parse'
const INPUT_PATH = 'day7/input'

class BagCombo {
    num: number;
    color: string;
    constructor(num: number, color: string) {
        this.color = color;
        this.num = num;
    }
}

class BagRule {
    static bagRuleMap: { [color: string]: BagRule } = {}
    static revMap: { [color: string]: string[] } = {}

    color: string;
    contents: BagCombo[];

    constructor(color: string, contents: BagCombo[]) {
        this.color = color;
        this.contents = contents;
    }

    static processRule(ruleString: string) {
        const color: string = ruleString.substring(0, ruleString.indexOf(' bags'))
        const contentStr: string = ruleString.substring(ruleString.indexOf('contain') + 'contain '.length)
        const bagsRegex = /([0-9]+)\s([\w\s]+)\sbag/g;
        let matchExec: RegExpExecArray | null = bagsRegex.exec(contentStr);
        let contentsToAdd: BagCombo[] = []
        while (matchExec != null) {
            if (matchExec.length >= 3) {
                const exNum = parseInt(matchExec[1])
                const exColor = matchExec[2];
                let newCombo = new BagCombo(exNum, exColor)
                if (!(exColor in BagRule.revMap)) {
                    BagRule.revMap[exColor] = [];
                }
                BagRule.revMap[exColor].push(color)
                contentsToAdd.push(newCombo)
            }
            matchExec = bagsRegex.exec(contentStr);
        }
        const ruleToAdd = new BagRule(color, contentsToAdd)
        BagRule.bagRuleMap[color] = ruleToAdd;
        return ruleToAdd;
    }

    static getPossibleOuterBags(color: string): Set<string> {
        if (!(color in BagRule.revMap)) {
            return new Set()
        }
        let possibleOuters: Set<string> = new Set(BagRule.revMap[color])
        BagRule.revMap[color].forEach((outerColor) => {
            BagRule.getPossibleOuterBags(outerColor).forEach(c => possibleOuters.add(c))
        })
        return possibleOuters;
    }

    static getInnerBags(color: string): number {
        if (!(BagRule.bagRuleMap[color].contents)) {
            return 0;
        }
        let innerCnt = 0;
        BagRule.bagRuleMap[color].contents.forEach(c => {
            innerCnt += c.num + c.num * BagRule.getInnerBags(c.color)
        })
        return innerCnt;
    }
}

const inputList = readFileToList(INPUT_PATH, '\n')
inputList.forEach((i) => {
    BagRule.processRule(i);
})

function part1() {
    console.log("Part 1:", BagRule.getPossibleOuterBags("shiny gold").size)
}

function part2() {
    console.log("Part 2:", BagRule.getInnerBags("shiny gold"))
}

part1();
part2();
