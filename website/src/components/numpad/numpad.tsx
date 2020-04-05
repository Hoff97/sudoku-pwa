import * as React from 'react';
import "./style.css";
import { CellValue } from '../../util/types';

const nums = [1,2,3,4,5,6,7,8,9,undefined];

interface NumPadProps {
    emitClick(num: CellValue): void;
    emitNote(num: number): void;
}

export class NumPad extends React.Component<NumPadProps, {}> {
    private buttonPressTimer?: any;

    render() {
        return <div>
            <table>
                <tbody>
                    <tr>
                        {nums.map(cell => this.renderButton(cell))}
                    </tr>
                </tbody>
            </table>
        </div>;
    }

    handleButtonPress(num: CellValue) {
        this.buttonPressTimer = setTimeout(() => {
            if (num) {
                this.props.emitNote(num);
            }
            this.buttonPressTimer = undefined;
        }, 500);
    }

    handleButtonRelease(num: CellValue) {
        if (this.buttonPressTimer) {
            clearTimeout(this.buttonPressTimer);
            this.buttonPressTimer = undefined;

            this.props.emitClick(num);
        }
    }

    renderButton(cell: CellValue) {
        return <td className="numpad-cell"
                    onTouchStart={() => this.handleButtonPress(cell)}
                    onTouchEnd={() => this.handleButtonRelease(cell)}
                    onMouseDown={() => this.handleButtonPress(cell)}
                    onMouseUp={() => this.handleButtonRelease(cell)}
                    onMouseLeave={() => this.handleButtonRelease(cell)}
                    key={`${cell}`}>
                {cell}
        </td>;
    }
}