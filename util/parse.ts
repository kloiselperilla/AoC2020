import fs = require('fs')

export function readFileToListMapping<T>(filePath: string, splitOn: string, mapFunc: (string) => T): T[] {
    const desiredList: T[] = fs.readFileSync(filePath, 'utf-8')
        .split(splitOn)
        .filter(Boolean)
        .map(mapFunc);
    return desiredList
}

export function readFileToList(filePath: string, splitOn: string): string[] {
    const desiredList: string[] = fs.readFileSync(filePath, 'utf-8')
        .split(splitOn)
        .filter(Boolean);
    return desiredList;
}