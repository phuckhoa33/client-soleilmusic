import { Button, Form, FormControl } from 'react-bootstrap';
import '../scss/home.scss';
import { useNavigate } from 'react-router-dom';
import Introduction from '../components/Introduction';
import Evaluate from '../components/Evaluate';
import Whyme from '../components/Whyme';
import Tutorial from '../components/Tutorials';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faBell, faPlay, faSearch } from '@fortawesome/free-solid-svg-icons';

import logo from '../assets/img/LOGOfinal.png';



export const Home = () => {
    const navigate = useNavigate();
    const [showButton, setShowButton] = useState(false);

    // Kiểm tra khi người dùng cuộn trang
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
  
    // Thêm/loại bỏ sự kiện scroll khi component được render
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    // Xử lý khi người dùng nhấn nút
    const handleBackToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    return (
        <div className='home'>
          <div className="header_banner">
            <div className='banner'>
                <div className="banner_aside">
                  <div>
                    <h1>BORN TO BE MUSICIAN</h1>

                  </div>
                  <div>
                    <p>Lửa đam mê thiêng liêng hồn trải dài. Vượt qua khó khăn, vươn tới đỉnh cao. Lửa đam mê thiêng liêng hồn trải dài. Vượt qua khó khăn, vươn tới đỉnh cao. </p>

                  </div>
                  <div>
                  <div className='banner_aside_btn'>

                    <button >
                      <div>
                        <FontAwesomeIcon icon={faPlay}/>

                      </div>
                      XEM NGAY
                    </button>
                  </div>

                  </div>
                </div>
            </div>

          </div>
          <div style={{height:"10vh"}}></div>
          <Introduction/>
          <Evaluate/>
          <Whyme/>
          <Tutorial/>
          <div className='last_banner'>
              <div>
                  <p>Lửa đam mê thiêng liêng hồn trải dài.</p>
                  <p>Vượt qua khó khăn, vươn tới đỉnh cao.</p>
                  <p>Hùng hoàng trong lòng khát khao mãnh liệt</p>
                  <p>Đắm say ngọt ngào, đam mê chẳng mời chào</p>
              </div>
          </div>

          {showButton && (
              <button
              className="btn_home"
              onClick={handleBackToTop}
              >
                  <FontAwesomeIcon icon={faArrowUp}/>
              </button>
          )}
        </div>
    )
}