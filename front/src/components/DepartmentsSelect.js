import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';

import { DepartmentsQuery } from '../managers/GraphManager';

class DepartmentsSelect extends React.Component {
  constructor(props) {
    super(props);
    const { departmentId } = props;
    this.state = { departmentId };
  }

  _handleSelectOptionsOnChange = e => {
    const _departmentId = parseInt(e.target.value);
    const departmentId = _departmentId && _departmentId > 0 ? _departmentId : '';
    this.setState = { departmentId };
    const { history } = this.props;
    history.push(`/departments/${departmentId}`);
  }

  componentWillReceiveProps(nextProps) {
    const { departmentId } = nextProps;
    this.setState = { departmentId };
  }

  render() {
    const { departmentId } = this.state;
    return (
      <Query query={ DepartmentsQuery }>
        { ({ data }) => (
          /* eslint-disable-next-line */
          <select defaultValue={ departmentId && !isNaN(departmentId) ? departmentId : 0 } onChange={ this._handleSelectOptionsOnChange }>
            <option value={ 0 }>All Departments</option>
            { data && data.departments && data.departments.map(department => (
              <option key={ department.id } value={ department.id }
                selected={ department.id === departmentId }>
                { department.name }
              </option>
            )) }
          </select>
        )}
      </Query>
    );
  }
}

export default withRouter(DepartmentsSelect);
