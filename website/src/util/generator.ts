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
    return [[]]
}