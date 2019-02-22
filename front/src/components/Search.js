import React, { Component } from 'react';

import CategoriesSelect from './CategoriesSelect';
import DepartmentsSelect from './DepartmentsSelect';

class Search extends Component {
  state = { departmentId: 0 };

  _handleDepartmentsOnSelect = departmentId => {
    this.setState({ departmentId: parseInt(departmentId) });
  }

  render() {
    const { departmentId } = this.state;

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
                <CategoriesSelect departmentId={ departmentId } />
              </div>
            </div>
          </div>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input className="input is-fullwidth" type="text" placeholder="Search products" />
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
