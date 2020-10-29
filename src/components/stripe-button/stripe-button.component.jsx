import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;

    const publishableKey = 'pk_test_51HhPMeE8jBzhcLK2OBBPO2Fbt3yWFWjxzPSWN6NoxexpqhtktjQGGI9qOP23f4xwRSAuqy0SazpACTx7uR070na600de1CD89J';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            shippingAddress
            billingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;