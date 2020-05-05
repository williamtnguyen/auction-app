// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import scriptLoader from 'react-async-script-loader';


// // Component wrapper for Paypal checkout button
// class FailedButtonLol extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // Paypal script is lazy-loaded, so we know that it's fully loaded with this boolean
//       showButton: false,
//     };
//     // Binding to the window object for Paypal React Component to be put into DOM
//     window.React = React;
//     window.ReactDOM = ReactDOM;
//   }

//   componentDidMount() {
//     // scriptLoader gives these items as props
//     const { isScriptLoaded, isScriptLoadSucceed } = this.props;
//     if(isScriptLoaded && isScriptLoadSucceed) {
//       this.setState({ showButton: true });
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     const { isScriptLoaded, isScriptLoadSucceed } = nextProps;
//     // If it wasn't loaded before but is now
//     const isLoadedNow =
//       !this.state.showButton &&
//       !this.props.isScriptLoaded &&
//       isScriptLoaded;

//       if(isLoadedNow && isScriptLoadSucceed) {
//         this.setState({ showButton: true });
//       }
//   }

//   render() {
//     const {
//       total,
//       currency,
//       env,
//       commit,
//       client,
//       onSuccess,
//       onError,
//       onCancel
//     } = this.props;

//     const { showButton } = this.state;

//     // Creating a payment
//     const payment = () => 
//       window.paypal.rest.payment.create(env, client, {
//         transactions: [{ amount: { total, currency } }]
//       });

//     // Executing the transaction
//     const onAuthorize = (data, actions) => 
//       actions.payment.execute()
//         .then(() => {
//           const payment = {
//             paid: true,
//             cancelled: false,
//             payerID: data.payerID,
//             paymentID: data.paymentID,
//             paymentToken: data.paymentToken,
//             returnUrl: data.returnUrl
//           };
//           onSuccess(payment);
//         })

//     return(
//       <div>
//         {showButton && <window.Button.react 
//           env={env}
//           client={client}
//           commit={commit}
//           payment={payment}
//           onAuthorize={onAuthorize}
//           onCancel={onCancel}
//           onError={onError}
//         />}
//       </div>
//     )

//   }
// }

// export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(FailedButtonLol);