import React from 'react';
import './App.css';
import { Provider  } from 'react-redux';
import store from 'steedos-webapp/lib/stores/configureStore'
import SelectUsers from 'steedos-webapp/lib/components/select_users'

function App() {
  let appStore = store({settings: {services: {odata: 'http://127.0.0.1:5000'}}})
  let columns= [
    { name: '_id', title: '唯一标识' },
    { name: 'name', title: '名称' },
    // { name: 'applicant_name', title: '申请人' },
    { name: 'email', title: 'Email'}
  ];

  let selectionLabel = (item)=>{
    return `${item.name}(${item.email})`
  }

  let userListColumns = [
    { name: 'name', title: '姓名' },
    // { name: 'username', title: 'username' },
    { name: 'email', title: '邮箱地址' },
    { name: 'mobile', title: '手机号' }
  ]

  return (
    <div className="App">
      <Provider store={appStore}>
        <SelectUsers selectionLabel={selectionLabel} userListColumns={userListColumns}/>
      </Provider>
    </div>
  );
}

export default App;