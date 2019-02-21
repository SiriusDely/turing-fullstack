import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-mobile">
            <div className="column is-three-fifths is-offset-one-fifth">
              <h1 className="title has-text-centered">
                Turing Login
              </h1>
              <form action="" method="POST">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input name="email" className="input" type="email" placeholder="Email" required />
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
                    <input name="password" className="input" type="password" placeholder="Password" required />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <button className="button is-success is-fullwidth" type="submit">
                      Login
                    </button>
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
