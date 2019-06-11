import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Box, Heading, TextField, Text, Button, Modal, Spinner } from 'gestalt';
import ToastMessage from './ToastMessage';
import { Elements, StripeProvider, CardElement, injectStripe } from 'react-stripe-elements';
import { getCart, calculateTotalPrice, calculateAmount, clearCart } from '../utils';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class _CheckoutForm extends Component {
  state = {
    cartItems: [],
    address: '',
    postalCode: '',
    city: '',
    confirmationEmailAddress: '',
    toast: false,
    toastMessage: '',
    modal: false,
    orderProcessing: false,
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

    this.setState({ modal: true });
  }

  isFormValid = ({ address, postalCode, city, confirmationEmailAddress }) => {
    return address && postalCode && city && confirmationEmailAddress;
  }

  showToast = (toastMessage, redirect = false) => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => this.setState({ toast: false, toastMessage: '' },
      () => redirect && this.props.history.push('/')
    ), 5000);
  }

  handleSubmitOrder = async () => {
    const { address, postalCode, city, cartItems } = this.state;
    const amount = calculateAmount(cartItems);
    this.setState({ orderProcessing: true });
    // Process order
    try {
      const response = await this.props.stripe.createToken();
      console.log(response);
      const token = response.token.id;
      await strapi.createEntry("orders", {
        token,
        address,
        postalCode,
        city,
        brews: cartItems,
        amount
      });
      this.setState({ modal: false, orderProcessing: false });
      clearCart();
      this.showToast("Your order has been successfully submitted!", true);
    } catch(err) {
      this.setState({ modal: false, orderProcessing: false });
      this.showToast(err.message);
    }
  } 

  closeModal = () => this.setState({ modal: false });

  render() {
    const { toast, toastMessage, cartItems, modal, orderProcessing } = this.state;
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
              <TextField id="postalCode" name="postalCode" type="text" placeholder="Postal Code" onChange={this.handleChange}/>
              {/* City Input */}
              <TextField id="city" name="city" type="text" placeholder="City" onChange={this.handleChange}/>
              {/* Password Input */}
              <TextField id="confirmationEmailAddress" name="confirmationEmailAddress" type="email" placeholder="Confirmation Email Address" onChange={this.handleChange}/>
              {/* Credit Card Element */}
              <CardElement id="stripe_input" onReady={input => input.focus()}/>
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
        {/* Confirmation Modal */}
        {modal &&
        <ConfirmationModal handleSubmitOrder={this.handleSubmitOrder} closeModal={this.closeModal} 
          cartItems={cartItems} orderProcessing={orderProcessing}
        />}

        <ToastMessage show={toast} message={toastMessage}/>
      </Container>
    )
  }
}

const ConfirmationModal = ({ handleSubmitOrder, closeModal, cartItems, orderProcessing}) => (
  <Modal
    accessibilityCloseLabel="Close"
    accessibilityModalLabel="Confirm Your Order"
    heading="Confirm Your Order"
    onDismiss={closeModal}
    role="alertdialog"
    size="sm"
    footer={
      <Box display="flex" marginLeft={-1} marginRight={-1} justifyContent="center">
        <Box padding={1}>
          <Button 
            color="red"
            onClick={handleSubmitOrder}
            disabled={orderProcessing}
            text="Submit"
            size="lg"
          />
        </Box>
        <Box padding={1}>
          <Button
            onClick={closeModal}
            disabled={orderProcessing}
            text="Cancel"
            size="lg"
          />
        </Box>
      </Box>
    }
  >
    {/* Order Summary */}
    {!orderProcessing &&
    <Box display="flex" direction="column" justifyContent="center" alignItems="center" color="lightWash" padding={2}>
      {cartItems.map(item => (
        <Box key={item._id} padding={1}>
          <Text size="lg" color="red">
            {item.name} x {item.quantity} - {item.quantity * item.price}
          </Text>
        </Box>
      ))}
      <Box paddingY={2}>
        <Text size="lg" bold>
          Total Price: {calculateTotalPrice(cartItems)}
        </Text>
      </Box>
    </Box>}

    {/* Order Proccesing Spinner */}
    <Spinner show={orderProcessing} accessibilityLabel="Order Proccesing Spinner"/>
    {orderProcessing && <Text align="center">Submitting Order...</Text>}
  </Modal>
);

const CheckoutForm = withRouter(injectStripe(_CheckoutForm));

const Checkout = () => (
  <StripeProvider apiKey="pk_test_4ejNg5YPuzxx0QI3oBf9Y8Do00bW8SxMKx">
    <Elements>
      <CheckoutForm />
    </Elements>
  </StripeProvider>
);

export default Checkout;