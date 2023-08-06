import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faCompassDrafting, faBank, faPen} from '@fortawesome/free-solid-svg-icons'

const Introduction = () => {
  return (
    <Container className="my-4 intro">
      <div className='intro_main'>
          <div className='intro_main_element'>
            <div className='intro_main_element_div'>
              <FontAwesomeIcon className='intro_icon' icon={faPeopleGroup} />
            </div>
            <div className='intro_main_element_div'>
              <span>Học Cùng Nhau</span>

            </div>
            <p>Trong quá trình học bạn có thể nêu lên sự thắc mắc của mình qua những câu hỏi, ở dưới mỗi bài đều có phần comment để bạn có thể nêu lên thắc mắc và ý kiến của mình về khóa học</p>
          </div>
          <div className='intro_main_element'>
            <div className='intro_main_element_div'>
              <FontAwesomeIcon className='intro_icon' icon={faCompassDrafting} />
            </div>
            <div className='intro_main_element_div'>
              <span>Thực Hành Và Thực Hành</span>
            </div>
            <p>Sau mỗi bài học đều có quần câu hỏi để bạn ôn lại kiến thức vừa học, mỗi bài kiểm tra đều đi sâu vào và cho bạn hiểu hơn về bài học, giúp bạn thực hành tốt hơn</p>
          </div>
          <div className='intro_main_element'>
            <div className='intro_main_element_div'>
              <FontAwesomeIcon className='intro_icon' icon={faPen} />
            </div>
            <div className='intro_main_element_div'>
              <span>Học Mọi Lúc</span>
            </div>
            <p>Bạn có thể học mọi lúc và bất kì khi nào bạn muốn, sau khi bạn kết thúc việc học, tiến trình của bạn sẽ được lưu lại để dễ cho lần sau quay lại vẫn ở chổ cũ và dễ cho bạn học hơn</p>
          </div>
      </div>
    </Container>
  );
};

export default Introduction;
