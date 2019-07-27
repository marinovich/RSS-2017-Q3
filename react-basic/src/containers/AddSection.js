import React from 'react';
//import styled from 'styled-components';
import { connect } from 'react-redux';

/*const header = styled.div`
    width: 500px;
    height: 100px;
    background-color: #ccc;
`;*/

class AddSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryValue: '',
            itemValue: ''
        };

        this.categoryTarget = {};
        this.itemTarget ={};

        this.addCategory = this.addCategory.bind(this);
        this.changeCategoryValue = this.changeCategoryValue.bind(this);

        this.addItem = this.addItem.bind(this);
        this.changeItemValue = this.changeItemValue.bind(this);       
    }

    addCategory() {
        let value = this.state.categoryValue;
        this.categoryTarget.value = '';
        this.setState({categoryValue: ''});
        return this.props.onAddCategory(value);
    }

    changeCategoryValue(event) {
        this.categoryTarget = event.target;
        this.setState({categoryValue: event.target.value});
    }

    addItem() {
        let value = this.state.itemValue;
        this.itemTarget.value = '';
        this.setState({itemValue: ''});
        return this.props.onAddItem(value);
    }

    changeItemValue(event) {
        this.itemTarget = event.target;
        this.setState({itemValue: event.target.value});
    }

    render() {
        return (
            <section className='add-section'>
                <div>
                    <input type='text' placeholder='Enter category title' onChange={this.changeCategoryValue}/>
                    <button onClick={this.addCategory}>Add</button>
                </div>
                <div>
                    <input type='text' placeholder='Enter item title' onChange={this.changeItemValue}/>
                    <button onClick={this.addItem}>Add</button>
                </div>
            </section>
        );
    }
};

export default connect(
    state => ({
        categories: state.present,
        currentCategory: state.currentCategory
    }),
    dispatch => ({
        onAddCategory: (category) => {
            dispatch({type: 'ADD_CATEGORY', payload: category});
        },
        onAddItem: (item) => {
            dispatch({type: 'ADD_ITEM', payload: item});
        }
    })
)(AddSection);