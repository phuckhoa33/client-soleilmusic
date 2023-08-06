import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../scss/tab.css'
import { faWalkieTalkie } from '@fortawesome/free-solid-svg-icons';


function Evaluate() {
    return (
        <div className="evaluate container-fruid">
            <div className='intro_main_element_div'>
                <FontAwesomeIcon className='intro_icon' icon={faWalkieTalkie}/>
            
            </div>
            <h1>BỌN HỌ NÓI GÌ</h1>

            <div className="tabs">
                <div className="tab-2">
                    <label htmlFor="tab2-1">Người dạy</label>
                    <input id="tab2-1" name="tabs-two" type="radio" checked/>
                    <div  className="container my-5">
                        <div className="row">
                            <div className="col-md-4">
                                <img width={300} src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/363380219_990797645447587_4442113907831826497_n.jpg?_nc_cat=104&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=R8GYrpE2SOoAX8Ma2uW&_nc_ht=scontent.fsgn5-3.fna&oh=00_AfAh2WgccW_7OGXOAx4Zyya1e1se4KE2sBi5YZYslmXYvA&oe=64C67588" alt="" />
                                <div className='person'>
                                    <span>Nguyễn Trí Kỳ</span>
                                    <br />
                                    <span>Giảng viên của SoleilMusic</span>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <p>
                                Tôi rất vui được chia sẻ những cảm nhận của mình về khóa học guitar này từ vai trò là người tham gia giảng dạy.
                                Đây là một hành trình học tập đáng nhớ, và tôi không thể không tự hào về vai trò mình trong việc giúp đỡ và truyền cảm hứng cho các học viên.
                                </p>
                                <p>
                                Trong suốt khóa học, tôi đã tận dụng tối đa kiến thức và kinh nghiệm cá nhân của mình để tạo ra một môi trường học tập tích cực và đầy đam mê.
                                Tôi luôn luôn tận tâm trong việc giảng dạy và luôn khích lệ các học viên cùng nhau tiến bộ.
                                </p>
                                <p>
                                Việc dạy guitar không chỉ đơn thuần là truyền đạt kỹ thuật chơi nhạc cụ mà còn tạo điều kiện cho các học viên thể hiện cá tính và sự sáng tạo của riêng họ.
                                Tôi luôn khích lệ các học viên thể hiện bản thân qua âm nhạc và tìm ra phong cách chơi riêng biệt.
                                </p>
                                <p>
                                Tôi cũng rất tự hào về việc giúp các học viên vượt qua những khó khăn và thách thức trong việc học tập.
                                Sự kiên nhẫn và cống hiến của các học viên đã giúp họ tiến bộ nhanh chóng và tự tin hơn trong việc chơi guitar.
                                </p>
                                <p>
                                Ngoài việc giảng dạy, tôi cũng rất hạnh phúc khi thấy cộng đồng học tập trong khóa học ngày càng gắn kết và hỗ trợ nhau.
                                Những buổi thảo luận và chia sẻ kinh nghiệm chơi guitar đã tạo nên một môi trường học tập thân thiện và đáng yêu.
                                </p>
                                <p>
                                Tôi chân thành cảm ơn tất cả các học viên đã đồng hành cùng tôi trong hành trình này.
                                Sự đam mê và tình yêu dành cho âm nhạc đã kết nối chúng ta thành một gia đình âm nhạc đặc biệt.
                                </p>
                                <p>
                                Tôi hy vọng rằng khóa học guitar này sẽ tiếp tục mang đến nhiều niềm vui và thành tựu cho tất cả các học viên trong tương lai.
                                Còn gì tuyệt vời hơn khi nhìn thấy những người học cùng nhau tiến bộ và đam mê âm nhạc mãi mãi!
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-2">
                    <label htmlFor="tab2-2">Người dùng</label>
                    <input id="tab2-2" name="tabs-two" type="radio"/>
                    <div>
                    <div className="container my-5">
                        <div className="row">
                            <div className="col-md-4">
                                <img width={300} src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/344543446_226717463336135_6740002286322298107_n.jpg?_nc_cat=102&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=TczKlJPLvusAX-XgTM_&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfC6M9Tkgz2Kic0R_napLkiGP8-Wm2KBY0pdvEzIhAMWSQ&oe=64C6C238" alt="" />
                                <div className='person'>
                                    <span>Nguyễn Khoa Minh Phúc</span>
                                    <br />
                                    <span>Sinh viên tới 1 guitarist</span>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <p>
                                    Khóa học guitar này thực sự là một trải nghiệm tuyệt vời và tôi không thể không chia sẻ niềm vui và hài lòng của mình về khóa học này.
                                    Từ khi tham gia khóa học, tôi đã có cơ hội tiếp cận và trải nghiệm vô số điều mới mẻ trong việc chơi guitar.
                                </p>
                                <p>
                                    Người dạy trong khóa học là một người tận tâm và có kiến thức chuyên sâu về guitar. Họ tận tụy hướng dẫn từng bước chơi guitar một cách chi tiết và dễ hiểu.
                                    Nhờ sự hỗ trợ và khuyến khích từ người dạy, tôi đã tự tin hơn trong việc chơi guitar và dám thử sức với các bài hát khó khăn hơn.
                                </p>
                                <p>
                                    Các bài học trong khóa học được xây dựng một cách logic và có tính tiến bộ. Từ những kiến thức cơ bản, tôi đã được học và áp dụng các kỹ thuật chơi guitar phức tạp hơn.
                                    Việc học thông qua việc chơi các bài hát yêu thích cũng giúp tôi thấy thú vị và tiến bộ nhanh chóng.
                                </p>
                                <p>
                                    Tôi rất ấn tượng với cách người dạy tạo điều kiện cho tôi tự do thể hiện cá tính và sáng tạo trong việc chơi guitar.
                                    Điều này giúp tôi không chỉ trở thành người học chơi nhạc mà còn trở thành một nghệ sĩ thực thụ.
                                </p>
                                <p>
                                    Ngoài ra, môi trường học tập trong khóa học cũng rất thú vị và hỗ trợ. Tôi đã có cơ hội kết nối và trao đổi kinh nghiệm chơi guitar với các bạn học viên khác.
                                    Sự đồng cảm và chia sẻ trong cộng đồng học tập đã giúp tôi cảm thấy không cô đơn trong hành trình học tập.
                                </p>
                                <p>
                                    Tôi rất biết ơn và cảm kích sự nhiệt tình và tận tâm của người dạy. Khóa học guitar này đã mở ra những cánh cửa mới trong âm nhạc cho tôi và truyền cảm hứng mãi mãi.
                                    Tôi không thể nào tìm thấy một khóa học guitar tốt hơn và đáng giá hơn như vậy.
                                </p>

                            </div>

                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Evaluate;