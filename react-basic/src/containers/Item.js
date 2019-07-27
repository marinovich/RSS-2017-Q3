import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import AddButton from '../components/buttons/AddButton';
//import DeleteButton from '../components/buttons/DeleteButton';
import EditButton from '../components/buttons/EditButton';
import ChildrenCategory from '../components/ChildrenCategory';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
        this.onChange = this.onChange.bind(this);
        this.setCurrentItem = this.setCurrentItem.bind(this);
    }

    setCurrentItem() {
        this.props.state.currentItem = this.props.obj;
    }


    onChange(event) {
        this.props.completeTask(this.props.obj, event.target.checked, this.props.state.currentCategory);
    }

    render() {
        return (
            <li className='item'>
                <input type='checkbox' name='checkbox' onChange={this.onChange} checked={this.props.obj.isDone}/>
                <span>{this.props.obj.name}</span>                
                <Link to={process.env.PUBLIC_URL + '/edit'} onClick={this.setCurrentItem}><button>E</button></Link>               
            </li>
        )
    }
}

export default connect(
    state => ({
        categories: state.present,
        state: state
    }),
    dispatch => ({
        completeTask: (category, isDone, currentCategory) => {
            dispatch({type: 'COMPLETE_TASK', payload: {
                                                obj: category, 
                                                isDone: isDone, 
                                                currentCategory: currentCategory}});
        }
    })
)(Item);