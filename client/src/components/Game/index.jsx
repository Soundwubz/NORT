import React from 'react';
import './style.css';
import {loadGame} from './game';



class Game extends React.Component {
    componentDidMount() {
        loadGame();
    }
    render() {
        return(
            <div>
                <div className="container game">
                    <div className="row">
                        <div className="col">
                            <canvas id="nort" width="750" height="750"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;