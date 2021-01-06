import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) =>{
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51I6PmQIsZbNUxuUL4tkKFg9C4BIryUcAHKuH7liQFFiCdLtc3MngHwJrnKq6ajgU7sRmnc3tolhOaJ3fE8cYDLVC00MJ71zBnb';

  const onToken = token =>{
    axios({
      url:'payment',
      method:'post',
      data:{
        amount: priceForStripe,
        token
      }
    }).then(response=>{
        alert('Payment successful')
      }).catch(error=>{
        alert('Payment error')
    })
  }
  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd'
      billingAddress
      shippingAddres
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is ${price}`}
      amount ={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
     />
  )
}

export default StripeCheckoutButton;
