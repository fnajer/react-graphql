import React, { Component } from 'react';
import { Container, Box, Heading, Text, TextField, Button } from 'gestalt';
import ToastMessage from './ToastMessage';
import { setToken } from '../utils';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class SignUp extends Component {
  state = {
    username: '',
    email: '',
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
    const { username, email, password } = this.state;

    if (!this.isFormValid(this.state)) {
      this.showToast("Fill in all fields");
      return;
    }  
    
    // Sign up user
    try {
      this.setState({ loading: true });
      const response = await strapi.register(username, email, password);
      setToken(response.jwt);
      this.setState({ loading: false });
      this.redirectUser("/");
    } catch(err) {
      this.setState({ loading: false });
      this.showToast(err.message);
    } 
  }

  redirectUser = path => this.props.history.push(path);

  isFormValid = ({ username, email, password}) => {
    return username && email && password;
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
              backgroundColor: "#ebe2da"
            }
          }}
          margin={4}
          padding={4}
          display="flex"
          justifyContent="center"
          shape="rounded"
        >
          {/* Sign Up Form */}
          <form style={{
            display: "inline-block",
            textAlign: "center",
            maxWidth: 450
          }}
            onSubmit={this.handleSubmit}
          >
            {/* Sign Up Form Heading */}
            <Box display="flex" direction="column" alignItems="center" marginBottom={2}>
              <Heading color="midnight">Lets Get Started</Heading>
              <Text italic color="orchid">Sign up to order some brews!</Text>
            </Box>

            {/* Username Input */}
            <TextField id="username" name="username" type="text" placeholder="Username" onChange={this.handleChange}/>
            {/* Email Address Input */}
            <TextField id="email" name="email" type="email" placeholder="Email Address" onChange={this.handleChange}/>
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

export default SignUp;