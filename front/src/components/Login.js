import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { AUTH_TOKEN } from '../constants';

const LoginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

class Login extends Component {
  state = {
    login: true, // switch between Login and Register
    email: '',
    password: '',
    name: '',
  }

  _confirm = async (data) => {
    console.log('Login._confirm.data:', data);
    const token = data.login;
    this._saveUserData(token);
    this.props.history.push('/');
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  render() {
    const { login, email, password, name } = this.state;

    return (
      <section className="section">
        <div className="container">
          <div className="columns is-mobile">
            <div className="column is-three-fifths is-offset-one-fifth">
              <h1 className="title has-text-centered">
                { login ? 'Turing Login' : 'Register Turing' }
              </h1>
              <form action="" method="POST">
                {!login && (
                   <div className="field">
                     <p className="control has-icons-left has-icons-right">
                       <input type="text" value={ name } placeholder="Name"
                              onChange={
                                e => this.setState({ name: e.target.value })
                              } className="input" required />
                     </p>
                   </div>
                )}
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input type="email" value={ email } placeholder="Email"
                           onChange={
                             e => this.setState({ email: e.target.value })
                           } className="input" required />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input type="password" value={ password } placeholder="Password"
                           onChange={
                             e => this.setState({ password: e.target.value })
                           } className="input" required />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <Mutation mutation={ LoginMutation }
                              variables={{ email, password }}
                              onCompleted={ data => this._confirm(data) }>
                      { mutation => (
                        <a onClick={ mutation } className="button is-success is-fullwidth">
                          { login ? 'Login' : 'Register' }
                        </a>
                      ) }
                    </Mutation>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <a className="button is-fullwidth"
                            onClick={ () => this.setState({ login: !login }) }>
                      { login ? 'Create account?' : 'Already have account?' }
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
