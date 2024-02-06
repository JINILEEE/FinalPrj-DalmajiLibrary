import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledNoticeDetailDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center center;

    & > div {
        width: 100%;
        height: 100%;
        margin: auto;
    }

        & > .notice_wrap {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            /* background-color:antiquewhite; */

            & > .notice {
                width: 50%;
                height: 10%;
                display: flex;
                align-items: center;
                margin: auto;
                margin-top: 3%;
                margin-bottom: 2%;
                justify-content: center;
                font-size:30px;
                font-weight: bolder;
                /* border-bottom: 1px solid black; */
                /* background-color: greenyellow; */
            }

            & > .form1 {
                width: 60%;
                height: 80%;
                margin: auto;
                margin-bottom: 80px;
                border: 2px solid black;
                /* background-color: beige; */

                    & > .title1 {    
                        width: 80%;
                        height: 10%;
                        display: flex;
                        justify-content: center;
                        margin: auto;
                        margin-top: 40px;
                        /* background-color: greenyellow; */

                            & > input {
                                width: 100%;
                                height: 100%;
                            }
                    }

                    & > .none2 {
                    height: 4%;
                    /* background-color: yellow; */
                    }

                    & > .content1{
                        height: 70%;
                        width: 85%;
                        margin: auto;
                        /* border: 1px solid gray; */
                        justify-content: center;

                        & > textarea {
                            height: 100%;
                            width: 100%;
                        }
                    } 

                    & > .update {
                        width: 20%;
                        height: 40px;
                        margin-top: 40px;
                        margin-left:45%;
                        /* margin: auto; */
                        /* background-color: yellow; */

                        & > .edit {
                            width: 90px;
                            height: 40px;
                            border-radius: 10%;
                            background-color: black;
                            color: white;
                            font-family: 'Pretendard';
                            font-weight: 700;
                            font-size: 16px;
                        }
                    }

                }

            

            & > .form2 {
                width: 50%;
                height: 80%;
                display: inline;
                margin: auto;
                margin-bottom: 50%;
                /* border: 2px solid black; */
                /* background-color: beige; */

                        & > .input_btn {
                            width: 10%;
                            display: flex;
                            justify-content: space-between;
                            margin-left: 87%;
                            margin-bottom: 2%;
                            /* background-color: brown; */

                            & > input {
                                border: none;
                                background-color: white;
                            }

                            & > input:hover {
                                color: lightblue;
                            }
                        }

                    & > .dropdown_head {    
                        width: 90%;
                        height: 10%;
                        display: flex;
                        margin-bottom: 30px;
                        margin-left: 70px;
                        border: 1px solid black;
                        /* background-color: greenyellow; */

                        & > .date {
                            width: 25%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            /* margin-left: 10%; */
                            font-size: 15px;
                            background-color: lightgray;
                            }
            
                        & > .notice_title{
                            width: 75%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            /* margin-left: 10%; */
                            /* margin-top: 20px; */
                            /* background-color: aqua; */
                            }
                    }


                    & > .dropdown_content{
                        width: 100%;
                        height: 500px;
                        margin-left: 24px;
                        margin-bottom: 15px;
                        border-bottom: 1.5px solid;
                        /* background-color: red; */
                    
                            & > .content{
                                height: 90%;
                                width: 90%;
                                display: flex;
                                justify-content: center;
                                margin-bottom: 80px;
                                margin-left: 50px;
                                border: 1px solid black;
                                /* background-color: lightgray; */
                            }
                    }   
                    
                    & > .list {
                        height: 50px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 30px;
                        /* background-color: yellowgreen; */

                        & >  a {
                            height: 65%;
                            width: 10%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            text-align: center;
                            border : 1px solid lightgray;
                            border-radius: 10px;
                        }

                        & > a:hover {
                                color: skyblue;
                            }
                    }


                    
                }       

                
    
            }

