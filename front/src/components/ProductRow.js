import React from 'react';

class ProductRow extends React.Component {
  render() {
    const { name } = this.props.product;
    return (
      <div className='pa3 bg-black-05 ma3'>
        <div className='pt3'>
          { name }
        </div>
      </div>
    );
  }
}

export default ProductRow;
