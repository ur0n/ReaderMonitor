import { GET_TAG_REPORT } from './log.type';

const initialState = {
  tagReportList: {},
}

export const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TAG_REPORT:
    const id = action.id;
    return {
      ...state,
      tagReportList: {
        ...state.tagReportList,
        [id]: state.tagReportList[id] === undefined? [action.message] : [
          ...state.tagReportList[id],
          action.message
        ]
      }
    }
    break;
    default:
    return {
      ...state,
    };
  }
}
