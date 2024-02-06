import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledNoticeWriteDiv = styled.div`
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
                width: 1000px;
                height: 10%;
                display: flex;
                align-items: center;
                margin: auto;
                margin-top: 3%;
                margin-bottom: 2%;
                justify-content: center;
                font-size:24px;
                font-weight: bolder;
                /* border-bottom: 2px solid black; */
                /* background-color: greenyellow; */

                & > h1 {
                    font-family: 'Pretendard';
                    font-weight: 700;
                    font-size: 150%;
                }
            }


            & > form {
                width: 60%;
                height: 88%;
                margin: auto;
                margin-bottom: 80px;
                border: 2px solid black;
                /* background-color: beige; */

                & > .title {    
                    width: 100%;
                    height: 10%;
                    display: flex;
                    justify-content: center;
                    margin: auto;
                    margin-top: 20px;
                    /* background-color: greenyellow; */

                    & > .title01 {
                        width: 60%;
                        height: 60px;
                        display: flex;
                        justify-content: space-evenly;
                        align-items: center;
                        margin: auto;
                        /* background-color: red; */

                        & > input {
                            width: 100%;
                            height: 100%;
                        }
                    }

                }

                    & > .none2 {
                    height: 4%;
                    /* background-color: yellow; */
                    }

                    & > .content{
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
                        margin-left:38%;
                        /* margin: auto; */
                        /* background-color: yellow; */

                        & > ul {
                            display: flex;
                            justify-content: space-between;
                            margin: auto;
                            list-style: none;

                            & > li > .u {
                                width: 90px;
                                height: 40px;
                                border-radius: 10%;
                                background-color: black;
                                color: white;
                                font-family: 'Pretendard';
                                font-weight: 700;
                                font-size: 16px;
                            }

                            & > li > a >.c {
                                width: 90px;
                                height: 40px;
                                border-radius: 10%;
                                background-color: white;
                                font-family: 'Pretendard';
                                font-weight: 700;
                                font-size: 16px;
                            }
                        }
                    }

                
    
            }

        }

        
`;

const AdminNoticeWrite = () => {

    const str = sessionStorage.getItem("adminNoticeVo");
    const vo = JSON.parse(str);
    // const adminNo = vo.no;

    const [inputAdminNoticeVo, setInputAdminNoticeVo] = useState({
        // "adminNo": adminNo,
        "title": "",
        "content": "",
    });
    
    const navigate = useNavigate();

    const handleSubmit = (event)=>{
        event.preventDefault();


        fetch("http://127.0.0.1:8888/app/admin/notice/write", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(inputAdminNoticeVo),
        })

        .then( (resp) => resp.json() )
        .then( (data) => {
            if(data.msg === "good"){    //data확인했는데 성공이라고 써있음
                alert("게시글 작성 성공!")
                navigate("/admin/notice/list");    //성공했으니까 url 경로를 다시 list로 바꾸기
            }else{
                alert("게시글 작성 실패..");
            }

        } )
        ;
    }

    const handleChangeInput = (event) => {
        const { name, value } = event.target;
    
        setInputAdminNoticeVo({
            ...inputAdminNoticeVo,
            [name]: value,
        });
    }
    
    return (
        <StyledNoticeWriteDiv>
            <div className='notice_wrap'>
                <div className='notice'><h1>공지사항</h1></div>
                <div className='none1'></div>
                <form onSubmit={handleSubmit}>
                    <div className="title">
                        <div className='title01'>
                            <input type="text" id='title' name='title' placeholder='제목 입력' onChange={handleChangeInput} />
                        </div>
                    </div>
                    <div className='none2'></div>
                    <div className="content">
                        <textarea name="content" id="content" cols="120" rows="30" placeholder=' 내용을 입력하세요' onChange={handleChangeInput}></textarea>
                    </div>
                    <div className="update">
                        <ul>
                            <li id="update_detail"><input type="submit" value="등록" className='u' /></li>
                            <li id="update_detail"><a href=""><input type="submit" value="취소" className='c'/></a></li>
                        </ul>
                    </div>
                </form>
            </div>
        </StyledNoticeWriteDiv>
    );
};

export default AdminNoticeWrite;