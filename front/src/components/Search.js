import React, { Component } from 'react';

import CategoriesSelect from './CategoriesSelect';
import DepartmentsSelect from './DepartmentsSelect';

class Search extends Component {

  constructor(props) {
    super(props);
    const { keyword } = props;
    this.state = { keyword: keyword ? keyword : '' };
  }

  _handleKeywordOnChange = e => {
    const keyword = e.target.value;
    const { departmentId, categoryId } = this.props;
    this.setState({ keyword });
    this.props.onChange({ departmentId, categoryId, keyword });
  }

  render() {
    const { departmentId, categoryId } = this.props;
    const { keyword } = this.state;

    return (
      <div className="field">
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select is-fullwidth">
                <DepartmentsSelect departmentId={ departmentId } />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <div className="select is-fullwidth">
                <CategoriesSelect departmentId={ departmentId }
                                  categoryId={ categoryId } />
              </div>
            </div>
          </div>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input className="input is-fullwidth" type="text"
                     value={ keyword } placeholder="Search Products"
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
