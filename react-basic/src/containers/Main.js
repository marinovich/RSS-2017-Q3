import React from 'react';
//import styled from 'styled-components';
import { Route } from 'react-router-dom';
import AddSection from '../containers/AddSection';
import ProgressBar from '../components/ProgressBar';
import CategoriesField from '../containers/CategoriesField';
import ToDoItemsField from '../containers/ToDoItemsField';

import EditHeader from '../components/EditHeader';
import UndoRedo from '../components/UndoRedo';
import DiscriptionField from '../components/DiscriptionField';

/*const main = styled.main`
    height: 100px;
    width: 100%;
    background-color: #ccc;
`;*/

class Main extends React.Component {
    render() {
        return (
            <main>
                <Route path={process.env.PUBLIC_URL + '/'} exact component={ProgressBar} />
                <Route path={process.env.PUBLIC_URL + '/'} exact component={AddSection} />
                <Route path={process.env.PUBLIC_URL + '/edit'} exact component={EditHeader} />
                <div className='field-wrapper'>                
                    <Route component={CategoriesField} /> 
                    <Route path={process.env.PUBLIC_URL + '/'} exact component={ToDoItemsField} />
                    <Route path={process.env.PUBLIC_URL + '/edit'} exact component={DiscriptionField} />
                </div>
                <Route path={process.env.PUBLIC_URL + '/'} exact component={UndoRedo} />
            </main>
        )
    }
};

export default Main;