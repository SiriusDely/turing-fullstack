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
