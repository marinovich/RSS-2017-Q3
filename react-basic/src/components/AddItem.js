import React from 'react';
import styled from 'styled-components';

/*const Button = styled.button`
    width: 30px;
    height: 30px;
    font-size: 16px;
`;*/

class AddItem extends React.Component {
    render() {
        return (
            <div>
                <input type='text' placeholder='Enter item title'/>
                <button>Add</button>
            </div>
        );
    }
};

export default AddItem;