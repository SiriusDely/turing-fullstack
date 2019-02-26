# Turing Fullstack

https://turing-fullstack.herokuapp.com

Admin dashboard can be accessed on https://turing-fullstack.herokuapp.com/admin.

The project's structure is loosely based on [a Heroku blog post](https://blog.heroku.com/a-rock-solid-modern-web-stack).

- Platform: [Node.js](https://nodejs.org) with [Yarn](https://yarnpkg.com) dependency manager
- Backend Framework: [Adonis](https://adonisjs.com)
  - API: [GraphQL](https://graphql.github.io) with [Apollo](https://www.apollographql.com/docs/react)
  - Process Manager: [PM2](https://pm2.io)
- Frontend Framework: [React](https://reactjs.org) with [CRA](https://facebook.github.io/create-react-app)
  - CSS Framework: [Bulma](https://bulma.io)
  - [React Router](https://reacttraining.com/react-router/web)
- Database: [PostgreSQL](https://postgresql.org)
- Hosted on: [Heroku](https://heroku.com)

Todos left:
- Email registration confirmation
- Test driven development
- Separate Login (Authentication & Authorization Models) for Customers vs. Users (Admin)
- [Facebook Login](https://developers.facebook.com/docs/facebook-login/web)
- Updating product images, hosting using [Cloudinary](https://elements.heroku.com/addons/cloudinary) or [AWS S3](https://aws.amazon.com/s3)
- Shopping cart
- Checkout process, including payment gateway integration
- Email order confirmation
- Query and response caching with Redis
- Full-text search with Elasticsearch

### Running steps

The whole app (backend & frontend) can be run by using combinations of [Adonis CLI](https://adonisjs.com/docs/4.1/installation#_installing_adonisjs) and/or [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) and/or [PM2](https://pm2.io/runtime).
<br>The app can be run quickly locally with few steps:

1. `git clone --depth=1 git@github.com:siriusdely/turing-fullstack.git`: shallow clone the repo with only single commit. Or  download [zip](https://github.com/siriusdely/turing-fullstack/archive/master.zip) and unzip.
2. `cd turing-fullstack`: enter project directory.
3. `cp .env.example .env`: copy environment variables file using the template.
4. `npm install`: install package dependencies.
5. `node ace migration:run && node ace seed`: setup database using migration & seed.
6. `node server.js`: run the server app.
7. Open a browser and go to: http://localhost:3333/admin.
8. `cd front`: Open another terminal and enter the frontend app directory.
9. `npm install`: install package dependencies for the frontend app.
10. `npm start`: run the client app.
10. Open a browser and go to: http://localhost:3000.
