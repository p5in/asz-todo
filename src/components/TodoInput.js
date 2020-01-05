import React , {Component} from 'react';

import { Layout, Menu, Breadcrumb, Typography,Input ,Modal, Button } from 'antd';
const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Search } = Input;

class TodoInput extends Component {


  state = {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      editUser:false,
      loading: false,
    };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };

    handleOk = () => {

      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
      }, 2000);
    };

    handleCancel = () => {
      this.setState({ visible: false });
    };


  render(){

 const {item, handleChange, handleSubmit, editItem, editTitle } = this.props;
const { visible, loading } = this.state;
    return(
      <div className="grid-demo">
      <div className="ant-row demo-row">
        <div className="ant-col-24 demo-col demo-col-1">
          <Title level={2}>Todo List</Title>
         </div>
         <div className="ant-col-24">


           <Button type="primary" onClick={this.showModal}>
                 Add List
               </Button>

               <Modal
                  visible={visible}
                  title="Title"
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={[
                    null,
                    <Button key="submit" loading={loading} onClick={this.handleOk}>
                      Submit
                    </Button>,
                  ]}
                >
                <form onSubmit={handleSubmit}>
               <div className="input-group">
               <input type="text" className="form-control text-capitalize" placeholder="Add list"
               value={item}
               onChange={handleChange}

                />
               </div>
               <button type="submit" onClick={this.handleOk}
                 className="btn  btn-block btn-info mt-4">add item</button>
               </form>
              </Modal>


             {editItem ?
               <form className="mt-2" onSubmit={handleSubmit}>
               <div className="input-group">
               <input type="text" className="form-control text-capitalize" placeholder="Add list"
               value={item}
               onChange={handleChange}

                />
               </div>
               <button type="submit" onClick={this.handleOk}
                 className={
                 editItem ? "btn  btn-block btn-success mt-2" : "btn  btn-block btn-info mt-2"}> {editItem ? 'edit item' :"add item"}</button>
               </form>
             : null}



          </div>
         </div>
      </div>
    );
  }
}

export default TodoInput;
