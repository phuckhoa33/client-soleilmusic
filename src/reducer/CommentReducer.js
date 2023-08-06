export default function CommentReducer(state, action) {
    switch(action.type){
        case "ADD_COMMENT":
            return [...state, action.payload];
        case "REMOVE_COMMENT":
            return state.filter((comment) => comment.comment_id !== action.payload)
        case "REPLY_COMMENT":
            return state.map((comment) => 
                comment.comment_id===action.payload.comment_id
                ? {...comment, replies: [...comment.replies, action.payload.reply]}
                : state
            )
        case "FETCH_ALL":
            return [
                ...action.payload
            ];
        default: 
            return state;
    }
}