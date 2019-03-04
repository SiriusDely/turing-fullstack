import React, { Component } from 'react'
import { Mutation } from 'react-apollo';

import { AUTH_TOKEN, EMAIL_REGEX } from '../constants';
import { LoginMutation, RegisterMutation } from '../managers/GraphManager';

class Login extends Component {
  state = {
    email: '',
    emailValid: false,
    error: '',
    formValid: false,
    login: true, // switch between Login and Register
    name: '',
    nameValid: false,
    password: '',
    passwordValid: false
  }


  _handleInputsChange = e => {
    const { name, value } = e.target;
    let { emailValid, login, nameValid,
          passwordValid } = this.state;
    switch (name) {
      case 'name':
        nameValid = value.trim().length > 2;
        break;
      case 'email':
        emailValid = EMAIL_REGEX.test(value);
        break;
      case 'password':
        passwordValid = value.trim().length > 6;
        break;
      default:
        break;
    }
    const formValid = emailValid && passwordValid && (login || (!login && nameValid));
    this.setState({
      [name]: value, emailValid, formValid, nameValid, passwordValid, error: ''
    });
  }

  _handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
  }

  _handleMutationError = err => {
    const { login } = this.state;
    let error;
    if (login) { error = 'The password was incorrect or the email is not yet registered.'; }
    else { error = 'There was an error while processing the request.'; }
    this.setState({ error });
  }

  _handleMutationCompleted = async (data) => {
    const token = data.login;
    this._saveUserData(token);
    this.props.history.push('/');
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  render() {
    const { email, emailValid, error, formValid,
            login, name, nameValid, password, passwordValid } = this.state;

    const loginInput = (
      <div className="field">
        <p className="control has-icons-left">
          <input type="text" value={ name } placeholder="Name"
                 name='name' onChange={ this._handleInputsChange }
                 className={ `input ${name.trim().length <= 0 ? '' : nameValid ? 'is-success' : 'is-danger'}` }
                 ref={ ref => this.nameInput = ref } />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </p>
      </div>
    );

    return (
      <section className="section">
        <div className="container">
          <div className="columns is-mobile">
            <div className="column is-three-fifths is-offset-one-fifth">
              <h1 className="title has-text-centered">
                { login ? 'Turing Login' : 'Register Turing' }
              </h1>
              { error && error.trim().length ? (
                  <article className="message is-danger">
                    <div className="message-body">
                      { error }
                    </div>
                  </article>
              ) : null }
              <Mutation mutation={ login ? LoginMutation : RegisterMutation }
                        // variables={ { name, email, password } }
                        onError={ err => this._handleMutationError(err) }
                        onCompleted={ data => this._handleMutationCompleted(data) }>
                { mutation => (
                  <form onSubmit={ e => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!formValid) { return; }
                      mutation({ variables: { name, email, password } });
                  } }>
                    { !login && loginInput }
                    <div className="field">
                      <p className="control has-icons-left">
                        <input type="email" value={ email } placeholder="Email"
                               name='email' onChange={ e => this._handleInputsChange(e) }
                               className={ `input ${email.trim().length <= 0 ? '' : emailValid ? 'is-success' : 'is-danger'}` }
                               ref={ ref => this.emailInput = ref } />
                        <span className="icon is-small is-left">
                          <i className="fas fa-envelope"></i>
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control has-icons-left">
                        <input type="password" value={ password } placeholder="Password"
                               name='password' onChange={ this._handleInputsChange }
                               className={
                                 `input ${password.trim().length <= 0 ? '' : passwordValid ? 'is-success' : 'is-danger'}`
                               } />
                        <span className="icon is-small is-left">
                          <i className="fas fa-lock"></i>
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control">
                        <button className='button is-success is-fullwidth'
                                type='submit' disabled={ !formValid }>
                          { login ? 'Login' : 'Register' }
                        </button>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control">
                      </p>
                    </div>
                  </form>
                ) }
              </Mutation>
              <button className="button is-fullwidth"
                      onClick={ e => {
                          e.preventDefault();
                          e.stopPropagation();
                          this.setState({ login: !login });
                          if (!login) { this.emailInput.focus(); }
                          else { this.emailInput.focus(); }
                      } }>
                { login ? 'Create account?' : 'Already have account?' }
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
