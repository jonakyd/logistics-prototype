import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import {createUserSub} from '../../../actions/user';

export default connect(state => ({
    data: state['users']
}))(class ReportsAggregated extends Component {
  render() {
    const {dispatch, data: {arr}} = this.props;

    return (
      <div>
        <form onSubmit={(e) => {
          const val = $(e.target).find('input').val();

          e.preventDefault();
          dispatch(createUserSub({
            name: val,
            type: 1
          }));
        }}>
          <input
            placeholder="Enter to create new user with user name" />
        </form>
        <ol>
          {arr.map((user) => {
            return <li key={user.id}>{user.name}</li>;
          })}
        </ol>
      </div>
    );
  }
});