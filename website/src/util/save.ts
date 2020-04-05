import { Cell } from "./types";

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
        const row: Cell[] = [];
        for (let j = 0; j < 9; j++) {
            str += cells[i][j].value === undefined ? '.' : `${cells[i][j].value}`;
        }
    }

    return str;
}

const localStorageKey = 'sudokus';

interface Sudoku {
    id: number;
    cells: Cell[][];
};

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

export function saveSudoku(cells: Cell[][], id?: number): number {
    const sudokus = getSudokus();

    const sudoku = {
        id: (id !== null && id !== undefined) ? id : genId(sudokus),
        cells
    }

    if (id || id === 0) {
        for (let i = 0; i < sudokus.length; i++) {
            if (sudokus[i].id == sudoku.id) {
                sudokus[i] = sudoku;
                break;
            }
        }
    } else {
        sudokus.push(sudoku);
    }

    saveSudokus(sudokus);

    return sudoku.id;
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