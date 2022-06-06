import {
    NEWS_DATA_FAILURE,
    NEWS_DATA_REQUEST,
    NEWS_DATA_SUCCESS,
} from "../constants/newsConstants";

export const newsReducer = (state = { news: [] }, action) => {
    switch (action.type) {
        case NEWS_DATA_REQUEST:
            return { loading: true, news: [] };

        case NEWS_DATA_SUCCESS:
            return {
                loading: false,
                news: action.payload,
            };

        case NEWS_DATA_FAILURE:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};