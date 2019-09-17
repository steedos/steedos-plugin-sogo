import React from 'react';
import { connect, Provider } from 'react-redux';
import store from '../../stores/configureStore'
import Organizations from '../organizations/'
import DXGrid from '../../components/dx_grid'
function SelectUsers() {
  return (
    <div className="slds-grid">
      <div className="left"><Organizations /></div>
      <div className="right"><DXGrid objectName='space_users'/></div>
    </div>
  );
}

const SelectUsersContainer: any = connect()(SelectUsers);

export default () => (
    <Provider store={store}>
        <SelectUsersContainer />
    </Provider>
);