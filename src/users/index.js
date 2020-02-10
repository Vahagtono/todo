import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

class Users extends Component {
    render() {
        const { 
            props: { id, handleChange, data }, 
        } = this;
        return (
            <Droppable droppableId={id} key={id}>
                {provided => (
                    <ol ref={provided.innerRef}>
                        {data.map((item, index) => (
                            <Draggable draggableId={`${item}${index}`} key={index} index={index}>
                                {provided => (
                                    <li 
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >   
                                        <input 
                                            value={item} 
                                            onChange={(event) => handleChange(event, index, id)} 
                                        />
                                    </li>
                                )}
                            </Draggable>
                            )
                        )}
                        {provided.placeholder}
                    </ol>
                )}
            </Droppable>
        );
    }
}

export default Users;
