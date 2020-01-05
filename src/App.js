import React,{Component} from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

import TodoInputUser from './componentsuser/TodoInput';
import TodoListUser from './componentsuser/TodoList';


import uuid from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Layout, Menu, Breadcrumb, Button, Typography,Input  } from 'antd';
const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Search } = Input;

class App extends Component {
  state={
    items:[],
    id:uuid(),
    item:'',
    editItem:false,
    isUser:true,
    editTitle:false,

    itemsUser:[],
    idUser:uuid(),
    itemUser:'',
    editItemUser:false,
    editUserTitle:false,

  }

  componentDidMount(){
    const updatedIt1 = window.localStorage.getItem('list');
    const updatedIt2 = window.localStorage.getItem('listuser');
    const parsedList = JSON.parse(updatedIt1);
    const parsedList2 = JSON.parse(updatedIt2);
    if(updatedIt1 == null){
      return false
    }
    else {
      this.setState({
        items:parsedList,
      })

    }
    if(updatedIt2 == null){
      return false
    }
    else {
      this.setState({
        itemsUser:parsedList2,
      })

    }

  }

handleChange = e => {
  this.setState({
    item:e.target.value
  });
};

  handleSubmit = (e) =>{
    e.preventDefault();

     const newItem = {
       id:this.state.id,
       title:this.state.item
     }

     console.log("new item",newItem);

    const updatedItems = [...this.state.items,newItem];


     localStorage.setItem('list',JSON.stringify(updatedItems));


    this.setState({
      items:updatedItems,
      item:'',
      id:uuid(),
      editItem:false,
    })


  }

clearList = ()=>{
  this.setState({
    items:[]
  })

  localStorage.setItem('list',JSON.stringify([]));

}

handleDelete = (id) => {
   const filteredItems = this.state.items.filter(item => item.id !== id);
   this.setState({
     items:filteredItems
   })

   localStorage.setItem('list',JSON.stringify(filteredItems));

}

handleEdit = id => {
  const filteredItems = this.state.items.filter(item => item.id !== id);

const selectedItems = this.state.items.find(item=> item.id == id);
console.log(selectedItems);

  this.setState({
    items:filteredItems,
    item:selectedItems.title,
    editItem:true,
    editTitle:true

  })
}

handleChangeUser = e => {
  this.setState({
    itemUser:e.target.value
  });
};

  handleSubmitUser = (e) =>{
    e.preventDefault();
     const newItemUser = {
       idUser:this.state.idUser,
       titleUser:this.state.itemUser
     }


    const updatedItemsUser = [...this.state.itemsUser,newItemUser]

    localStorage.setItem('listuser',JSON.stringify(updatedItemsUser));


    this.setState({
      itemsUser:updatedItemsUser,
      itemUser:'',
      idUser:uuid(),
      editItemUser:false,
    })


  }

clearListUser = ()=>{
  this.setState({
    itemsUser:[]
  })

  localStorage.setItem('listuser',JSON.stringify([]));


}

handleDeleteUser = (id) => {
   const filteredItemsUser = this.state.itemsUser.filter(item => item.idUser !== id);
   this.setState({
     itemsUser:filteredItemsUser
   })

   localStorage.setItem('listuser',JSON.stringify(filteredItemsUser));


}

handleEditUser = id => {
  const filteredItemsUser = this.state.itemsUser.filter(item => item.idUser !== id);

const selectedItemsUser = this.state.itemsUser.find(item=> item.idUser == id);
console.log(selectedItemsUser);

  this.setState({
    itemsUser:filteredItemsUser,
    itemUser:selectedItemsUser.titleUser,
    editItemUser:true,
    editUserTitle:true
  })
}

changeComponentUser = ()=>{
         this.setState({
           isUser:true,
         })
}
changeComponentTodo = ()=>{
         this.setState({
           isUser:false,
         })
}

  render(){
    return (
    <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
               <Menu.Item key="1"><a onClick={this.changeComponentTodo}>Todo List</a></Menu.Item>
                <Menu.Item key="2"><a onClick={this.changeComponentUser}>User</a></Menu.Item>
          </Menu>
        </Header>

       {!this.state.isUser ?

         <Content style={{ padding: '0 50px' }}>
           <Breadcrumb style={{ margin: '16px 0' }}>
             <Breadcrumb.Item>Home</Breadcrumb.Item>
             <Breadcrumb.Item>Todo</Breadcrumb.Item>
           </Breadcrumb>
           <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>

             <TodoInput item={this.state.item} handleChange={this.handleChange}  handleSubmit={this.handleSubmit}
               editItem={this.state.editItem}  editTitle={this.state.editTitle} />
             <TodoList items={this.state.items} clearList={this.clearList} handleDelete={this.handleDelete} handleEdit={this.handleEdit} />

           </div>
         </Content>

         :

         <Content style={{ padding: '0 50px' }}>
           <Breadcrumb style={{ margin: '16px 0' }}>
             <Breadcrumb.Item>Home</Breadcrumb.Item>
             <Breadcrumb.Item>User</Breadcrumb.Item>
           </Breadcrumb>
           <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>

             <TodoInputUser item={this.state.itemUser} handleChange={this.handleChangeUser}  handleSubmit={this.handleSubmitUser}
               editItem={this.state.editItemUser} editUserTitle={this.state.editUserTitle} />

             <TodoListUser items={this.state.itemsUser} clearList={this.clearListUser} handleDelete={this.handleDeleteUser} handleEdit={this.handleEditUser} />

           </div>
         </Content>


         }


        <Footer style={{ textAlign: 'center' }}>©&nbsp;2020</Footer>

      </Layout>
  );
}}

export default App;
