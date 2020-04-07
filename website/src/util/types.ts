export type CellValue = number | undefined;

export interface Cell {
    value: CellValue;
    wrong: boolean;
    editable: boolean;
    notes: number[];
}

export interface SudokuHelper {
    generate_sudoku(): string;
    solve_sudoku(s: string): string;
    generate_sudoku_by_hardness(hardness: number): string;
    generate_sudoku_by_missing(miss: number): string;
}

export interface Sudoku {
    id: number;
    cells: Cell[][];
    time: number;
};