import React from 'react';
import {Input, FormBtn} from '../Form';
import {setInStorage} from '../../utils/storage';
import { Redirect } from 'react-router-dom';
import './style.css';

class Login extends React.Component {
    state = {
        username: "",
        password: "",
        localApiUrl: "http://localhost:3001/api/user",
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
            console.log(this.state.username);
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            }).then(res => res.json()).then(json => {
                console.log('json',json);
                if(json.success) {
                    setInStorage('nort', { token: json.token });
                    this.setState({navigate: true});
                }
            })
        }
    }

    render() {
        if(this.state.navigate === true) {
            return (
                <Redirect to={'/'}/>
            )
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Login</h1>
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

export default Login;