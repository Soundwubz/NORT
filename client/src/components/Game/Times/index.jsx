import React from 'react';
import './style.css';
import TimeList from './TimeList';

class Times extends React.Component {
    state = {
        timesList: []
    }

    componentDidMount() {
        fetch('/api/game/time').then(res => res.json()).then(json => {
            let diffTimes = json.filter(time => time.difficulty === this.props.difficulty);
            diffTimes.sort((x, y) => {
                return y.time - x.time;
            });
            this.setState({
                timesList: diffTimes
            });
        })
    }

    render() {
        return(
            <div id="topTimes">
                <h1>Top Times</h1>
                <TimeList>
                    {this.state.timesList.map(time => {
                        return (
                            <li key={time._id}>{time.time}</li>
                        )
                    })}
                </TimeList>
            </div>
        )
    }
}

export default Times;