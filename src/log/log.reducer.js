import { GET_TAG_REPORT, CLEAN_REPORT_LIST } from './log.type';

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
    case CLEAN_REPORT_LIST:
      const limit = 100;
      const tagReportListOfId = state.tagReportList[action.id];
      if(tagReportListOfId === undefined){
        return {
          ...state
        };
      }

      const newReportListOfId = tagReportListOfId.slice(tagReportListOfId.length - limit);
      return {
        ...state,
        tagReportList: {
          ...state.tagReportList,
          [action.id]: newReportListOfId.length === limit? newReportListOfId : tagReportListOfId
        }
      }
      break;
    default:
    return {
      ...state,
    };
  }
}
