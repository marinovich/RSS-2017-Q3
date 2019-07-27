import React from 'react';
import styled from 'styled-components';

/*const Button = styled.button`
    width: 30px;
    height: 30px;
    font-size: 16px;
`;*/

class SearchField extends React.Component {
  render() {
    return (
        <div className='search'>
            <input type='text' placeholder='Search'/>
            <button>X</button>
        </div>
    );
  }
};



export default SearchField;