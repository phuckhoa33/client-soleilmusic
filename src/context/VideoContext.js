import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore/lite";
import {onSnapshot} from 'firebase/firestore';
import { createContext, useState } from "react";
import { db } from "../firebase-config";
import { create_video_progress, get_video_progress } from "../api/store";

export const VideoProgressContext = createContext();

export const VideoProgressProvider = ({children}) => {
    const [currentTime, setCurrentTime] = useState(0);


    const getVideoProgress = async (user_id, video_id, course_id) => {
        const {data} = await get_video_progress(user_id, video_id, course_id);
        return data.result;
    } 
    return (
        <VideoProgressContext.Provider value={{
            currentTime, 
            setCurrentTime,
            getVideoProgress
        }}>
            {children}
        </VideoProgressContext.Provider>
    )
}