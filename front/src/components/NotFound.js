import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = _ => (
  <div>
    <h1>404: Not Found</h1>
    <Link to='/'>Back to Home</Link>
  </div>
);

export default NotFound;
