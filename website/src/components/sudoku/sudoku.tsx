import { h, Component, ComponentChild } from "preact";
import * as style from "./style.css";

import("wasm-game-of-life").then(module => {
    const sudoku = module.generate_sudoku();
    console.log(sudoku);
    const sol = module.solve_sudoku(sudoku);
    console.log(sol);
});

type CellValue = number | undefined;

interface Cell {
    value: CellValue;
    wrong: boolean;
}

interface SudokuState {
    cells: Cell[][];
    focus: number[];
}

export class Sudoku extends Component<{}, SudokuState> {
    constructor(props: any, context: any) {
        super(props, context);

        const cells: Cell[][] = [];
        for (let i = 0; i < 9; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 9; j++) {
                row.push({
                    value: undefined,
                    wrong: false
                });
            }
            cells.push(row);
        }

        this.state = {
            cells: cells,
            focus: [-1,-1]
        };
    }

    focus(x: number, y: number) {
        this.setState({
            ...this.state,
            focus: [Math.min(Math.max(0,x), 8), Math.min(Math.max(0,y), 8)]
        });
    }

    setCell(x: number, y: number, value: CellValue) {
        const cells = this.state.cells;
        cells[x][y].value = value;

        this.check(cells);
    }

    check(cells: Cell[][]) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                cells[i][j].wrong = false;
            }
        }
        for (let i = 0; i < 9; i++) {
            let row: CellValue[] = [];
            let col: CellValue[] = [];
            let sq: CellValue[] = [];

            for (let j = 0; j < 9; j++) {
                const x = Math.floor(i/3)*3 + Math.floor(j/3);
                const y = (i%3)*3 + (j%3);

                if (row.includes(cells[i][j].value)) {
                    cells[i][j].wrong = true;
                }
                if (col.includes(cells[j][i].value)) {
                    cells[j][i].wrong = true;
                }
                if (sq.includes(cells[x][y].value)) {
                    cells[x][y].wrong = true;
                }

                if (cells[i][j].value !== undefined) {
                    row.push(cells[i][j].value);
                }
                if (cells[j][i].value !== undefined) {
                    col.push(cells[j][i].value);
                }
                if (cells[x][y].value !== undefined) {
                    sq.push(cells[x][y].value);
                }
            }

            row = [];
            col = [];
            sq = [];

            for (let j = 8; j >= 0; j--) {
                const x = Math.floor(i/3)*3 + Math.floor(j/3);
                const y = (i%3)*3 + (j%3);

                if (row.includes(cells[i][j].value)) {
                    cells[i][j].wrong = true;
                }
                if (col.includes(cells[j][i].value)) {
                    cells[j][i].wrong = true;
                }
                if (sq.includes(cells[x][y].value)) {
                    cells[x][y].wrong = true;
                }

                if (cells[i][j].value !== undefined) {
                    row.push(cells[i][j].value);
                }
                if (cells[j][i].value !== undefined) {
                    col.push(cells[j][i].value);
                }
                if (cells[x][y].value !== undefined) {
                    sq.push(cells[x][y].value);
                }
            }
        }

        this.setState({
            ...this.state, cells
        });
    }

    componentDidMount(){
        document.addEventListener("keypress", event => this.handleKeyPress(event), false);
        document.addEventListener("keydown", event => this.handleKeyPress(event), false);
    }

    handleKeyPress(event: KeyboardEvent) {
        let [xFocus, yFocus] = this.state.focus;

        const parsed = parseInt(event.key);

        if (xFocus != -1 && yFocus != -1) {
            if (event.keyCode == 37) {
                this.focus(xFocus, yFocus - 1);
            } else if (event.keyCode == 38) {
                this.focus(xFocus - 1, yFocus);
            } else if (event.keyCode == 39) {
                this.focus(xFocus, yFocus + 1);
            } else if (event.keyCode == 40) {
                this.focus(xFocus + 1, yFocus);
            } else if (parsed != NaN && parsed >= 1 && parsed <= 9) {
                this.setCell(xFocus, yFocus, parsed);
            } else if (event.key === 'Backspace') {
                this.setCell(xFocus, yFocus, undefined);
            }
        }
    }

    render(): ComponentChild {
        let [xFocus, yFocus] = this.state.focus;

        return <div className={style.sudoku}>
            <table>
                {this.state.cells.map((row, x) => 
                    <tr>
                        {row.map((cell, y) => {
                            const focused = xFocus == x && yFocus == y ? style.focus : '';
                            const wrong = cell.wrong ? style.wrong : '';
                            const classes = `${style.cell} ${focused} ${wrong}`

                            return <td className={classes}
                                onClick={() => this.focus(x,y)}
                                onKeyPress={event => this.handleKeyPress(event)}>
                                    {cell.value}
                            </td>;
                        })}
                    </tr>
                )}
            </table>
        </div>;
    }
}