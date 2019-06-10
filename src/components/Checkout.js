import React, { Component } from 'react';
import { Container, Box, Heading, TextField, Text } from 'gestalt';
import ToastMessage from './ToastMessage';
import { getCart, calculateTotalPrice } from '../utils';

class Checkout extends Component {
  state = {
    cartItems: [],
    address: '',
    postalCode: '',
    city: '',
    confirmationEmailAddress: '',
    toast: false,
    toastMessage: '',
  }

  componentDidMount() {
    this.setState({ cartItems: getCart() });
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
    const { toast, toastMessage, cartItems } = this.state;
    return (
      <Container>
        <Box
          color="darkWash"
          margin={4}
          padding={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          direction="column"
          shape="rounded"
        >
          {/* Checkout Form Heading */}
          <Heading color="midnight">Checkout</Heading>
          {cartItems.length > 0 ? 
          <React.Fragment>
            {/* User Cart */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              direction="column"
              marginTop={2}
              marginBottom={6}
            >
              <Text color="darkGray" italic>
                {cartItems.length} Items for Checkout
              </Text>
              {cartItems.map(item => (
                <Box key={item._id} padding={1}>
                  <Text color="midnight">
                    {item.name} x {item.quantity} - ${item.quantity * item.price}
                  </Text>
                </Box>
              ))}
              <Text bold>Total Amount: {calculateTotalPrice(cartItems)}</Text>
            </Box>

            {/* Checkout Form */}
            <form style={{
              display: "inline-block",
              textAlign: "center",
              maxWidth: 450
            }}
              onSubmit={this.handleConfirmOrder}
            >
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
          </React.Fragment> : (
            // Default Text if No Items in Cart
            <Box color="darkWash" shape="rounded" padding={2}>
              <Heading align="center" color="watermelon" size="sm">Your Cart is Empty</Heading>
              <Text align="center" color="green" italic>Add some brews!</Text>
            </Box>
          )}
        </Box>
        <ToastMessage show={toast} message={toastMessage}/>
      </Container>
    )
  }
}

export default Checkout;