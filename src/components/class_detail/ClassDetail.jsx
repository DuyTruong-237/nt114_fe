import React from "react";
import "./ClassDetail.css"

export default function ClassDetails(){
    return(
        <div className="ClassDetail_wrapper">
            <h1 className="ClassDetail_Header"><strong>Đồ án chuyên ngành - NT114.N21.MMCL</strong></h1>
            <div id="section-0" className="ClassDetail_Content" role="region">
                <ul className="List-content">
                    <li className="List-item">
                    <a class="Item-title" href="https://courses.uit.edu.vn/mod/forum/view.php?id=157905">
                        <img src="https://courses.uit.edu.vn/theme/image.php/classic/forum/1667485444/icon" 
                        class="activityicon" alt=""
                        />
                        Các thông báo
                    </a>
                    </li>
                </ul>              
            </div>
            <div id="section-1" className="ClassDetail_Content" role="region">
            <h3 className="Content-title">
                        Chủ đề 1
                    </h3>
                <ul className="List-content">
                    
                    <li className="List-item">
                        <a class="Item-title" href="https://courses.uit.edu.vn/mod/quiz/view.php?id=116233">
                        <img src="https://courses.uit.edu.vn/theme/image.php/classic/quiz/1667485444/icon"
                        class="iconlarge activityicon" alt=""/>
                        Bài kiểm tra đầu khóa
                        </a>
                    </li>
                    <li className="List-item">
                        <a class="Item-title" href="https://courses.uit.edu.vn/mod/assign/view.php?id=114608">
                        <img src="https://courses.uit.edu.vn/theme/image.php/classic/assign/1667485444/icon"
                        class="activityicon" alt=""/>
                        Nộp bài tập ôn tập chương 1
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        
    )
}