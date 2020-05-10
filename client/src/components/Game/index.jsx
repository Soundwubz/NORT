import React from 'react';
import { Redirect } from 'react-router-dom';

class Player {
    constructor(x, y, color) {
        this.color = color || '#fff';
        this.dead = false;
        this.direction = '';
        this.key = '';
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;    this.constructor.counter = (this.constructor.counter || 0) + 1;
        this._id = this.constructor.counter;

        Player.allInstances.push(this);
    };
}

class Game extends React.Component {

    nortStyle = {
        border: "1px solid #777",
        outline: "1px solid #333",
        outlineOffset: "5px"
    }

    state = {
        playerCount: 1,
        gameType: this.props.type,
        navigate: false,
        timer: 0
    }

    loadGame = (maxPlayCount, gameType) => {
        const canvas = document.getElementById('nort');
        const context = canvas.getContext('2d');
        const unit = 15;
        console.log(canvas);

        Player.allInstances = [];

        let p1 = new Player(unit * 6, unit * 6, '#75A4FF'); // initialize player 1

        let setKey = (key, player, up, right, down, left) => {
            switch (key) {
                case up:
                  if (player.direction !== 'DOWN') {
                    player.key = 'UP';
                  } 
                  break;
                case right:
                  if (player.direction !== 'LEFT') {
                    player.key = 'RIGHT';
                  } 
                  break;
                case down:
                  if (player.direction !== 'UP') {
                    player.key = 'DOWN';
                  } 
                  break;
                case left:
                  if (player.direction !== 'RIGHT') {
                    player.key = 'LEFT';
                  } 
                  break;
                default:
                  break;
              };
        };

        let handleKeyPress = (event) => {
            let key = event.keyCode;  
            
            if (key === 37 || key === 38 || key === 39 || key === 40) {
                event.preventDefault();
            }; 

            setKey(key, p1, 38, 39, 40, 37); // arrow keys
        };

        document.addEventListener('keydown', handleKeyPress); // add keydown event listener

        let getPlayableCells = (canvas, unit) => {
            let playableCells = new Set();
            for (let i = 0; i < canvas.width / unit; i++) {
                for (let j = 0; j < canvas.height / unit; j++) {
                playableCells.add(`${i * unit}x${j * unit}y`);
                };
            };
            return playableCells; // returns all playable cells
        };

        let playableCells = getPlayableCells(canvas, unit);

        let drawBackground = () => {
            context.strokeStyle = '#001900';
            for (let i = 0; i <= canvas.width / unit + 2; i += 2) {
                for (let j = 0; j <= canvas.height / unit + 2; j += 2) {
                context.strokeRect(0, 0, unit * i, unit * j);
                };
            };  context.strokeStyle = '#000000';
            context.lineWidth = 2;
            for (let i = 1; i <= canvas.width / unit; i += 2) {
                for (let j = 1; j <= canvas.height / unit; j += 2) {
                context.strokeRect(0, 0, unit * i, unit * j);
                };
            };
            context.lineWidth = 1;
        };

        drawBackground();

        let drawStartingPositions = (players) => {
            players.forEach(p => {
              context.fillStyle = p.color;
              context.fillRect(p.x, p.y, unit, unit);
              context.strokeStyle = 'black';
              context.strokeRect(p.x, p.y, unit, unit);
            });
            console.log(playableCells.size);
        };
        
        drawStartingPositions(Player.allInstances);

        let getRandCoord = () => {
            let i = Math.floor(Math.random() * (50 - 1) ) + 1;
            return unit * i;
        }

        let validObstacle = (x, y, players) => {
            let valid;
            players.forEach(p => {
                let px = parseInt(p.x);
                let py = parseInt(p.y);
                if (
                    (x <= px - 10 || x >= px + 10) && 
                    (y <= py - 10 || y >= py + 10)
                ) {
                    valid = true;
                } else {
                    valid = false;
                }
            });
            if(valid) {
                return true;
            } else {
                return false;
            }
        }

        let drawObstacles = (players) => {
            if(maxPlayCount === 1) {
                for(let i = 0; i < 6; i++) {
                    let point = {
                        x: getRandCoord(),
                        y: getRandCoord()
                    }
                    if(validObstacle(point.x, point.y, players)) {
                        context.fillStyle = "grey";
                        context.fillRect(point.x, point.y, unit, unit);
                        context.strokeStyle = 'black';
                        context.strokeRect(point.x, point.y, unit, unit);
                        playableCells.delete(`${point.x}x${point.y}y`);
                    }                    
                }
            }
        }

        drawObstacles(Player.allInstances);

        let playerCount = maxPlayCount;

        let draw = () => {
            if(Player.allInstances.filter(p => !p.key).length === 0) {
                // in-game logic
                Player.allInstances.forEach(p => {
                    let time;
                    if(p.key) {
                        if(this.state.timer === 0 && gameType) {
                            time = setInterval(this.timer, 100);
                        }
                        p.direction = p.key;

                        context.fillStyle = p.color;
                        context.fillRect(p.x, p.y, unit, unit);
                        context.strokeStyle = 'black';
                        context.strokeRect(p.x, p.y, unit, unit);

                        if(!playableCells.has(`${p.x}x${p.y}y`) && p.dead == false) {
                            p.dead = true;
                            p.direction = '';
                            playerCount -= 1;
                        }

                        playableCells.delete(`${p.x}x${p.y}y`);

                        if (!p.dead) {
                            if (p.direction == "LEFT") p.x -= unit;
                            if (p.direction == "UP") p.y -= unit;
                            if (p.direction == "RIGHT") p.x += unit;
                            if (p.direction == "DOWN") p.y += unit;
                        };
                    }

                    let outcome;

                    if (playerCount === maxPlayCount - 1) {
                        if(gameType === "single") { // single player
                            clearInterval(time);
                            outcome = `Game Over`;
                        } else { // multiplayer
                            const alivePlayers = Player.allInstances.filter(p => p.dead === false);
                            outcome = `Player ${alivePlayers[0]._id} wins!`;
                        }
                    } else if (playerCount === 0) {
                        outcome = 'Draw!';
                    }
                    if (outcome) {
                        alert(outcome);
                        clearInterval(game);
                        this.endGame();
                    }
                });
            }
        };

        const game = setInterval(draw, 100);
    }

    timer = () => {
        this.setState({ timer: Math.round((this.state.timer + 0.1) * 10) / 10 });
    }

    endGame = () => {
        this.setState({navigate: true});
    }


    componentDidMount() {
        this.loadGame(this.state.playerCount, this.state.gameType);
    }

    render() {
        if(this.state.navigate === true) {
            return(
                <Redirect to={'/game'}/>
            )
        }
        return(
            <div>
                <div className="container game">
                    <div className="row">
                        <div className="col-2">
                            <p className="text-white">Time: {this.state.timer}</p>
                        </div>
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
