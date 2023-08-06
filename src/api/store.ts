import axios from 'axios';
import Hls from 'hls.js';
const url = "https://soleilmusic-server-9a4ed1582524.herokuapp.com/";
// Authentication
export const login = async (formLogin: any) => await axios.post(`${url}auth/login`, formLogin);
export const register = async (formRegister: any) => await axios.post(`${url}auth/register`, formRegister);
export const signout = async () => await axios.post(`${url}auth/logout`);
export const send_code = async (form: any) => await axios.post(`${url}auth/send_code`, form);
export const reset_password = async(form: any) => await axios.patch(`${url}auth/reset_password`, form);

// Learning
export const enroll = async(formEnroll: any) => await axios.post(`${url}learning/enroll`, formEnroll);
export const getAllLearing = async(user_id: string) => await axios.get(`${url}learning/${user_id}`);
// Video streaming
export const streaming = async(m3u8Url: string, videoRef: any) => await axios.get(m3u8Url).then((response) => {
    const hls = new Hls();
    hls.loadSource(URL.createObjectURL(new Blob([response.data])));
    hls.attachMedia(videoRef.current);
  });
export const create_video_progress = async(newVideoProgress: any) => await axios.post(`${url}video/video_progress`, newVideoProgress);
export const get_video_progress = async(user_id: string, video_id: string, course_id: string) => await axios.get(`${url}video/video_progress/${user_id}${video_id}${course_id}`);
export const update_video_progress = async(newVideoProgress: any) => await axios.patch(`${url}video/video_progress`, newVideoProgress);
export const get_all_video_course = async(course_id: string) => await axios.get(`${url}video/videoCourse/${course_id}`);
export const getNewestVideoProgress = async(userId: string, courseId: string) => await axios.get(`${url}video/videoProgress/${userId}${courseId}`);
// User
export const get_user = async (code: string) => await axios.get(`${url}user?code=${code}`);
export const update_profile = async (form: any) => await axios.patch(`${url}user/profile`, form);

// Course
export const getAllCourse = async() => await axios.get(`${url}course`);
export const getCourse = async(course_id: string) => await axios.get(`${url}course/${course_id}`);