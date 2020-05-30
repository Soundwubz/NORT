import React from 'react';
import {Input, FormBtn} from '../Form';
import { Redirect } from 'react-router-dom';
import './style.css';

class Signup extends React.Component {
    state = {
        username: "",
        password: "",
        navigate: false
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if(this.state.username && this.state.password) {
            fetch("/api/user/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            }).then(res => res.json())
                .then(json => {
                    console.log('json', json);
                    if(json.success) {
                        this.setState({
                            username: "",
                            password: "",
                            navigate: true    
                        });
                    } else {
                        console.log(json.message);
                        console.error(json.err)
                    }
                })
        }
    }

    render() {
        if(this.state.navigate === true) {
            return(
                <Redirect to={'/login'}/>
            )
        } 
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Sign Up</h1>
                        <p>or <a href="/login">Login</a></p>
                        <form>
                            <Input
                                value={this.state.username}
                                name="username"
                                placeholder="Username"
                                onChange={this.handleInputChange}
                            />
                            <Input
                                value={this.state.password}
                                name="password"
                                placeholder="Password"
                                type="password"
                                onChange={this.handleInputChange}
                            />
                            <FormBtn
                                disabled={!(this.state.username && this.state.password)}
                                onClick={this.handleFormSubmit}
                            >
                                Submit
                            </FormBtn>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;