

import { useNavigate, useParams } from 'react-router-dom';
import '../scss/learnings.css'
import { useEffect, useState } from 'react';
import { getAllLearing, getCourse } from '../api/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'react-bootstrap';

export const Learnings = () => {
    const navigate = useNavigate();
    const {code} = useParams();
    const [learnings, setLearnings] = useState([]);
    const [tempLearnings, setTempLearnings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async() => {
            const {data} = await getAllLearing(code);
            setLearnings(data.learnings);
            setTempLearnings(data.learnings);
        };

        fetchData();

        
    }, [])

    const handleSwitchTag = (tag) => {
        setLoading(true);
        if(tag==="complete"){
            setTempLearnings(() => {
                return learnings.filter((learning) => learning.progress===100);
            })
        }
        else if (tag==="learning"){
            setTempLearnings(() => {
                return learnings.filter((learning) => learning.progress<100);
            })
        }
        else {
            setTempLearnings(learnings);
        }
        setLoading(false);
    }

    const handleChangeSelectedOption = (e) =>  {
        const targetValue = e.target.value;
        setSelectedOption(targetValue)
        if(targetValue==="1"){
            setTempLearnings(() => {
                return learnings.slice().sort((a, b) => a.learning_title.localeCompare(b.learning_title))
            })
        }
        else if(targetValue==="2"){
            setTempLearnings(() => {
                return learnings.slice().sort((a, b) => b.learning_title.localeCompare(a.learning_title))
            })
        }
        else if (targetValue==="3") {
            setTempLearnings(() => {
                return learnings.slice().sort((a, b) => a.created_at - b.created_at)
            })
        }
        else {
            setTempLearnings(learnings);
        }
    }

    const handleKeyDownEnter = (e) => {
        if(e.key==="Enter"){
            handleSubmitSearchPhase();
        }
    }

    const handleSubmitSearchPhase = () => {
        setTempLearnings(() => {
            return learnings.filter(learning => learning.learning_title.startsWith(search));
        })
    }

    return (
    <>
        <div className="container-fluid px-0 bg-light">
            <div className="courses-container " style={{ flexWrap: "wrap" }}>
                <h1 className="course-heading-title py-5">Các khóa đang học</h1>

                <div className="row boder-bottom-solid mx-3">
                <div className="col-12 col-lg-12 col-xxl-4 d-flex align-items-center ">
                    <div className="search-form position-relative w-100">
                    <div class="mb-3">
                        <input
                        type="text"
                        class="form-control p-3 w-100"                  
                        aria-describedby="emailHelp"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDownEnter}
                        />
                    </div>
                    <button onClick={handleChangeSelectedOption} className="search-btn px-3">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    </div>
                </div>
                <div className=" col-12 col-lg-6 col-xxl-4 d-flex justify-content-center align-items-center subnab-bar">
                    <ul style={{cursor: "pointer"}}>
                    <li onClick={() => handleSwitchTag("")} className="subnav-course-items d-inline-block p-3">
                        <a href=""></a>Tất cả
                    </li>
                    <li onClick={() => handleSwitchTag("learning")} className="subnav-course-items  d-inline-block  p-3">
                        <a href=""></a>Đang học
                    </li>
                    <li onClick={() => handleSwitchTag("complete")} className="subnav-course-items d-inline-block p-3">
                        <a href=""></a>Hoàn thành
                    </li>
                    </ul>
                </div>
                <div className="col-12 col-lg-6 col-xxl-4 d-flex justify-content-center align-items-center ">
                    <select
                        class="form-select p-3 float-end w-50"
                        aria-label="Default select example"
                        value={selectedOption}
                        onChange={handleChangeSelectedOption}
                    >
                        <option value="">Sắp xếp theo</option>
                        <option value="1">A-Z</option>
                        <option value="2">Z-A</option>
                        <option value="3">Ngày đăng</option>
                    </select>
                </div>
                </div>
                <div className="container courses-list-container py-5 ">
                <div className="row ">
                    {loading ? (
                        <Spinner/>
                    ): (
                        <>
                            {tempLearnings?.length>0? (
                                <>
                                    {tempLearnings.map(learning => (
                                        <div className="learnings course col-12 col-sm-6 col-lg-4 d-flex justify-content-center mb-4 card card-hover ">
                                            <div
                                    className="card card-hover"
                                    style={{ width: "24rem", borderRadius: "none" }}
                                >
                                    <div className="card-body" style={{maxWidth: "350px"}}>
                                    <h6>Khóa học</h6>
                                    <h2 className="course-title">
                                        <a href="">{learning.learning_title}</a>
                                    </h2>
                
                                    <span className="progress-text">
                                        {learning.progress}/9 Bài kiểm tra
                                    </span>
                                    <h6>Bài số {learning.lessonNumber}</h6>
                                    <h2>{learning.currentLesson}</h2>
                                    </div>
                                    <button
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate(`/learning/${learning.course_id}/${code}`)}
                                    className="all-courses-btn py-3"
                                    >
                                    Tiếp tục{" "}
                                    </button>
                                </div>
                                            
                
                                            
                                        </div>
                
                                    ))}
                                </>
                            ): (
                                <h1>Không có khóa học như yêu cầu</h1>
                            )}
                        </>

                    )}
                </div>
                </div>
            </div>
        </div>
    </>
    )
}