import { injectGlobal } from 'styled-components';

export default injectGlobal`

    * {
        margin: 0;
        padding: 0;
        user-select: none;
    }

    ul, 
    ol {
        list-style-type: none;
    }

    body {
        margin: 0;
        width: 100%;
    }

    .wrapper {
        margin: 0 auto;
        max-width: 500px;
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-content: center;
        width: 500px;
        height: 50px;
    }

    .checkbox,
    .search,
    .logo {
        display: flex;
        align-self: center;
        flex-direction: row;
        align-content: center;
    }

    .logo {
        margin-right: auto;
        font-size: 20px;
    }

    .progress-bar {
        width: 100%;
        height: 10px;
        margin: 10px 0;
        box-sizing: border-box;
        border: 1px solid #999;
        border-radius: 3px;
    }

    .current-progress {
        height: 100%;
        background-color: #999;
    }

    button {
        height: 16px;
        width: 16px;
        font-size: 10px;
    }

    .add-section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .add-section button {
        height: 20px;
        width: 40px;
    }

    .add-section div {
        display: flex;
        flex-direction: row;
        align-content: center;
    }

    .categories { 
        box-sizing: border-box;
        border: 1px #000 solid;
        width: 50%;
        height: 350px;
        background-color: #eee;
        overflow-y: auto;
    }

    .field-wrapper {
        display: flex;
        flex-direction: row;
    }

    .category {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-content: flex-start;
        padding-left: 10px;
        width: 100%;
    }

    .parent-category > button {
        isplay: inline-flex;
        flex-direction: row;
        align-self: center;
        justify-content: center;
    }

    .parent-category {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-content: center;
        height: 30px;
        width: 100%;
        margin-left: -10px;
        border: 1px solid #777;
    }
    .small-wrapper {
        display: inline-flex;
        flex-direction: row;
        align-self: center;
        justify-content: flex-start;
        margin-right: auto;
        width: 80%;
    }

    .parent-category:hover {
        font-size: 20px;
        cursor: pointer;
    };

    .category-name {
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 70%;
        text-align: left;
    }

    .item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        height: 40px;
        border: 1px solid #555;
    }
    .item > input {
        cursor: pointer;
        margin: 0 10px;
    }

    .item > a {
        margin-left: auto;
        margin-right: 10px;
    }

    .edit-header {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 110px;
        padding: 10px 0;
    }

    .edit-buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }

    .edit-name {
        margin-right: auto;
    }
`;