import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

/*const header = styled.div`
    width: 500px;
    height: 100px;
    background-color: #ccc;
`;*/

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { isDone: this.props.filter.isDone,
                        value: this.props.filter.value};

        this.onChange = this.onChange.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.clearSearchField = this.clearSearchField.bind(this);
    }

    onChange() {
        this.setState({isDone: !this.state.isDone});
        this.props.onChangeFilter(!this.state.isDone);
    }

    changeFilter(event) {
        this.setState({filter: event.target.value});
        this.props.onChangeValue(event.target.value);
    }

    clearSearchField() {
        this.setState({filter: ''})
        this.props.onChangeValue('');
    }

    render() {
        return (
            <header className='header'>
                <h1 className='logo'>To-Do List</h1>
                <div className='checkbox'>
                    <input 
                        type='checkbox' 
                        name='checkbox' 
                        onChange={this.onChange} 
                        checked={this.state.isDone}/>
                    <span>Show done</span>
                </div>
                <div className='search'>
                    <input 
                        type='text' 
                        placeholder='Search' 
                        value={this.state.filter} 
                        onChange={this.changeFilter}/>
                    <button onClick={this.clearSearchField}>X</button>
                </div>
            </header>
        );
    }
};

export default connect(
    state => ({
        state: state,
        filter: state.filter
    }),
    dispatch => ({
        onChangeFilter: (value) => {
            dispatch({type: 'CHANGE_FILTER', payload: {isDone: value}})
        },
        onChangeValue: (value) => {
            dispatch({type: 'CHANGE_FILTER', payload: {value: value}})
        }
    })
)(Header);
