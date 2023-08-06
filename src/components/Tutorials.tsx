import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Courses from "../pages/Courses";

function Tutorial() {
    return (
        <div className="tutorial">
            <div>
                <div className='intro_main_element_div'>
                    <FontAwesomeIcon className='intro_icon' icon={faBook}/>
                
                </div>
                <div>
                    <h1>Một số khóa học mà bạn có thể tham khảo</h1>
                    <div style={{margin: "5rem 0"}}></div>
                    <Courses/>
                </div>

            </div>
        </div>
    )
}

export default Tutorial;