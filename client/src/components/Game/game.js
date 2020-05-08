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

export function loadGame() {
    setTimeout(() => {
        const canvas = document.getElementById('nort');
        const context = canvas.getContext('2d');
        const unit = 15;
        console.log(canvas);

        Player.allInstances = [];

        let p1 = new Player(unit * 6, unit * 6, '#75A4FF');

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

        document.addEventListener('keydown', handleKeyPress);

        let getPlayableCells = (canvas, unit) => {
            let playableCells = new Set();
            for (let i = 0; i < canvas.width / unit; i++) {
                for (let j = 0; j < canvas.height / unit; j++) {
                playableCells.add(`${i * unit}x${j * unit}y`);
                };
            };
            return playableCells;
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
        };
        
        drawStartingPositions(Player.allInstances);

        let draw = () => {
            if(Player.allInstances.filter(p => !p.key).length === 0) {
                // in-game logic
                Player.allInstances.forEach(p => {
                    if(p.key) {
                        p.direction = p.key;

                        context.fillStyle = p.color;
                        context.fillRect(p.x, p.y, unit, unit);
                        context.strokeStyle = 'black';
                        context.strokeRect(p.x, p.y, unit, unit);

                        if(!playableCells.has(`${p.x}x${p.y}y`) && p.dead == false) {
                            p.dead = true;
                            p.direction = '';
                            // playerCount -= 1;
                        }

                        playableCells.delete(`${p.x}x${p.y}y`);

                        if (!p.dead) {
                            if (p.direction == "LEFT") p.x -= unit;
                            if (p.direction == "UP") p.y -= unit;
                            if (p.direction == "RIGHT") p.x += unit;
                            if (p.direction == "DOWN") p.y += unit;
                        };

                    }
                });
            }
        };

        const game = setInterval(draw, 100);

    }, 500);
}
