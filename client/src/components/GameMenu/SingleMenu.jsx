import React from 'react';
import Menu from '../Menu';
import MenuInput from '../Menu/MenuItem';  

class SingleMenu extends React.Component {

    render() {
        return(
            <Menu>
                <MenuInput active={true} path={"/game/s?diff=easy"}>Easy</MenuInput>
                <MenuInput active={true} path={"/game/s?diff=normal"}>Normal</MenuInput>
                <MenuInput active={true} path={"/game/s?diff=hard"}>Hard</MenuInput>
            </Menu>
        )
    }
}

export default SingleMenu;