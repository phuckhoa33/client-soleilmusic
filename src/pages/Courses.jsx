import React, { useEffect, useState } from "react";
import "../scss/learnings.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "../scss/courses.css";
import { getAllCourse } from "../api/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const cookies = new Cookies();

function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [tempCourses, setTempCourses] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourseData = async () => {
      const { data } = await getAllCourse();
      setCourses([...data.result]);
      setTempCourses([...data.result]);
    };

    fetchCourseData();
  }, []);
  
  const handleWithTag = (tag) => {
    if(tag===""){
      setTempCourses(courses);
      return;
    }
    const a = courses.filter(course => course.course_state==tag);
    setTempCourses(a);
  }

  const handleChangeSelectedOption = (e) =>  {
      const targetValue = e.target.value;
      setSelectedOption(targetValue)
      if(targetValue==="1"){
          setTempCourses(() => {
              return courses.slice().sort((a, b) => a.course_title.localeCompare(b.course_title))
          })
      }
      else if(targetValue==="2"){
          setTempCourses(() => {
              return courses.slice().sort((a, b) => b.course_title.localeCompare(a.course_title))
          })
      }
      else if (targetValue==="3") {
          setTempCourses(() => {
              return courses.slice().sort((a, b) => a.created_at - b.created_at)
          })
      }
      else {
          setTempCourses(courses);
      }
  }

  const handleKeyDownEnter = (e) => {
    if(e.key==="Enter"){
        handleSubmitSearchPhase();
    }
}

const handleSubmitSearchPhase = () => {
    setTempCourses(() => {
        return courses.filter(course => course.course_title.startsWith(search));
    })
}

  return (
    <div className="container-fluid px-0 bg-light">
      <div className="courses-container " style={{ flexWrap: "wrap" }}>
        <h1 className="course-heading-title py-5">Các khóa học</h1>

        <div className="row boder-bottom-solid mx-3">
          <div className="col-12 col-lg-12 col-xxl-4 d-flex align-items-center ">
            <div className="search-form position-relative w-100">
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control p-3 w-100"                  
                  aria-describedby="emailHelp"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={handleKeyDownEnter}
                />
              </div>
              <button onClick={handleSubmitSearchPhase} className="search-btn px-3">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          <div className=" col-12 col-lg-6 col-xxl-4 d-flex justify-content-center align-items-center subnab-bar">
            <ul style={{cursor: "pointer"}}>
              <li onClick={() => handleWithTag("")} className="subnav-course-items d-inline-block p-3">
                <a href=""></a>Tất cả
              </li>
              <li onClick={() => handleWithTag("public")} className="subnav-course-items  d-inline-block  p-3">
                <a href=""></a>Đã Đăng
              </li>
              <li onClick={() => handleWithTag("pending")} className="subnav-course-items d-inline-block p-3">
                <a href=""></a>Đang phát triển
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
        <div className="container courses-list-container py-5">
          <div className="row">
            {tempCourses?.length>0 ? (
              <>
                {tempCourses.map((course) => (
                  <div className="course col-12 col-sm-6 col-lg-4 d-flex justify-content-center mb-4">
                    <div className="card card-hover" style={{ width: "24rem",borderRadius :"none" }}>
                    <img
                        src={course.course_image}
                        className="card-img-top rounded-0"
                        style={{minHeight: "280px",maxHeight:"300px"}}
                        alt="..."
                      />
                      <div className="card-body">
                        <h6>Khóa học</h6>
                        <h2 className="course-title">
                          <a href="">{course.course_title}</a>
                        </h2>
                        
                      </div>
                      <button
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/course/${course.course_id}`)}
                        className="all-courses-btn py-3"
                      >
                        View all chapters{" "}
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ): (
              <h1>Không có khóa học như yêu cầu</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
