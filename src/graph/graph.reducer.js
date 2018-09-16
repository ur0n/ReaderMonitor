import { GET_GRAPH_REPORT, CLEAN_REPORT_LIST } from './graph.type'

const initialState = {
  tagReportList: {},
  tagIdList: [],
}

export const graphReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GRAPH_REPORT:
      const id = action.message.id;

      // すでにある場合
      if(state.tagIdList.indexOf(id) !== -1){
        const newReportList = [...state.tagReportList[id], action.message];
        if(newReportList.length >= 50)newReportList.shift();

        return {
          ...state,
          tagReportList: {
            ...state.tagReportList,
            [id]: newReportList,
          },
        }
      } else {
        return {
          ...state,
          tagReportList: {
            ...state.tagReportList,
            [id]: [action.message]
          },
          tagIdList: Array.from(new Set([...state.tagIdList, id])).sort()
        }
      }
      break;
    case CLEAN_REPORT_LIST:
      const limit = 50;
      const tagReportListOfId = state.tagReportList[action.id];
      if(tagReportListOfId === undefined) return { ...state };

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
