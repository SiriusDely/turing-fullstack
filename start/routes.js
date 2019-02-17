'use strict';

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

Route.get('/api', () => {
  return { greeting: 'Hello world in JSON' };
});

Route.get('/admin/login', 'SessionController.create')
  .namespace('Admin')
  .middleware('guest')
  .as('admin.login');

Route.post('/admin/sessions/store', 'SessionController.store')
  .namespace('Admin')
  .middleware('guest')
  .as('admin.sessions.store');

Route.group(() => {
  Route.resource('departments', 'DepartmentController')
    .only(['index', 'create', 'store', 'edit', 'update', 'destroy'])
    .validator(new Map([
      [['departments.store'], ['Department']],
      [['departments.update'], ['Department']]
    ]));

  Route.resource('departments.categories', 'CategoryController')
    .only(['index']);

  Route.resource('categories', 'CategoryController')
    .only(['index', 'create', 'store', 'edit', 'update', 'destroy'])
    .validator(new Map([
      [['categories.store'], ['Category']],
      [['categories.update'], ['Category']]
    ]));

  Route.resource('attributes', 'AttributeController')
    .only(['index', 'create', 'store', 'edit', 'update', 'destroy'])
    .validator(new Map([
      [['attributes.store'], ['Attribute']],
      [['attributes.update'], ['Attribute']]
    ]));

  Route.resource('attributes.values', 'AttributeValueController')
    .only(['index']);

  Route.resource('attribute-values', 'AttributeValueController')
    .only(['index', 'create', 'store', 'edit', 'update', 'destroy']);

  Route.resource('products', 'ProductController')
    .only(['index', 'create', 'store', 'edit', 'update', 'destroy'])
    .validator(new Map([
      [['products.store'], ['Product']],
      [['products.update'], ['Product']]
    ]));
})
  .prefix('admin')
  .namespace('Admin');

Route.route('/graphql', ({ request, auth, response }) => {
  return ApolloServer.graphql({ schema, context: { auth } }, request, response);
}, ['GET', 'POST']);

Route.get('/graphiql', ({ request, response }) => {
  return ApolloServer.graphiql({ endpointURL: '/graphql' }, request, response);
});
