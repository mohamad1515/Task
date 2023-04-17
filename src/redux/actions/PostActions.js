import * as actions from '../constants/PostConstants';
import axios from 'axios';

export const fetchPosts = () => async (dispatch) => {
	dispatch({ type: actions.FETCH_POST_REQUEST });

	try {
		const data = await axios.get("http://localhost:8000/api/products");
		dispatch({ type: actions.FETCH_POST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: actions.FETCH_POST_FAILED, payload: error.message });
		console.log(error.message);
	}
};

export const fetchPostDetail = (id) => async (dispatch) => {
	dispatch({ type: actions.FETCH_POST_DETAIL_REQUEST });

	try {
		const data = await axios.get(`http://localhost:8000/api/products/${id}`);
		dispatch({ type: actions.FETCH_POST_DETAIL_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: actions.FETCH_POST_DETAIL_FAILED, payload: error.message });
		console.log(error.message);
	}
};

export const sortPostsAsc = () => (dispatch, getState) => {
	const { PostReducers } = getState();
	dispatch({ type: actions.SORT_POSTS_ASC, payload: PostReducers.posts });
};

export const sortPostsDesc = () => (dispatch, getState) => {
	const { PostReducers } = getState();
	dispatch({ type: actions.SORT_POSTS_DESC, payload: PostReducers.posts });
};

export const searchPosts = (query) => (dispatch, getState) => {
	console.log("search ", query);
	const { PostReducers } = getState();
	const searchResults = PostReducers.searchResults.filter((post) =>
		post.title.toLowerCase().includes(query.toLowerCase())
	);
	dispatch({ type: actions.SEARCH_POSTS, payload: searchResults });
};