import { readFileToList } from "../util/parse"

const INPUT_PATH = 'day5/input'

let inputList: string[] = readFileToList(INPUT_PATH, '\n')

function ticketId(ticket: string): number {
    return parseInt(ticket.replace(/F/g, '0').replace(/B/g, '1').replace(/L/g, '0').replace(/R/g, '1'), 2)
}


function part1(inputList: string[]) {
    console.log(Math.max(...inputList.map(ticket => ticketId(ticket))))
}

function part2(inputList: string[]) {
    const sortedIds = inputList.map(ticket => ticketId(ticket)).sort((a, b) => a - b)

    for (let i = 0; i < sortedIds.length - 1; i++) {
        if ((sortedIds[i] + sortedIds[i + 1]) % 2 === 0) {
            console.log(sortedIds[i] + 1)
        }
    }
}

part1(inputList);
part2(inputList);