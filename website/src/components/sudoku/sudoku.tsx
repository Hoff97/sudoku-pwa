import * as React from 'react';
import "./style.css";
import { NumPad } from "../numpad/numpad";
import { Cell, CellValue, Sudoku } from '../../util/types';
import { generateSudoku } from '../../util/generator';
import { getSudoku, saveSudoku } from '../../util/save';
import { sudokuPercentage, displaySecs } from '../../util/util';

interface SudokuState {
    sudoku: Sudoku;
    focus: number[];
}

export class SudokuComponent extends React.Component<{}, SudokuState> {
    interval?: any;

    constructor(props: any, context: any) {
        super(props, context);

        const cells: Cell[][] = [];
        for (let i = 0; i < 9; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 9; j++) {
                row.push({
                    value: undefined,
                    wrong: false,
                    editable: true,
                    notes: []
                });
            }
            cells.push(row);
        }

        this.state = {
            sudoku: {
                cells: cells,
                id: -1,
                time: 0
            },
            focus: [-1,-1]
        };
    }

    generateSudoku() {
        const cells = generateSudoku();
        this.setState({
            sudoku: {
                cells: cells,
                id: this.state.sudoku.id,
                time: 0
            }
        });
        setTimeout(() =>  this.saveSudoku(), 100);
    }

    focus(x: number, y: number) {
        this.setState({
            ...this.state,
            focus: [Math.min(Math.max(0,x), 8), Math.min(Math.max(0,y), 8)]
        });
    }

    setCell(x: number, y: number, value: CellValue) {
        const cells = this.state.sudoku.cells;
        if (cells[x][y].editable) {
            cells[x][y].value = value;

            this.check(cells);
        }
    }

    setNote(x: number, y: number, value: number) {
        const cells = this.state.sudoku.cells;

        if (cells[x][y].editable) {
            const ix = cells[x][y].notes.indexOf(value);
            if (ix !== -1) {
                cells[x][y].notes.splice(ix, 1);
            } else {
                cells[x][y].notes.push(value);
                cells[x][y].notes = cells[x][y].notes.sort();
            }

            this.setState({
                ...this.state,
                sudoku: {
                    ...this.state.sudoku,
                    cells
                }
            });
            this.saveSudoku();
        }
    }

    deleteNotes(x: number, y: number) {
        const cells = this.state.sudoku.cells;

        if (cells[x][y].editable) {
            cells[x][y].notes = [];

            this.setState({
                ...this.state,
                sudoku: {
                    ...this.state.sudoku,
                    cells
                }
            });
            this.saveSudoku();
        }
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
            ...this.state,
            sudoku: {
                ...this.state.sudoku,
                cells
            }
        });
        this.saveSudoku();
    }

    componentDidMount(){
        const sudokuId = (this.props as any).match.params.sudokuId;

        const sudoku = getSudoku(sudokuId);

        if (sudoku) {
            this.setState({
                sudoku: sudoku
            });
        }

        document.addEventListener("keypress", event => this.handleKeyPress(event), false);
        document.addEventListener("keydown", event => this.handleKeyPress(event), false);

        this.interval = setInterval(() => this.increaseTime(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    increaseTime() {
        this.setState({
            ...this.state,
            sudoku: {
                ...this.state.sudoku,
                time: this.state.sudoku.time + 1
            }
        });
        this.saveSudoku();
    }

    saveSudoku() {
        if (this.state.sudoku.id !== null) {
            saveSudoku(this.state.sudoku);
        }
    }

    handleKeyPress(event: KeyboardEvent) {
        let [xFocus, yFocus] = this.state.focus;

        const parsed = parseInt(event.key);

        if (xFocus !== -1 && yFocus !== -1) {
            if (event.keyCode === 37) {
                this.focus(xFocus, yFocus - 1);
            } else if (event.keyCode === 38) {
                this.focus(xFocus - 1, yFocus);
            } else if (event.keyCode === 39) {
                this.focus(xFocus, yFocus + 1);
            } else if (event.keyCode === 40) {
                this.focus(xFocus + 1, yFocus);
            } else if (!isNaN(parsed) && parsed >= 1 && parsed <= 9) {
                if (event.ctrlKey) {
                    this.setNote(xFocus, yFocus, parsed);
                } else {
                    this.setCell(xFocus, yFocus, parsed);
                }
            } else if (event.key === 'Backspace') {
                if (event.ctrlKey) {
                    this.deleteNotes(xFocus, yFocus);
                } else {
                    this.setCell(xFocus, yFocus, undefined);
                }
            }
        }
    }

    render() {
        let [xFocus, yFocus] = this.state.focus;

        return <div className="sudoku">
            <table>
                <tbody>
                    {this.state.sudoku.cells.map((row, x) =>
                        <tr className="sudoku-row" key={x}>
                            {row.map((cell, y) => this.renderCell(cell, x, y))}
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={() => this.generateSudoku()}>Generate new sudoku</button>
            <NumPad
                emitClick={value => this.setCell(xFocus, yFocus, value)}
                emitNote={value => this.setNote(xFocus, yFocus, value)}/>
            <span>
                {displaySecs(this.state.sudoku.time)} - {sudokuPercentage(this.state.sudoku)}
            </span>
        </div>;
    }

    renderCell(cell: Cell, x: number, y: number) {
        let [xFocus, yFocus] = this.state.focus;

        const focused = xFocus === x && yFocus === y ? 'focus' : '';
        const wrong = cell.wrong ? 'wrong' : '';
        const set = cell.editable ? 'set' : '';
        const classes = `cell ${focused} ${wrong} ${set}`

        let content;
        if (cell.value) {
            content = cell.value;
        } else {
            content = <span className="note">{cell.notes.join('')}</span>
        }

        return <td className={classes}
            onClick={() => this.focus(x,y)}
            onKeyPress={event => this.handleKeyPress(event.nativeEvent)}
            key={`${x}-${y}`}>
                {content}
        </td>;
    }
}