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
}