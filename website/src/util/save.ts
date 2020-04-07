import { Cell, Sudoku } from "./types";

export function fromString(str: string): Cell[][] {
    const cells: Cell[][] = [];
    for (let i = 0; i < 9; i++) {
        const row: Cell[] = [];
        for (let j = 0; j < 9; j++) {
            const val = str[i*9 + j];

            row.push({
                value: val === '.' ? undefined : parseInt(val),
                wrong: false,
                editable: val === '.',
                notes: []
            });
        }
        cells.push(row);
    }

    return cells;
}

export function toString(cells: Cell[][]): string {
    let str = '';

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            str += cells[i][j].value === undefined ? '.' : `${cells[i][j].value}`;
        }
    }

    return str;
}

const localStorageKey = 'sudokus';

export function getSudokus(): Sudoku[] {
    const store = localStorage.getItem(localStorageKey);
    let val: Sudoku[];
    if (store) {
        val = JSON.parse(store);
    } else {
        val = [];
    }
    return val;
}

function saveSudokus(sudokus: Sudoku[]) {
    localStorage.setItem(localStorageKey, JSON.stringify(sudokus));
}

function genId(sudokus: Sudoku[]) {
    if (sudokus.length === 0) {
        return 0;
    } else {
        return sudokus[sudokus.length - 1].id + 1;
    }
}

export function newSudoku(cells: Cell[][]): number {
    const sudokus = getSudokus();

    const sudoku = {
        id: genId(sudokus),
        cells,
        time: 0,
        solved: false
    }

    sudokus.push(sudoku);

    saveSudokus(sudokus);

    return sudoku.id;
}

export function saveSudoku(sudoku: Sudoku) {
    const sudokus = getSudokus();

    for (let i = 0; i < sudokus.length; i++) {
        if (sudokus[i].id == sudoku.id) {
            sudokus[i] = sudoku;
            break;
        }
    }

    saveSudokus(sudokus);
}

export function getSudoku(id: number): Sudoku | undefined {
    const sudokus = getSudokus();

    for (let i = 0; i < sudokus.length; i++) {
        console.log(sudokus[i], id);
        if (sudokus[i].id == id) {
            return sudokus[i];
        }
    }

    return undefined;
}

export function deleteSudoku(id: number): Sudoku[] {
    const sudokus = getSudokus();

    for (let i = 0; i < sudokus.length; i++) {
        if (sudokus[i].id == id) {
            sudokus.splice(i, 1);
            break;
        }
    }

    saveSudokus(sudokus);

    return sudokus;
}

export function copySudoku(id: number): Sudoku[] {
    const sudokus = getSudokus();

    for (let i = 0; i < sudokus.length; i++) {
        if (sudokus[i].id == id) {
            const copy = {
                id: genId(sudokus),
                cells: sudokus[i].cells,
                time: sudokus[i].time,
                solved: sudokus[i].solved
            };
            sudokus.push(copy);
            break;
        }
    }

    saveSudokus(sudokus);

    return getSudokus();
}