import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Button = styled.button`
    width: 50%;
    height: 20px;
    font-size: 12px;
`;

class UndoRedo extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;  
        this.undoAction = this.undoAction.bind(this);   
        this.redoAction = this.redoAction.bind(this);    
    }

    undoAction() {
        this.props.undoAction();
    }

    redoAction() {
        this.props.redoAction();
    }

    render() {
        return (
            <div>
                <Button 
                    innerRef={(button) => { this.undoButton = button; }}
                    disabled={!this.props.state.past.length}
                    onClick={this.undoAction}>
                    Undo
                </Button>
                <Button 
                    innerRef={(button) => { this.redoButton = button; }}
                    disabled={!this.props.state.future.length}
                    onClick={this.redoAction}>
                    Redo
                </Button>
            </div>
        )
    }
}

export default connect(
    state => ({
        state: state
    }),
    dispatch => ({
        undoAction: () => {
            dispatch({ type: 'UNDO'});
        },
        redoAction: () => {
            dispatch({ type: 'REDO' });
        }
    })
)(UndoRedo);