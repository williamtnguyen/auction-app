import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// Sandbox ID so don't have to hide
const CLIENT_ID = 'AVQobw9abf7AYLTiDAkbzoy1bXbNqi-kb0X10eHAiv5aN39ykOy0eKnz88PJFu8hcBAbkfa6w-n_VWhJ'

function PaypalButton(props) {
  // const [paidFor, setPaidFor] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  // Reference to DOM element to mount paypal button
  let paypalRef = useRef();

  // Runs after every render: Load Paypal script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`;
    script.addEventListener('load', () => setLoaded(true));
    document.body.appendChild(script);

    if(isLoaded) {
      setTimeout(() => {
        window.paypal
          .Buttons({
            // SETUP THE TRANSACTION
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    currency_code: 'USD',
                    value: props.amount
                  }
                }]
              })
            },
            // FINALIZE THE TRANSACTION
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();

              // Make API call to express server
              const reqBody = { buyerID: props.buyerID, myCartIDs: props.myCartIDs };
              axios
                .post('/api/auctions/purchased-cart', reqBody)
                .then(res => console.log(res))
                .catch(err => {});

              // Show a success message to the buyer
              alert(`Transaction completed by ${order.payer.name.given_name}!`);
              window.location.reload();
            },
            style: {
              shape:  'pill',
              label:  'pay',
              height: 40
            }
          })
          .render(paypalRef.current);
      });
    }
  });

  return (
    <div style={{ paddingTop: '5rem' }}>
      <div ref={paypalRef} />
    </div>
  );
}

export default PaypalButton;