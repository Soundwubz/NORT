import React from 'react';
import {Input, FormBtn} from '../Form';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Signup extends React.Component {
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
            axios.post(this.state.localApiUrl, {
                username: this.state.username,
                password: this.state.password
            }).then(response => {
                console.log(response);
                if(response.data) {
                    console.log('sign up success');
                    this.setState({navigate: true});
                } else {
                    console.log('signup error');
                }
            }).catch(err => {
                console.log('server error');
                console.error(err);
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