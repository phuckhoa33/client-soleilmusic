import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import VideoPlayer from "../components/Video";
import "../scss/video.scss";
import "../scss/learning.css";
import { CommentProvider } from "../context/CommentContext";
import { Button, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import Quiz from "./Quiz";
import { VideoProgressProvider } from "../context/VideoContext";
import { getCourse, getNewestVideoProgress, get_all_video_course } from "../api/store";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faFlag, faQuestion } from "@fortawesome/free-solid-svg-icons";

export const Learning = () => {
  const { course_id, user_id } = useParams();
  const [submenu, setSubmenu] = useState(false);
  // State for video list
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState();
  const [course, setCourse] = useState({});
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [id, setId] = useState(0);
  const handleNavTabClick = (tab) => {
    if (tab === "points" || tab === "personalInfo") {
      setActiveTab(tab);
    } else if (video?.id !== videos[videos.length - 1]?.id) {
      toast.warn("Bạn phải hoàn thành xong bài học");
      return;
    } else {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    const fetchVideoCourse = async () => {
      try {
        const getAllVideoCourseProcess = await get_all_video_course(course_id);
        const getNewestVideoProgressWithUserIdAndCourseIdProcess =
          await getNewestVideoProgress(user_id, course_id);
        const getCourseIntoDataProcess = await getCourse(course_id);
        Promise.all([getAllVideoCourseProcess, getNewestVideoProgressWithUserIdAndCourseIdProcess, getCourseIntoDataProcess]);
        setVideos(getAllVideoCourseProcess.data.result);
        if(getNewestVideoProgressWithUserIdAndCourseIdProcess.data.result !== null || undefined){
          setVideo(getNewestVideoProgressWithUserIdAndCourseIdProcess.data.result);
        }
        else {
          setVideo(videos[0]);
        }
        setCourse(getCourseIntoDataProcess.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideoCourse();
  }, []);

  const handleWhenClickVideoList = (video_course_id, video_id) => {
    if (video_id > id) {
      toast.warn("Bạn phải hoàn thành xong bài học");
      return;
    }
    const chosenVideo = videos.find(
      (video) => video.video_course_id === video_course_id
    );
    console.log(chosenVideo);
    setVideo(chosenVideo);
  };

  const handleClickNextLesson = () => {
    const chosenVideo = videos.find((video) => video.id === id);
    console.log(chosenVideo);
    setVideo(chosenVideo);
  };

  return (
    <>
      <script src="//fast.wistia.net/assets/external/E-v1.js" async></script>
      <script src="js/video-list.js"></script>
      <div className="agent-video">
        <div className="row">
          <div className="colnomarg col-9 content">
            <div className="pages page1 active bg-light h-100 box-shadow-section">
              <div
                className="wistia_responsive_padding"
                style={{ padding: "56.25% 0 0 0", position: "relative" }}
              >
                <div
                  className="wistia_responsive_wrapper"
                  style={{
                    height: "100%",
                    left: 0,
                    position: "absolute",
                    top: 0,
                    width: "100%",
                  }}
                >
                  <div
                    className="wistia_embed wistia_async_j38ihh83m5 videoFoam=true"
                    style={{ height: "100%", width: "100%" }}
                  >
                    {activeTab === "personalInfo" && (
                      <div className="w-100 video-container">
                        
                        <VideoProgressProvider>
                          <VideoPlayer
                            user_id={user_id}
                            course_id={video?.course_id}
                            video_id={video?.video_course_id}
                            video_path={video?.video_path}
                            setId={setId}
                            handleWhenClickVideoList={handleClickNextLesson}
                            id={id}
                        
                          />
                        </VideoProgressProvider>

                        <div className="container content-container">
                        <h1 className="py-2" >{video?.video_title}</h1>
                        <p lassName="mb-5">{course?.course_desc}</p>
                        </div>
                      </div>
                    )}
                    {activeTab === "timeAnalysis" && (
                      <div>
                        <h2>Bài kiểm tra tiến độ</h2>
                        <Quiz />
                        {/* Time analysis content */}
                      </div>
                    )}
                    {activeTab === "points" && (
                      <div>
                        <h2>Câu hỏi </h2>
                        <CommentProvider>
                          <CommentSection
                            course_id
                            user_id={user_id}
                            active={activeTab}
                          />
                        </CommentProvider>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="gridrow">
                <div className="col span_2_of_3"></div>
              </div>
            </div>
          </div>

          <div className="colnomarg col-3 py-5 bg-light box-shadow-section position-relative">
            <div className="side-nav-container px-3">
            <div className="logo">
             <h3>Course Feature</h3>
            </div>
            <Nav className="flex-column">
              <Nav.Link
                className="links"
                active={activeTab === "personalInfo"}
                onClick={() => {
                  handleNavTabClick("personalInfo");
                }}
              >
                <div className="nav-item py-3" onClick={() => setSubmenu(() => !submenu)}>
                    <FontAwesomeIcon icon={faBookOpen }  className="pe-2"/>
                  Nội dung chính
                </div>
                {submenu && (
                  <div className="container mt-4">
                    <ul className="list-group">
                      {videos?.map((video) => (
                        <li
                          onClick={() => {
                            handleWhenClickVideoList(
                              video.video_course_id,
                              video.id
                            );
                          }}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          {video.video_title}
                        </li>
                      ))}
                      {/* Add more videos here */}
                    </ul>
                  </div>
                )}
              </Nav.Link>
              <Nav.Link
                className="links"
                active={activeTab === "timeAnalysis"}
                onClick={() => handleNavTabClick("timeAnalysis")}
                
              >
                <div className="nav-item py-3">
                    <FontAwesomeIcon icon={faFlag} className="pe-2"  />
                Bài kiểm tra tiến độ
                </div>
              </Nav.Link>
              <Nav.Link
                className="links"
                active={activeTab === "points"}
                onClick={() => handleNavTabClick("points")}
              >
                <div className="nav-item  py-3">
                <FontAwesomeIcon icon={faQuestion} className="pe-2"  />
                    Câu hỏi
                </div>
              </Nav.Link>
            </Nav>
            </div>

            <div className="next-course-container">
            <Button className="px-5 py-2 next-course-btn" onClick={handleClickNextLesson}>Bài tiếp theo</Button>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};
