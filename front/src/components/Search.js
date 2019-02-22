import React, { Component } from 'react';

import CategoriesSelect from './CategoriesSelect';
import DepartmentsSelect from './DepartmentsSelect';

class Search extends Component {
  state = { keyword: '' };

  _handleDepartmentsOnSelect = _departmentId => {
    const departmentId = _departmentId;
    this.setState({ departmentId });
    const { categoryId, keyword } = this.state;
    this.props.onChange({ departmentId, categoryId, keyword });
  }

  _handleCategoriesOnSelect = _categoryId => {
    const categoryId = _categoryId;
    const { departmentId, keyword } = this.state;
    this.setState({ categoryId: parseInt(categoryId) });
    this.props.onChange({ departmentId, categoryId, keyword });
  }

  _handleKeywordOnChange = e => {
    const keyword = e.target.value;
    const { departmentId, categoryId } = this.state;
    this.setState({ keyword });
    this.props.onChange({ departmentId, categoryId, keyword });
  }

  render() {
    const { departmentId, keyword } = this.state;

    return (
      <div className="field">
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select is-fullwidth">
                <DepartmentsSelect onSelect={ this._handleDepartmentsOnSelect } />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <div className="select is-fullwidth">
                <CategoriesSelect departmentId={ departmentId }
                                  onSelect={ this._handleCategoriesOnSelect }/>
              </div>
            </div>
          </div>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input className="input is-fullwidth" type="text"
                     value={ keyword } placeholder="Search products"
              onChange={ this._handleKeywordOnChange }/>
            </div>
            <div className="control">
              <button className="button is-info">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
