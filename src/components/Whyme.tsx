import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'


function Whyme() {
    return (
        <div className="whyme">
            <div className="whyme_about">
                <div>
                    <div className='intro_main_element_div'>
                         <FontAwesomeIcon className='intro_icon' icon={faNoteSticky}/>
                   
                    </div>

                    <h1>TẠI SAO CHỌN CHÚNG TÔI LÀ GIÁO VIÊN CỦA BẠN</h1>

                    <h3 style={{textAlign: "center", fontWeight: "bold", margin: "3rem"}}>Một Chút Về Chúng Tôi</h3>
                    <div>
                        <p>
                            Chào mừng đến với trang web dạy guitar của chúng tôi! Chúng tôi tự hào là nơi cung cấp những khóa học chất lượng và đầy đủ nhất về guitar cho tất cả mọi người yêu thích âm nhạc và muốn trải nghiệm niềm đam mê chơi nhạc cụ độc đáo này.

                            Trang web của chúng tôi được thiết kế đặc biệt để phù hợp với cả những người mới bắt đầu và những người đã có kinh nghiệm chơi guitar. Không cần kiến thức hay kỹ năng đặc biệt, bạn có thể bắt đầu học guitar từ con số không với các bài học dễ hiểu và thú vị.

                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Whyme;