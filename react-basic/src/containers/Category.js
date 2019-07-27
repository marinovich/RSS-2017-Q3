import React from 'react';
//import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
//import AddButton from '../components/buttons/AddButton';
//import DeleteButton from '../components/buttons/DeleteButton';
//import EditButton from '../components/buttons/EditButton';
import ChildrenCategory from '../components/ChildrenCategory';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { buttonShown: true }
        this.onClick = this.onClick.bind(this);
        this.addChild = this.addChild.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editName = this.editName.bind(this);
        this.changeName = this.changeName.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
    }

    editName(event) {
        event.stopPropagation();
        this.textInput.contentEditable = true;
        this.textInput.focus();
        this.textInput.innerHTML = '';
    }

    changeName(event) {
        let text = event.target.innerText;
        if (text.charCodeAt(text.length - 1) === 10) {
            text = text.slice(0, -2);
            event.target.contentEditable = false;
            event.target.innerHTML = text;
            this.props.obj.name = text;
        }
        
    }

    onClick(event) {
        event.stopPropagation();
        this.props.obj.childrenVisibility ^= true;
        if (this.props.obj.childrenVisibility) event.target.innerText = '^';
        else event.target.innerText = 'v';
        this.forceUpdate();        
    }

    addChild(event) {
        event.stopPropagation();
        this.props.onAddChild(this.props.obj);
    }

    deleteItem(event) {
        event.stopPropagation();
        this.props.onDelete(this.props.obj);
    }

    selectCategory() {
        this.props.onSelectCategory(this.props.obj);
    }

    render() {
        return (
            <li className='category'>
                <div onClick={this.selectCategory} 
                     className='parent-category'
                     style={{
                            fontSize: this.props.obj.id === this.props.state.currentCategory.id 
                                ? '20px' 
                                : '',
                            backgroundColor: 
                                    (this.props.filter.isDone && 
                                    this.props.obj.isCompleted && 
                                    this.props.obj.name.includes(this.props.filter.value)) ||
                                    (!this.props.filter.isDone &&
                                    this.props.filter.value &&
                                    this.props.obj.name.includes(this.props.filter.value))
                                ? '#66ff33'
                                : '' 
                            }}>
                    <div className='small-wrapper'>
                        <button 
                            onClick={this.onClick}
                            style={{visibility: this.props.obj.children.length 
                                ? 'visible' 
                                : 'hidden' 
                            }}
                            className='show-button'>^
                        </button>
                        <h5 className='category-name' 
                            ref={(input) => { this.textInput = input; }} 
                            onInput={this.changeName}>{this.props.obj.name}</h5>   
                    </div>            
                    <button onClick={this.editName}>E</button>
                    <button onClick={this.deleteItem}>D</button>
                    <button onClick={this.addChild}>+</button>
                </div>
                { this.props.obj.childrenVisibility 
                    ? <ChildrenCategory obj={this.props.obj.children}/> 
                    : null }
            </li>
        )
    }
}

export default connect(
    state => ({
        state: state,
        filter: state.filter
    }),
    dispatch => ({
        onAddChild: (parent, name) => {
            dispatch({type: 'ADD_CHILD', payload: {parent: parent, name: name}});
        },
        onDelete: (category) => {
            dispatch({type: 'DELETE_CATEGORY', payload: category})
        },
        onSelectCategory: (category) => {
            dispatch({type: 'SELECT_CATEGORY', payload: category});
        }
    })
)(Category);