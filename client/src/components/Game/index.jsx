import React from 'react';
import {loadGame} from './game';



class Game extends React.Component {

    nortStyle = {
        border: "1px solid #777",
        outline: "1px solid #333",
        outlineOffset: "5px"
    }

    componentDidMount() {
        loadGame();
    }
    render() {
        return(
            <div>
                <div className="container game">
                    <div className="row">
                        <div className="col">
                            <canvas id="nort" width="750" height="750" style={this.nortStyle}></canvas>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;