import React from 'react';

class TodoInput extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(event) {
        event.preventDefault();
        const newItemValue = event.target[0].value;

        if(newItemValue) {
            this.props.addItem({newItemValue});
            event.target.reset();
        }
    }
    render () {
        return (
            <form ref="form" onSubmit={this.onSubmit} className="form-inline">
                <input type="text" ref="itemName" className="form-control" placeholder="What needs to be done?"/>
            </form>
        );
    }
}

export default TodoInput;