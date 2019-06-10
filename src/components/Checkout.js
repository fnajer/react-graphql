import React, { Component } from 'react';
import { Container, Box, Heading, TextField } from 'gestalt';
import ToastMessage from './ToastMessage';

class Checkout extends Component {
  state = {
    address: '',
    postalCode: '',
    city: '',
    confirmationEmailAddress: '',
    toast: false,
    toastMessage: '',
  }

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  }

  handleConfirmOrder = async event => {
    event.preventDefault();

    if (!this.isFormValid(this.state)) {
      this.showToast("Fill in all fields");
      return;
    }  
  }

  isFormValid = ({ address, postalCode, city, confirmationEmailAddress }) => {
    return address && postalCode && city && confirmationEmailAddress;
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
          color="darkWash"
          margin={4}
          padding={4}
          display="flex"
          justifyContent="center"
          shape="rounded"
        >
          {/* Checkout Form */}
          <form style={{
            display: "inline-block",
            textAlign: "center",
            maxWidth: 450
          }}
            onSubmit={this.handleConfirmOrder}
          >
            {/* Checkout Form Heading */}
            <Heading color="midnight">Lets Get Started</Heading>

            {/* Shipping Address Input */}
            <TextField id="address" name="address" type="text" placeholder="Shipping Address" onChange={this.handleChange}/>
            {/* Postal Code Input */}
            <TextField id="postalCode" name="postalCode" type="number" placeholder="Postal Code" onChange={this.handleChange}/>
            {/* City Input */}
            <TextField id="city" name="city" type="text" placeholder="City" onChange={this.handleChange}/>
            {/* Password Input */}
            <TextField id="confirmationEmailAddress" name="confirmationEmailAddress" type="email" placeholder="Confirmation Email Address" onChange={this.handleChange}/>
            <button id="stripe__button" type="submit">Submit</button>
          </form>
        </Box>
        <ToastMessage show={toast} message={toastMessage}/>
      </Container>
    )
  }
}

export default Checkout;