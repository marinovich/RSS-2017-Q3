import React from 'react';
//import { Route } from 'react-router-dom';
//import { connect } from 'react-redux';
import Category from '../containers/Category';


class ChildrenCategory extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { buttonShown: true }
    }

    render() {
        return (
            <ul>
                {this.props.obj.map((el, i) => 
                    <Category key={i} obj={el} />
                )}
            </ul>
        );
    }
}


export default ChildrenCategory /*connect(
    state => ({
        categories: state
    }),
    dispatch => ({
        /*onAddChild: (parent, name) => {
            dispatch({type: 'ADD_CHILD', payload: {parent: parent, name: name}});
        }
    })
)(ChildrenCategory);*/
