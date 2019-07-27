import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const DiscriptionTextarea = styled.textarea`
    width: 49%;
`;

class DiscriptionField extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;  
        this.state = {discription: this.props.state.currentItem.discription}
        this.onChange = this.onChange.bind(this);      
    }

    onChange(event) {
        this.props.state.currentItem.tempDiscription = event.target.value;
        this.setState({discription: event.target.value});
    }

    componentDidMount() {
        this.textarea.focus();
    }

    render() {
        return (
            <DiscriptionTextarea 
                name="Text1" 
                rows="5" 
                onChange={this.onChange}
                placeholder='Discription'
                value={this.state.discription}
                innerRef={(input) => { this.textarea = input; }}>
            </DiscriptionTextarea>
        )
    }
}

export default connect(
    state => ({
        state: state
    }),
    dispatch => ({})
)(DiscriptionField);