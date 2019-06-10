import React, { Component } from 'react';
import { Container, Box, Heading, Text, TextField, Button } from 'gestalt';
import ToastMessage from './ToastMessage';

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    toast: false,
    toastMessage: '',
  }

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();

    if (this.isFormValid(this.state))
      console.log('submitted');
    else
      this.showToast("Fill in all fields");
  }

  isFormValid = ({ username, email, password}) => {
    return username && email && password;
  }

  showToast = toastMessage => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => this.setState({ toast: false, toastMessage: '' }), 5000);
  }

  render() {
    const { toast, toastMessage } = this.state;
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
            <Button inline text="Submit" color="blue" type="submit"/>
          </form>
        </Box>
        <ToastMessage show={toast} message={toastMessage}/>
      </Container>
    )
  }
}

export default SignUp;