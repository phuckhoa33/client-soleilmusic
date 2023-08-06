import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite";
import { createContext, useEffect, useReducer, useState } from "react";
import { db } from "../firebase-config";
import CommentReducer from "../reducer/CommentReducer";

export const CommentContext = createContext();
const commentsCollectionRef = collection(db, 'comment');

export const CommentProvider = ({children}) => {
    const [comments, dispatch] = useReducer(CommentReducer, []);
    const [replyer, setReplyer] = useState({
        name_account: "",
        comment_id: ""
    });

    const addComment = async(newComment) => {
        dispatch({type: "ADD_COMMENT", payload: newComment})
        await addDoc(commentsCollectionRef, newComment);
    }

    const fetchData = async() => {
        const data = await getDocs(commentsCollectionRef);
        const commentsData = data.docs.map((doc) => ({...doc.data()}));
        dispatch({type: "FETCH_ALL", payload: commentsData});
        
    }

    const deleteComment = async(id) => {
        dispatch({type: "REMOVE_COMMENT", payload: id})
        const q = query(collection(db, "comment"), where("comment_id", "==", id));

        // Lấy danh sách các documents thỏa mãn điều kiện
        const querySnapshot = await getDocs(q);

        // Lặp qua từng document và xóa
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    }

    const replyComment = async({comment_id, reply}) => {
        const payload = {comment_id, reply};
        const comment = comments.find(comment => comment.comment_id===comment_id);
        comment.replies.push(reply);
        dispatch({type: "REPLY_COMMENT", payload});
        await setDoc(doc(commentsCollectionRef, ))
    }

    const handleReplyer = (setComment, comment) => {
        if(!comment.includes("@")){
            setComment("");
            const extra_information = replyer.name_account===""?"":`@${replyer.name_account}`;
            setComment(`${extra_information}${comment} `);
        }
    }

    return (
        <CommentContext.Provider value={{
            comments,
            replyer,
            addComment,
            deleteComment,
            fetchData,
            replyComment,
            setReplyer,
            handleReplyer
        }}>
            {children}
        </CommentContext.Provider>
    )
}