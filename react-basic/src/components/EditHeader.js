import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SaveButton = styled.button`
    font-size: 12px;
    width: 100px;
    height: 20px;
    margin-right: 10px;
`;

const CancelButton = styled.button`
    font-size: 12px;
    width: 80px;
    height: 20px;
`;

const EditField = styled.div`
    display: inline-flex;
    width: 50%;
    align-self: flex-end;
    flex-direction: column;

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
`;

const Checkbox = styled.input.attrs({
    type: 'password',
    type: 'checkbox',
    name: 'isDone' 
})`
    margin-right: 5px;
`;

class EditHeader extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        
        this.state = { name: this.props.state.currentItem.name,
                       isDone: this.props.state.currentItem.isDone};

        this.changeItemName = this.changeItemName.bind(this);
        this.setItemReadiness = this.setItemReadiness.bind(this);
        this.saveState = this.saveState.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    changeItemName(event) {
        this.setState({ name: event.target.value });
    }

    setItemReadiness(event) {
        this.setState({ isDone: !this.state.isDone })
    }

    saveState() {
        this.props.onSaveState(this.state);
    }

    cancelEdit() {

    }

    render() {
        return (
            <header className='edit-header'>
                <div className='edit-buttons'>
                    <h2 className='edit-name'>{this.props.state.currentItem.name}</h2>                
                    <Link to='/'><SaveButton onClick={ this.saveState }>Save changes</SaveButton></Link>
                    <Link to='/'><CancelButton onClick={ this.cancelEdit }>Cancel</CancelButton></Link>
                </div>
                <EditField>
                    <Checkbox type='text' value={this.state.name} onChange={this.changeItemName}/>
                    <div>
                        <Checkbox checked={this.state.isDone}
                               onChange={this.setItemReadiness}/>
                        <label htmlFor="isDone">Done</label>
                    </div>
                </EditField>
            </header>
        );
    }
};

export default connect(
    state => ({
        state: state
    }),
    dispatch => ({
        onSaveState: (state) => {
            dispatch({type: 'SAVE_STATE', payload: state});
    }})
)(EditHeader);