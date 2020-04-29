import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer 
        className='page-footer'
        style={{
          backgroundColor: 'white',
          fontFamily:'monospace',
          bottom: 0,
          left: 0,
          height: '4.5rem',
          width: '100%',
          zIndex: '-9999'
        }}
      >
        <section className='container'>
          <Link to='/' className='black-text'>
            <h6 className='center'>{new Date().getFullYear()} | auctioneer &copy;</h6>
          </Link>
        </section>
      </footer>
    );
  }
}

export default Footer;