import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import TodoList from './Components/TodoList.js';
import TodoInput from './Components/TodoInput.js';
import TodoHeader from './Components/TodoHeader.js';

class TodoApp extends React.Component {
    constructor (props) {
        super(props);

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.markTodoDone = this.markTodoDone.bind(this);
        this.state = {
            isLoaded: false,
            todoItems: []
        };
    }
    componentDidMount() {
        const cachedItems = localStorage.getItem('todoItems');
        if (cachedItems) {
            this.setState({ todoItems: JSON.parse(cachedItems) });
            return;
        } else {
            fetch("http://www.json-generator.com/api/json/get/cfTxvFwnaW?indent=2")
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            todoItems: result
                        });
                        localStorage.setItem('todoItems', JSON.stringify(result));
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }
    }
    addItem(todoItem) {
        const todoItems = this.state.todoItems;
        todoItems.unshift({
            index: todoItems.length+1,
            name: todoItem.newItemValue,
            done: false
        });
        localStorage.setItem('todoItems', JSON.stringify(todoItems));
        this.setState({todoItems: todoItems});
    }
    removeItem (itemIndex) {
        const todoItems = this.state.todoItems;
        todoItems.splice(itemIndex, 1);
        localStorage.setItem('todoItems', JSON.stringify(todoItems));
        this.setState({todoItems: todoItems});
    }
    markTodoDone(itemIndex) {
        const todoItems = this.state.todoItems;
         const todo = todoItems[itemIndex];
        todo.done = !todo.done;
        localStorage.setItem('todoItems', JSON.stringify(todoItems));
        this.setState({todoItems: todoItems});
    }
    render() {
        const { todoItems, error, isLoaded } = this.state;

        if (error) {
            return (<div>{ error.message }</div>);
        } else if (isLoaded || todoItems.length > 0) {
            return (
                <div id="main">
                    <TodoHeader />
                    <TodoInput addItem={this.addItem}/>
                    <TodoList items={todoItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
                </div>
            );
        }

        return (
            <div>Loading...</div>
        );
    }
}
ReactDOM.render(<TodoApp />, document.getElementById('root'));