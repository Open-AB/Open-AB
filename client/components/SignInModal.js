import React from 'react';
import { browserHistory } from 'react-router';

class SignInModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signin: false,
      email: '',
      password: '',
      confirm_password: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleError = this.handleError.bind(this);

    this.signIn = this.signIn.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.modalCreateAccount = this.modalCreateAccount.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirmPasswordChange(e) {
    if (e.target.value !== this.state.password) {
      document.getElementById('confirm_password').setCustomValidity('Passwords do not match');
    } else {
      document.getElementById('confirm_password').setCustomValidity('');
    }
    this.setState({ confirm_password: e.target.value });
  }

  handleError(err) {
    console.log(err, ':Provided Username and Password do not match');
  }

  clearForm() {
    this.refs.email.value = '';
    this.refs.password.value = '';
    if (!this.state.signin) {
      this.refs.confirm_password.value = '';
    }
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
        $('#modal-signin').closeModal();
        browserHistory.push('/dashboard');
      }
    });
  }

  createAccount(e) {
    e.preventDefault();
    if (this.state.password !== this.refs.confirm_password.value) {
      document.getElementById('confirm_password').setCustomValidity('Passwords do not match');
    } else {
      document.getElementById('confirm_password').setCustomValidity('');

      const body = {
        email: this.refs.email.value.trim(),
        password: this.refs.password.value.trim(),
      };

      this.clearForm();

      $.post('/api/signup', body, data => {
        if (data && data.loggedIn) {
          $('#modal-signin').closeModal();
          browserHistory.push('/dashboard');
        }
      }).fail(err => {
        console.log(err, 'fail signup');
        console.log(err.responseJSON.message, '<<<< responseErr FromServer on Sign UP');
      });
    }
  }

  modalCreateAccount(e) {
    e.preventDefault();
    this.clearForm();
    const toggle = !this.state.signin;
    this.setState({ signin: toggle });
  }

  render() {
    return (
      <div id="modal-signin" className="modal">
        <div className="modal-content">
        {this.state.signin ? (
          <div>
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
                <button type="submit" className="btn">
                  Sign In
                </button>
              </div>
            </form>
            <div><span>New to Open AB? <a href="" onClick={this.modalCreateAccount}>Create Account</a></span></div>
          </div>
        ) : (
          <div>
            <h4>Create Account</h4>
            <form ref="create_account_form" onSubmit={this.createAccount}>
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

              <input
                required
                ref="confirm_password"
                id="confirm_password"
                type="password"
                placeholder="Confirm Password"
                pattern=".{7,}"
                className="validate"
                title="must be more than 6 characters long"
                onChange={this.handleConfirmPasswordChange}
              />
              <label htmlFor="password">Confirm Password</label>
              <div className="modal-footer">
                <button type="submit" className="btn">
                  Create Account
                </button>
              </div>
            </form>
            <div><span>Have an account? <a href="" onClick={this.modalCreateAccount}>Login</a></span></div>
          </div>
        )}
        </div>
      </div>
    );
  }
}

SignInModal.propTypes = {
};

export default SignInModal;

