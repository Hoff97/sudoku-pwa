import * as React from 'react';
import "./style.css";
import { generateSudoku } from '../../util/generator';
import { getSudokus, deleteSudoku, newSudoku, copySudoku } from '../../util/save';
import { Sudoku } from '../../util/types';
import { Route } from 'react-router-dom';

import del from './delete.png';
import { displaySecs, sudokuPercentage } from '../../util/util';

interface HomeState {
    sudokus: Sudoku[];
}

export class Home extends React.Component<{}, HomeState> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            sudokus: []
        };
    }

    componentDidMount(){
        this.setState({
            sudokus: getSudokus()
        });
    }

    newSudoku(history: any) {
        const cells = generateSudoku();
        const id = newSudoku(cells);

        history.push(`/sudoku/${id}`)
    }

    toSudoku(id: number, history: any) {
        history.push(`/sudoku/${id}`)
    }

    deleteSudoku(id: number) {
        const sudokus = deleteSudoku(id);
        this.setState({
            sudokus
        });
    }

    copySudoku(id: number) {
        const sudokus = copySudoku(id);
        this.setState({
            sudokus
        });
    }

    render() {
        return <Route render={({ history}) => (
            <div className="home">
                <table>
                    <tbody>
                        <tr className="sudoku">
                            <td className="sudoku" onClick={() => this.newSudoku(history)}>New sudoku</td>
                        </tr>
                        {this.state.sudokus.map(sudoku => {
                            return <tr className="sudoku" key={sudoku.id}>
                                <td className="sudoku">
                                    <span onClick={() => this.toSudoku(sudoku.id, history)}>
                                        {displaySecs(sudoku.time)} - {sudokuPercentage(sudoku)}
                                    </span>
                                    <div className="actions">
                                        <span className="copy"
                                            onClick={() => this.copySudoku(sudoku.id)}>&#x1f4cb;</span>
                                        <img src={del} className="delete" alt="Delete sudoku"
                                            onClick={() => this.deleteSudoku(sudoku.id)}
                                            width="50px"/>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )} />;
    }
}