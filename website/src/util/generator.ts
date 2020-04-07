import { SudokuHelper, Cell } from "./types";
import { fromString } from "./save";

let sudokuHelper: SudokuHelper;

import("sudoku-generator").then(module => {
    sudokuHelper = module;
});

export function generateSudoku(): Cell[][] {
    if (sudokuHelper) {
        const sudoku = sudokuHelper.generate_sudoku();
        const cells = fromString(sudoku);
        return cells;
    }
    return [[]];
}

export const missEasy = 20;
export const missMedium = 40;
export const missHard = 81;

export function generateSudokuMissing(missing: number): Cell[][] {
    if (sudokuHelper) {
        const sudoku = sudokuHelper.generate_sudoku_by_missing(missing);
        const cells = fromString(sudoku);
        return cells;
    }
    return [[]];
}

export function generateSudokuHardness(hardness: number): Cell[][] {
    if (sudokuHelper) {
        const sudoku = sudokuHelper.generate_sudoku_by_hardness(hardness);
        const cells = fromString(sudoku);
        return cells;
    }
    return [[]];
}