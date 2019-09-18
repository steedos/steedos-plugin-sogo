import React from 'react';
import { connect } from 'react-redux';
import DXGrid from '../../components/dx_grid'
import SteedosTree from '../../components/tree'
function SelectUsers() {
  return (
    <div className="slds-grid">
      <div className="left"><SteedosTree objectName='organizations'/></div>
      <div className="right"><DXGrid objectName='space_users'/></div>
    </div>
  );
}

export default connect()(SelectUsers);