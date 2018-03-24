/**
 * Created by keren.kochanovitch on 24/03/2018.
 */
import React from 'react';
import TodoListItem from './TodoListItem.js'

class TodoList extends React.Component {
    render () {
        const items = this.props.items.map((item, index) => {
            return (
                <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem}
                              markTodoDone={this.props.markTodoDone} />
            );
        });
        return (
            <ul className="list-group"> {items} </ul>
        );
    }
}

export default TodoList;