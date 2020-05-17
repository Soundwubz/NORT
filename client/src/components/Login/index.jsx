import React from 'react';
import {Input, FormBtn} from '../Form';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
            axios.post('/api/login', {
                username: this.state.username,
                password: this.state.password
            }).then(response => {
                console.log('login response:');
                console.log(response);
                if (response.status == 200) {
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    this.setState({
                        navigate: true
                    })
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