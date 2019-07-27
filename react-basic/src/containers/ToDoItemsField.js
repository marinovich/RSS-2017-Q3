import React from 'react';
//import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Item from './Item'

class ToDoItemsField extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;        
    }

    render() {
        let toDoItems = !this.props.items ? [] : this.props.items;
        return (
            <ul className='categories'>
                {toDoItems.map((el) => 
                    <Item obj={el} key={el.id}/>
                )}
            </ul>
        )
    }
}

export default connect(
    state => ({
        state: state,
        items: state.currentCategory.items
    }),
    dispatch => ({})
)(ToDoItemsField);