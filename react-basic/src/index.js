import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CategoryClass from './CategoryClass';
import ItemClass from './ItemClass';
import _ from 'lodash';

const initialState = {
    past: [],
    present: [],
    future: [],
    currentCategory: {},
    currentItem: {},
    totalCategories: 0,
    completedCategories: 0,
    filter: { isDone: false, value: '' }
};

function createBackup(state) {
    let pastState = _.cloneDeep(state);
    pastState.past = [];
    pastState.future = [];
    return pastState;
}

const store = createStore(reducer);

store.subscribe(() => {
    //console.log('subscribe', store.getState());
});

/*function findElement(arr, elem) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) return elem;
        else if (arr[i].children.map)
            return findElement(arr[i].children, elem)
    };
}*/

function reducer(state = initialState, action) {
    let backup = createBackup(state);
    if (state.past.length >= 50) state.past.shift();
    if (state.future.length >= 50) state.future.pop();

    if (action.type === 'SELECT_CATEGORY') {     
        return Object.assign({}, state, {
            past: [...state.past, createBackup(state)],
            currentCategory: action.payload,
            future: []
        });
    }

    if (action.type === 'ADD_CATEGORY') {
        let name = action.payload;
        state.totalCategories++;
        state.completedCategories++;

        if (!name) {
            name = 'New' + (state.present.length + 1);
        }       
        return Object.assign({}, state, {
            past: [...state.past, createBackup(state)],
            present: [new CategoryClass(name), ...state.present],
            future: []
        });
    }

    if (action.type === 'ADD_ITEM') {
        if (!state.currentCategory.items) return state;
        let name = action.payload;

        if (state.currentCategory.items.length === 0 ||
            state.currentCategory.items.filter(x=>x.isDone).length == state.currentCategory.items.length) {
            state.completedCategories--;
            state.currentCategory.isCompleted = false;
        }

        if (!name) {
            name = 'To-Do Item #' + (state.currentCategory.items.length + 1);
        }  
        return Object.assign ({}, state, {
            past: [...state.past, createBackup(state)],
            currentCategory: Object.assign(state.currentCategory, {items: [new ItemClass(name), ...state.currentCategory.items]}),
            future: []
        });
    }

    if (action.type === 'ADD_CHILD') {      
        let parent = action.payload.parent;
        let children = action.payload.parent.children;

        state.totalCategories++;
        state.completedCategories++;

        let newName = parent.name + `.${children.length + 1}`;
        children.unshift(new CategoryClass(newName, parent));
        parent.childrenVisibility = true;

        return Object.assign ({}, state, {
            past: [...state.past, backup],
            present: [...state.present],
            future: []
        });
    }

    if (action.type === 'COMPLETE_TASK') {  
        let prevCurrentCategory = state.past[state.past.length - 1].currentCategory;
        let currentCategory = action.payload.currentCategory;   
        let obj = action.payload.obj;
        let isDone = action.payload.isDone;
        obj.isDone = isDone;
        if (currentCategory.items.length === currentCategory.items.filter(x=>x.isDone).length) {
            currentCategory.isCompleted = true;
            state.completedCategories++;
        }
        else if (prevCurrentCategory.isCompleted && prevCurrentCategory.id === currentCategory.id) {
            currentCategory.isCompleted = false;
            state.completedCategories--;
        }
        else {
            currentCategory.isCompleted = false;
        }

        return Object.assign ({}, state, {
            past: [...state.past, backup],
            future: []
        });
    }

    if (action.type === 'SAVE_STATE') {   
        state.currentItem.isDone = action.payload.isDone;
        state.currentItem.name = action.payload.name;
        state.currentItem.discription = state.currentItem.tempDiscription;
        state.currentItem.tempDiscription = '';

        return Object.assign ({}, state, {
            past: [...state.past, backup],
            future: []
        });
    }

    if (action.type === 'CHANGE_FILTER') {
        return Object.assign({}, state, {
            filter: Object.assign({}, state.filter, action.payload),
            currentCategory: {}
        });
    }

    if (action.type === 'DELETE_CATEGORY') {
        /* Add num of all deleted child categories
         *
         *
         *
         *
         *
         *
         *
         */



        let category = action.payload;
        let newState = state.present.slice();
        let currentCategory = category.id === state.currentCategory.id ? {} : state.currentCategory;
        state.totalCategories--;        
        if (category.isCompleted) {
            state.completedCategories--;
        }

        if(!category.parent) {
            return Object.assign ({}, state, {
                past: [...state.past, backup],
                present: newState.filter(el => el.id !== category.id),
                currentCategory: currentCategory,
                future: []
            });
        }
        else {
            category.parent.children = category.parent.children.filter(el => el.id !== category.id);
        }
        return Object.assign ({}, state, {
            past: [...state.past, backup],
            present: [...state.present],
            currentCategory: currentCategory,
            future: []
        });
    }

    if (action.type === 'UNDO') {   
        let currentState = _.assignIn(state.past.pop());
        currentState.past = state.past.slice();
        currentState.future = [createBackup(state), ...state.future];

        return Object.assign ({}, state, currentState);
    }

    if (action.type === 'REDO') {   
        let currentState = _.assignIn(state.future.shift());
        currentState.future = state.future.slice();
        currentState.past = [...state.past, createBackup(state)];

        return Object.assign({}, state, currentState);
    }

    return _.assignIn(state);
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route component={App} />       
        </Router>
    </Provider>, 
    document.getElementById('root'),
);

registerServiceWorker();
