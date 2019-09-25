import React from 'react';
import './App.css';
import { Provider  } from 'react-redux';
import store from 'steedos-webapp/lib/stores/configureStore'
import SelectUsers from 'steedos-webapp/lib/components/select_users'
import _ from 'underscore'

function App() {
  let appStore = store({settings: {services: {odata: 'http://127.0.0.1:5000'}}})

  let selectionLabel = (item)=>{
    return `${item.name}(${item.email})`
  }

  let userListColumns = [
    { name: 'name', title: '姓名' },
    { name: 'email', title: '邮箱地址' },
    { name: 'mobile', title: '手机号' }
  ]


  let getTagElement = ()=>{
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("tag_element")
  }

  let closeWindow = ()=>{
    window.location.href="about:blank";
    window.close();
  }


  let getSelectUsersSelection = ()=>{
    return appStore.getState().entities.space_users.selection
  }

  let confirm = ()=>{
    let selection = getSelectUsersSelection();
    let tagElement = getTagElement()
    //TODO 处理提示功能
    if(_.isEmpty(selection)){
      console.log('请选择收件人');
    }
    window.opener.document.getElementById(tagElement).value = _.pluck(selection, "email");
    closeWindow();
  }

  return (
    <div className="App">
      <Provider store={appStore}>
        <SelectUsers selectionLabel={selectionLabel} userListColumns={userListColumns}/>
      </Provider>
      <div className="slds-docked-form-footer">
      <button type="button" className="slds-button slds-button_neutral" onClick={closeWindow}>取消</button>
      <button type="button" className="slds-button slds-button_brand" onClick={confirm}>确认</button>
    </div>
    </div>
  );
}

export default App;