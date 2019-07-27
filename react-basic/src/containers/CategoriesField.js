import React from 'react';
//import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Category from './Category';

class CategoriesField extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {categories: []};
        this.categories =[];
        this.filterCategories = this.filterCategories.bind(this);
    }


    // It's useless attemp
    filterCategories(categories, filter) {
        let arr = categories.reduce((newArr, elem) => {
            //debugger;
            let obj = Object.assign({}, elem);
            if (obj.children.length) {
                obj.children = this.filterCategories(obj.children, filter);
                newArr.push(obj);
            } 
            else if (!filter.isDone || obj.isCompleted) {
                newArr.push(obj);
            }
            return newArr;
        }, []);
        //console.log('arr', arr);
        return arr;
    }

    render() {
        //this.categories = this.filterCategories(this.props.categories, this.props.filter);
        return (
            <ul className='categories'>
                {this.props.categories.map((el) => 
                    <Category obj={el} key={el.id}/>
                )}
            </ul>
        )
    }
}

export default connect(
    state => ({
        state: state,
        categories: state.present,
        filter: state.filter
    }),
    dispatch => ({})
)(CategoriesField);