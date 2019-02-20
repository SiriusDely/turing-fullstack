import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <section class="section">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column is-three-fifths is-offset-one-fifth">
              <h1 class="title has-text-centered">
                Admin Login
              </h1>
              <form action="" method="POST">
                <div class="field">
                  <p class="control has-icons-left has-icons-right">
                    <input name="email" class="input" type="email" placeholder="Email" required />
                    <span class="icon is-small is-left">
                      <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                      <i class="fas fa-check"></i>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <p class="control has-icons-left">
                    <input name="password" class="input" type="password" placeholder="Password" required />
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <p class="control">
                    <button class="button is-success is-fullwidth" type="submit">
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
