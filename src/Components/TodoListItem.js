
import React from 'react';

class TodoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
    }
    onClickClose() {
        const index = parseInt(this.props.index);
        this.props.removeItem(index);
    }
    onClickDone() {
        const index = parseInt(this.props.index);
        this.props.markTodoDone(index);
    }
    render () {
        const todoClass = this.props.item.done ?
            "checked" : "unchecked";
        return(
            <li className={todoClass + " list-group-item"}>
                <input type="checkbox" className="toggle"onClick={this.onClickDone} />
                <label>{this.props.item.name}</label>
                <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
            </li>
        );
    }
}


export default TodoListItem;