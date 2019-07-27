import React from 'react';
import styled from 'styled-components';

/*const Button = styled.button`
    width: 30px;
    height: 30px;
    font-size: 16px;
`;*/

class Checkbox extends React.Component {
  render() {
    return (
        <div className='checkbox'>
            <input type='checkbox' value='Show done' name='checkbox'/>
            <span>Show done</span>
        </div>
    );
  }
};



export default Checkbox;