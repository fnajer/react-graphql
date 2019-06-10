import React, { Component } from 'react';
import { Container, Box, Heading, TextField, Button } from 'gestalt';
import ToastMessage from './ToastMessage';
import { setToken } from '../utils';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    toast: false,
    toastMessage: '',
    loading: false,
  }

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { username, password } = this.state;

    if (!this.isFormValid(this.state)) {
      this.showToast("Fill in all fields");
      return;
    }  
    
    // Sign up user
    try {
      this.setState({ loading: true });
      const response = await strapi.login(username, password);
      setToken(response.jwt);
      this.setState({ loading: false });
      this.redirectUser("/");
    } catch(err) {
      this.setState({ loading: false });
      this.showToast(err.message);
    } 
  }

  redirectUser = path => this.props.history.push(path);

  isFormValid = ({ username, password}) => {
    return username && password;
  }

  showToast = toastMessage => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => this.setState({ toast: false, toastMessage: '' }), 5000);
  }

  render() {
    const { toast, toastMessage, loading } = this.state;
    return (
      <Container>
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "#d6a3b1"
            }
          }}
          margin={4}
          padding={4}
          display="flex"
          justifyContent="center"
          shape="rounded"
        >
          {/* Sign In Form */}
          <form style={{
            display: "inline-block",
            textAlign: "center",
            maxWidth: 450
          }}
            onSubmit={this.handleSubmit}
          >
            {/* Sign In Form Heading */}
            <Box display="flex" direction="column" alignItems="center" marginBottom={2}>
              <Heading color="midnight">Welcome Back</Heading>
            </Box>

            {/* Username Input */}
            <TextField id="username" name="username" type="text" placeholder="Username" onChange={this.handleChange}/>
            {/* Password Input */}
            <TextField id="password" name="password" type="password" placeholder="Password" onChange={this.handleChange}/>
            <Button inline disabled={loading} text="Submit" color="blue" type="submit"/>
          </form>
        </Box>
        <ToastMessage show={toast} message={toastMessage}/>
      </Container>
    )
  }
}

export default SignIn;