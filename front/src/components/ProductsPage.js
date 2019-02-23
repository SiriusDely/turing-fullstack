import React from 'react';
import queryString from 'query-string';

import ProductsContainer from './ProductsContainer';
import Search from './Search';

class ProductsPage extends React.Component {

  constructor(props) {
    super(props);
    const { departmentId, categoryId, keyword, page } = props;
    this.state = { departmentId, categoryId, keyword, page };
  }

  _handleSearchOnChange = ({ departmentId, categoryId, keyword }) => {
    this.setState({ departmentId, categoryId, keyword, page: 1 });
  }

  render() {
    const { match } = this.props;
    const { keyword: keyword1, page: page1 } = this.state;
    const { departmentId, categoryId } = match ? match.params : null;
    const params = queryString.parse(window.location.search);
    const { page: page2, keyword: keyword2 } = params ? params : null;
    const keyword = keyword1 && keyword1.trim().length > 0 ?
                    keyword1 : keyword2 && keyword2.trim().length > 0 ? keyword2 : '';
    const page = page1 < page2 ? page1 : page2;

    return (
      <div className='container'>
        <br />
        <Search departmentId={ departmentId } categoryId={ categoryId }
                onChange={ this._handleSearchOnChange } keyword={ keyword } />
        <ProductsContainer keyword={ keyword } departmentId={ departmentId }
                           categoryId={ categoryId } page={ parseInt(page) } />
      </div>
    );
  }
}

export default ProductsPage;
