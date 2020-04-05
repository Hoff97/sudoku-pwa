import * as React from 'react';
import "./style.css";
import { generateSudoku } from '../../util/generator';
import { saveSudoku, getSudokus } from '../../util/save';
import { useHistory } from 'react-router-dom';

export function Home() {
    const history = useHistory();

    function newSudoku() {
        const cells = generateSudoku();
        const id = saveSudoku(cells);

        history.push(`/sudoku/${id}`)
    }

    function toSudoku(id: number) {
        history.push(`/sudoku/${id}`)
    }

    const sudokus = getSudokus();

    return <div className="home">
            <table>
                <tbody>
                    <tr className="sudoku">
                        <td className="sudoku" onClick={() => newSudoku()}>New sudoku</td>
                    </tr>
                    {sudokus.map(sudoku => {
                        return <tr className="sudoku" key={sudoku.id}>
                            <td className="sudoku" onClick={() => toSudoku(sudoku.id)}></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>;
}