import React,{Component} from 'react';
import TodoItem from './TodoItem';

import { Layout, Menu, Breadcrumb, Button, Typography,Input  } from 'antd';
const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Search } = Input;


class TodoList extends Component {
  render(){

const {items,clearList,handleDelete , handleEdit} = this.props;

    return(
      <div className="grid-demo">
      <div className="ant-row demo-row">
        <div className="ant-col-24 demo-col demo-col-1">
         </div>
         <ul className='list-group my-5'>
           <h3 className="text-capitalize text-center">
              User List
           </h3>
           {
             items.map(item=> {
               return (
                 <TodoItem key={item.idUser} title={item.titleUser} handleDelete={()=>handleDelete(item.idUser)} handleEdit={()=>handleEdit(item.idUser)} />
               )
             } )
           }



        <div className="ant-col-24">
           <Button type="danger" onClick={clearList} block >
                 Delete All User
               </Button>
          </div>

       </ul>

         </div>
      </div>

      );
  }
}
export default TodoList;
