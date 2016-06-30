import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import '../scss/_nav.scss';

class NavBar extends Component {

  render() {
    return (
      <div className='navBar'>
         <div className="jumbotron">
           <h1><i className="fa fa-bolt" aria-hidden="true"></i></h1> 

           <p>Bootstrap is the most popular HTML, CSS, and JS framework for developing
           responsive, mobile-first projects on the web.</p> 
         </div>
         <p>This is some text.</p> 
         <p>This is another text.</p> 
       </div>
    );
  }
}

export default NavBar;
