import { Sudoku } from "./types";

export function displaySecs(time: number): string {
    let secs = time % 60;
    let s = '';
    if (secs < 10) {
        s += '0';
    }
    s += secs;
    return `${Math.floor(time/60)}:${s}`;
}

export function countSet(sudoku: Sudoku): number {
    let set = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = sudoku.cells[i][j];
            if (cell.editable && cell.value) {
                set += 1
            }
        }
    }
    return set;
}

export function countTotal(sudoku: Sudoku): number {
    let total = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = sudoku.cells[i][j];
            if (cell.editable) {
                total += 1;
            }
        }
    }
    return total;
}

export function sudokuPercentage(sudoku: Sudoku): string {
    let total = 0;
    let set = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = sudoku.cells[i][j];
            if (cell.editable) {
                total += 1;
            }
            if (cell.editable && cell.value) {
                set += 1
            }
        }
    }
    return `${set}/${total}`;
}