'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const ApolloServer = use('ApolloServer');
const schema = require('../app/schema');

Route.on('/').render('welcome');

Route.get('/admin/login', 'SessionController.create')
  .namespace('Admin')
  .middleware('guest')
  .as('admin.login');

Route.post('/admin/sessions/store', 'SessionController.store')
  .namespace('Admin')
  .middleware('guest')
  .as('admin.sessions.store');

Route.group(() => {
  // Binds '/users' to 'App/Controllers/Http/Admin/UserController'
  // Route.resource('/users', 'UserController')
  Route.resource('departments', 'DepartmentController')
    .validator(new Map([
      [['departments.store'], ['StoreDepartment']],
      [['departments.update'], ['StoreDepartment']]
    ]));
})
  .prefix('admin')
  .namespace('Admin');
// }).namespace('Admin').middleware(['auth:session']);
/*
Route.get('/', () => {
  return { greeting: 'Hello world in JSON' };
});
*/
Route.route('/graphql', ({ request, auth, response }) => {
  return ApolloServer.graphql({ schema, context: { auth } }, request, response);
}, ['GET', 'POST']);

Route.get('/graphiql', ({ request, response }) => {
  return ApolloServer.graphiql({ endpointURL: '/graphql' }, request, response);
});
