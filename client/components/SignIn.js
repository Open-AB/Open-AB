import React from 'react';
// import fetch from 'isomorphic-fetch';
import $ from 'jquery';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleError = this.handleError.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);

    this.checkAuth = this.checkAuth.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.getClientTests = this.getClientTests.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleError(err) {
    // TODO: don't use global
    console.log(err, ':Provided Username and Password do not match');
  }

  clearForm() {
    this.refs.email.value = '';
    this.refs.password.value = '';
  }

  signIn(e) {
    e.preventDefault();

    const body = {
      email: this.refs.email.value.trim(),
      password: this.refs.password.value.trim(),
    };

    this.clearForm();

    $.ajax({
      url: '/api/signin',
      type: 'POST',
      xhrFields: {
        withCredentials: true,
      },
      data: body,
    }).done(data => {
      console.log(data, '^*&(^*%*^*%$^%*^^%& data from jquery POST to signing endpoint');
    });

    // $.post('/api/signin', body, data => {
    //   console.log(data, '&*&(*^&*(^(*&^ data from jquery POST to signin endpoint');
    // });
  }

  createAccount(e) {
    e.preventDefault();

    const body = {
      email: this.refs.email.value.trim(),
      password: this.refs.password.value.trim(),
    };

    this.clearForm();

    $.post('/api/signup', body, data => {
      console.log('SIGNUP', data,  'data from jquery POST to signUP endpoint');
    }).fail(err => {
      console.log(err, 'fail signup');
      console.log(err.responseJSON.message, '<<<< responseErr FromServer on Sign UP');
    });
  }

  signOut(e) {
    e.preventDefault();

    $.post('/api/signout', '', data => {
      console.log(data, '&*&(*^&*(^(*&^ data from jquery POST to signin endpoint');
    });
  }

  checkAuth(e) {
    e.preventDefault();

    $
    .post('/api/checkAuthServer', 'POOP', data => {
      console.log(data, '$$$$$$ data from POST to checkAuthServer');
    }).fail( something => {
      console.log(something, 'in fail of post?!');
      console.log(something.responseJSON.message, '<<<< server response JSON.message');
    });
  }

  getClientTests(e) {
    e.preventDefault();

    $.get('/api/getClientTests')
    .then(data => {
      console.log(data, '$.GET CLIENT TESTS');
    })
    // $.get('/api/getClientTests', data => {
    //   console.log(data, 'YAYAYAYA GOT CLIENT TESTS BACK FROM SERVER');
    // });
  }

  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <form onSubmit={this.signIn}>
          <input
            required
            ref="email"
            id="email"
            type="email"
            placeholder="E-mail"
            onChange={this.handleEmailChange}
          />
          <label htmlFor="email">Email Address</label>

          <input
            required
            ref="password"
            id="password"
            type="password"
            placeholder="Password"
            pattern=".{7,}"
            className="validate"
            title="must be more than 6 characters long"
            onChange={this.handlePasswordChange}
          />
          <label htmlFor="password">Password</label>

          <button type="submit">
            Sign In
          </button>
        </form>
        <button onClick={this.checkAuth}> checkAuth </button>
        <button onClick={this.signOut}> Sign Out </button>
        <button onClick={this.createAccount}> Create Account </button>
        <button onClick={this.getClientTests}> Get Client Tests </button>
      </div>
    );
  }
}

SignIn.propTypes = {
};

export default SignIn;

