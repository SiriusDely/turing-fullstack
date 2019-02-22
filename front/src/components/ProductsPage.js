import React from 'react';

import Search from './Search';
import ProductsList from './ProductsList';

class ProductsPage extends React.Component {
  constructor(props) {
    super(props);
    const { departmentId, categoryId, keyword } = props;
    this.state = { departmentId, categoryId, keyword };
  }

  _handleSearchOnChange = ({ departmentId, categoryId, keyword }) => {
    this.setState({ departmentId, categoryId, keyword });
  }

  render() {
    const { departmentId, categoryId, keyword } = this.state;
    return (
      <div className='container'>
        <br />
        <Search onChange={ this._handleSearchOnChange } />
        <ProductsList keyword={ keyword }
                      departmentId={ departmentId } categoryId={ categoryId } />
      </div>
    );
  }
}

export default (ProductsPage);
