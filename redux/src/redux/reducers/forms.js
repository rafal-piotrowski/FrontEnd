import {
    CHANGE_FORM_VALUE,
    UPDATE_PAGE
} from '../actions/forms.js';

import { createSelector } from 'reselect';

const INITIAL_STATE = {
    page: 1,
    formvalues: [{
        "pageId": 1,
        "formText": ""
    },{
        "pageId": 2,
        "formText": ""
    },{
        "pageId": 3,
        "formText": ""
    }]
};

const forms = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_FORM_VALUE:
            return {
                ...state,
                formvalues: Object.keys(state.formvalues).map((key) => state.formvalues[key].pageId === action.pageId ? { ...state.formvalues[key], formText: action.nValue } : state.formvalues[key])
            }
        
        case UPDATE_PAGE:
            return {
                ...state,
                page: action.page
            }
        
        default:
            return state;
    }
};

export default forms;

export const formsSelector = state => state.forms.formvalues;
export const pageSelector = state => state.forms.page;

export const filterFormSelector = createSelector(
    [ formsSelector, pageSelector ],
    (formvalues, page) => {
        return Object.values(formvalues).filter(form => form.pageId === page)[0].formText;
    }
)
