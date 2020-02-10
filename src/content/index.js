import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import Users from '../users';

import '../styles/style.css';

class Content extends Component {

  state = {
    standard: ['John', 'Nick', 'Johnson', 'Sam', ''],
    vip: ['Miguel', 'Adarasyon', 'Nikol', ''],
  }

  handleChange = (event, index, propname) => {
    const data = [...this.state[propname]];
    const { value } = event.target;
    
    if (value === '') {
      data.splice(index, 1);
    } else {
      data[index] = value;
    }
    if (data.every(item => item)) {
      data.push('');
    }
    this.setState({ [propname]: data });
  }

  onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const { droppableId, index: startIndex } = source;
    const { index: endIndex } = destination;
    const dataOrder = [...this.state[droppableId]];
    const [removed] = dataOrder.splice(startIndex, 1);

    if (startIndex === this.state[droppableId].length - 1 || endIndex === this.state[droppableId].length - 1) return
    if (destination.droppableId === droppableId) {
      dataOrder.splice(endIndex, 0, removed);
    } else {
      const dataOrder = [...this.state[destination.droppableId]];
      dataOrder.splice(endIndex, 0, removed);
      this.setState({ [destination.droppableId]: dataOrder });
    }
    this.setState({ [droppableId]: dataOrder });
  };
  
  render() {
    const { state, handleChange } = this;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className='Flex'>
          <div className='Border'>
            <h1>Standard Users</h1>
            <Users data={state.standard} handleChange={handleChange} id='standard' />
          </div>
          <div>
            <h1>Vip Users</h1>
            <Users data={state.vip} handleChange={handleChange} id='vip' />
          </div>
        </div>
      </DragDropContext>
    );
  }
}

export default Content;
