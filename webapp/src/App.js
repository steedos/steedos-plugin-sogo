import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './stores/configureStore'
import SelectUsers from './components/select_users'
import Grid from './components/dx_grid'

function App() {

  let columns= [
    // { name: '_id', title: '唯一标识' },
    { name: 'name', title: '名称' },
    { name: 'applicant_name', title: '申请人' },
  ];
  let getRowId = (row) => row._id

  let rootNodes = ["51ae9b1a8e296a29c9000002"] // , "51aefb658e296a29c9000049"
  return (
    <div className="App">
      <Provider store={store}>
        {/* <Grid objectName='instances' columns={columns} getRowId={getRowId}/> */}
        <SelectUsers getRowId={getRowId} rootNodes={rootNodes} valueField="user"/>
      </Provider>
    </div>
  );
}

export default App;