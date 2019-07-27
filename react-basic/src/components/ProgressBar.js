import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { persents: 100 }
    }

    /*componentWillMount() {
        let persents = (this.props.items && this.props.items.length !== 0)
            ? this.props.items.filter(x => x.isDone).length / this.props.items.length * 100
            : 100;
        this.setState({ persents: persents });
    }*/

    render() {   
        /*let persents = (this.props.items && this.props.items.length !== 0)
            ? this.props.items.filter(x => x.isDone).length / this.props.items.length * 100
            : 100;*/
        //this.setState({ persents: persents });
        console.log(this.props.state.completedCategories, this.props.state.totalCategories)

        let persents = this.props.state.completedCategories / this.props.state.totalCategories * 100;

        if (persents > 100) persents = 100;

        return (
            <div className='progress-bar'>
                <div className='current-progress' style={{width: `${persents}%`}}></div>
            </div>
        );
    }
};

export default connect(
    state => ({
        state: state,
        items: state.currentCategory.items
    }),
    dispatch => ({})
)(ProgressBar);