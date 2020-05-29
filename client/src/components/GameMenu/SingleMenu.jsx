import React from 'react';
import Menu from '../Menu';
import MenuInput from '../Menu/MenuItem';  

class SingleMenu extends React.Component {

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Game Difficulty</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Menu>
                            <MenuInput path={"/game/s?diff=easy"}><h2>Easy</h2></MenuInput>
                            <MenuInput path={"/game/s?diff=normal"}><h2>Normal</h2></MenuInput>
                            <MenuInput path={"/game/s?diff=hard"}><h2>Hard</h2></MenuInput>
                        </Menu>
                    </div>
                </div>
                <div className="row">
                    <div className="col mt-3">
                        <Menu>
                            <MenuInput path={"/game"}><h3>Back</h3></MenuInput>
                        </Menu>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleMenu;