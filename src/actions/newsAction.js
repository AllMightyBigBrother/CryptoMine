import {
  NEWS_DATA_FAILURE,
  NEWS_DATA_REQUEST,
  NEWS_DATA_SUCCESS,
} from "../constants/newsConstants";
import "dotenv/config";

import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

require("dotenv").config();

export const listNews = (topic, page, pageSize) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_DATA_REQUEST });
    const res1 = await axios.get(
      `https://newsapi.org/v2/everything?q=${topic}&pageSize=${pageSize}&page=${page}&apiKey=4ffa9a3dfc2a47eeb3af2fdd8bec3886`
    );
    const enews = res1.data;
    const res2 = await axios.get(
      `https://newsapi.org/v2/top-headlines?q=${topic}&pageSize=5&apiKey=4ffa9a3dfc2a47eeb3af2fdd8bec3886`
    );
    const tnews = res2.data;
    const data = { enews, tnews };

    dispatch({
      type: NEWS_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEWS_DATA_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
