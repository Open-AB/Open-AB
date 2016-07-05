import React from 'react';
import { browserHistory } from 'react-router';

class SignInModal extends React.Component {
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
    this.createAccount = this.createAccount.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleError(err) {
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
      data: body,
    }).done(data => {
      if (data && data.loggedIn) {
        console.log('is logged in === true');
        $('#modal-signin').closeModal();
        browserHistory.push('dashboard');
      }
    });
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

  render() {
    return (
      <div id="modal-signin" className="modal">
        <div className="modal-content">
          <h4>Sign In</h4>
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
            <div className="modal-footer">
              <button type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignInModal.propTypes = {
};

export default SignInModal;

