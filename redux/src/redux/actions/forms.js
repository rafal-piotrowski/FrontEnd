export const CHANGE_FORM_VALUE = 'CHANGE_FORM_VALUE';
export const UPDATE_PAGE = 'UPDATE_PAGE';

export const changeFormValue = (pageId, nValue) => {
    return {
      type: CHANGE_FORM_VALUE,
      pageId,
      nValue
    };
};

export const updatePage = (page, slot) => {
    return {
      type: UPDATE_PAGE,
      page, slot
    };
};
