'use strict'

const { validateAll } = use('Validator');

class SessionController {

  async index({ request, response, view }) {
    return view.render('admin.sessions.index');
  }

  async create({ auth, session, request, response }) {
    const rules = {
      email: 'required|email',
      password: 'required'
    };

    const validation = await validateAll(request.all(), rules);

    if (validation.fails()) {
      session.withErrors(validation.messages())
        .flashExcept(['password']);

      return response.redirect('back');
    }

    const { email, password } = request.all();
    await auth.attempt(email, password);

    return response.redirect('/admin');
  }
}

module.exports = SessionController