`;


const AdminNoticeDetail = () => {
    console.log("AdminNoticeDetail 렌더링 중");

    // url에서 noticeNo 추출
    const { no } = useParams();
    const navigate = useNavigate();

    // 사용할 변수 준비
    const [vo, setVo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({ title: '', content: '' });

    useEffect(() => {
        const loadNoticeDetailVo = () => {
            fetch(`http://127.0.0.1:8888/app/admin/notice/detail?no=${no}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log('data:::', data);
                    setVo(data);
                    setUpdatedData(data); // 수정할 데이터로 초기화
                })
                .catch((error) => {
                    console.error('Error fetching notice detail:', error);
                    setVo({}); // 데이터 로딩 실패 시 상태 초기화
                });
        };
        loadNoticeDetailVo();
    }, [no]);

    // 삭제 버튼 클릭 시 이벤트 핸들러
    const handleDeleteClick = () => {

        console.log('vo:::', vo);
        // 삭제 로직 구현
        fetch(`http://127.0.0.1:8888/app/admin/notice/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(vo),
        })
        .then((resp) => resp.json())
        .then((data) => {
            if(data.msg === "good") {
                console.log('data:::', data);
                alert("삭제 완료")
                navigate("/admin/noitce/list");
            }else {
                alert("삭제 실패")
            }
            // 서버로부터의 응답에 따른 처리
            console.log('Delete response:', data);

            // 삭제 후 목록 페이지로 이동
            navigate('/admin/notice/list');
        })
        .catch((error) => {
            console.error('Delete error:', error);
            // 에러 처리 로직을 여기에 추가할 수 있습니다.
        });
    };

    // 수정 버튼 클릭 시 이벤트 핸들러
    const handleEditClick = () => {
        setIsEditing(true); // 수정 모드로 변경
    };

    const handleEditSubmit = (event) => {
        event.preventDefault(); // 폼의 기본 동작 방지

        // 수정할 내용을 서버에 제출하는 로직 구현
        // 예를 들어, fetch를 사용하여 서버로 데이터를 보낼 수 있습니다.

        fetch(`http://127.0.0.1:8888/app/admin/notice/edit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData), // 수정된 데이터를 서버에 보냅니다.
        })
        .then((resp) => resp.json())
        .then((data) => {
            if (data.msg === "good") {
                console.log('data:::', data);
                alert("수정 완료");
                navigate("/admin/notice/list");
            } else {
                alert("수정 실패");
            }
            // 서버로부터의 응답에 따른 처리
            console.log('Update response:', data);
        });
    };

        // input 요소의 값이 변경될 때마다 해당 값을 상태에 업데이트
        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setUpdatedData({ ...updatedData, [name]: value });
        };


    return (
        <StyledNoticeDetailDiv>
            <div className='notice_wrap'>
            <div className='notice'>공지사항</div>
                {isEditing ? (
                    <form onSubmit={handleEditSubmit} className='form1'>
                        <input 
                                type="text" 
                                id='title' 
                                name='title' 
                                className='title1'
                                value={updatedData.title} 
                                onChange={handleInputChange} // 값 변경 시 상태 업데이트
                            />
                    <div className='none2'></div>
                    <div className="content1">
                            <textarea 
                                name="content" 
                                id="content" 
                                cols="120" 
                                rows="30" 
                                value={updatedData.content} 
                                onChange={handleInputChange} // 값 변경 시 상태 업데이트
                            ></textarea>
                        </div>
                        <div className='update'>
                            <input type="submit" value="수정" className='edit'/>
                        </div>
                    </form>
                ) : (
                <form className='form2'>
                    <div className='input_btn'>
                        <input type="button" value='수정' onClick={handleEditClick} />
                        <input type="button" value='삭제' onClick={handleDeleteClick} />
                    </div>
                    <div className="dropdown_head">
                        <div className="date">Date : {vo.enrollDate}</div>
                        <div className="notice_title">Title : {vo.title}</div>
                    </div>
                    <div className='none'></div>
                    <div className='dropdown_content'>
                        <div className="content">{vo.content}</div>
                    </div>
                    <div className='list'><a href='http://localhost:3000/admin/notice/list'>목록보기</a></div>
                </form>
                )}
            </div>
        </StyledNoticeDetailDiv>
    );
};

export default AdminNoticeDetail;