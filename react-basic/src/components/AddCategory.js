import React from 'react';
import styled from 'styled-components';

/*const Button = styled.button`
    width: 30px;
    height: 30px;
    font-size: 16px;
`;*/

class AddCategory extends React.Component {
    render() {
        return (
            <div>
                <input type='text' placeholder='Enter category title'/>
                <button>Add</button>
            </div>
        );
    }
};

export default AddCategory;