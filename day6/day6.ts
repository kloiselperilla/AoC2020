import { readFileToList } from "../util/parse"

const INPUT_PATH = 'day6/input'

let inputList: string[] = readFileToList(INPUT_PATH, '\n\n')

function setOfAnswers(answerStr: string): Set<string> {
    let answerSet = new Set(answerStr.split(''));
    answerSet.delete('\n');
    return answerSet;
}

function answerSetList(answerStr: string): Set<string>[] {
    return answerStr.split('\n').map((s) => new Set(s.split('')));
}

function setListUnion(setList: Set<string>[]): Set<string> {
    return setList.reduce((unionSet, currSet) => new Set([...unionSet, ...currSet]))
}

function setListIntersection(setList: Set<string>[]): Set<string> {
    return setList.reduce((isectSet, currSet) => new Set([...isectSet].filter(x => currSet.has(x))))
}

function part1(inputList: string[]) {
    // A is faster (2.233ms vs 9.923ms) but B matches part2 more
    console.time("A");
    console.log("Part 1:", inputList.map((i) => setOfAnswers(i).size)
        .reduce((total, s: number) => total + s))
    console.timeEnd("A");

    console.time("B");
    console.log("Part 1:", inputList.map(s => answerSetList(s))
        .map(setList => setListUnion(setList).size)
        .reduce((total, s: number) => total + s));
    console.timeEnd("B");
}

function part2(inputList: string[]) {
    console.log("Part 2:", inputList.map(s => answerSetList(s))
        .map(setList => setListIntersection(setList).size)
        .reduce((total, s: number) => total + s))
}

part1(inputList);

part2(inputList);
