import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBook } from "@fortawesome/free-solid-svg-icons";
// import { faLock } from "@fortawesome/free-solid-svg-icons";
// import { faList } from "@fortawesome/free-solid-svg-icons";
// import Modal from "react-modal";


const StyledAdminWriteDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1.5fr 8fr 1.5fr;
    place-items: center center;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

`;

const StyledWriteContentDiv = styled.div`
    width: 90%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 5fr 3fr 1fr;
    /* background-color: #aaee9d;//지워 */
    & > div:first-child {
        border-bottom: 5px solid #2f2f49;
        /* background-color: #52624e;//지워 */
    }
    & > div:first-child > h1 {
            margin-top: 50px;
            margin-left: 10px;
            margin-bottom: 10px;
            font-size: 40px;
            /* background-color: #8787bc; //지워 */
        }
    & > form > div{
        width: 100%;
        height: 100%;
        margin: 50px;
        display: flex;
        /* justify-content: space-between; */
        align-items: center;
        /* background-color: #8787bc; //지워 */
        & > div {
            width: 500px;
            height: 100%;
            display: flex;
            flex-direction: column;
            /* align-items: center; */
            align-items: flex-end;
            & > .title{
                /* background-color: #dd9999; */
                font-size: 33px;
            }   
            & > div {
                /* margin-right: 30%; */
                margin-top: 10%;
                font-size: 24px;
                & > input{
                    border-radius: 5px;
                    border: 1px solid black;
                }
            
            }
            
        }
        

        & > div:nth-child(1){
            width: 350px;
            height: 500px;
            /* margin-right: 20%; */
            margin-bottom: 120px;
            background-color: #bbbbbb;
            
        }
        
    }
    & > form > div > div > .inptContentDiv {
        margin-left: 4%;
    }
    & > form > div > div > .cate {
        /* margin-left: 0%; */
        /* background-color: red; */

    }    
    & > form > div > div > .btnImg1{
        margin-top: 5%;
        border-radius: 10px;
        margin-right: 20%;
        background-color: #2f2f49;
        border: none;
        color: white;
    }
`;

const StyledTableDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > div:first-child {
        width: 100%;
        height: 50px;
        padding: 10px;
        font-size: 27px;
        background-color: #D9F1FF;

    }
    & > table {
        text-align: center;
        margin-top: 20px;
        width: 100%;
        height: 30%;
        & > thead {
            background-color: #EFEFF1;
            & > tr {
            width: 100%;
            height: 50px;
            }   
        }
        & > tbody > tr {
            width: 100%;
            height: 30px;
        }
    }
    &> div:nth-child(3) {
        display: flex;
        gap: 15px;
        & > button:first-child {
            width: 110px;
            height: 35px;
            font-size: 18px;
            margin-top: 30px;
            background-color: #275FBC;
            border: none;
            border-radius: 7px;
            color: white;
            cursor: pointer;
        }
        & > .redirect {
            width: 110px;
            height: 35px;
            font-size: 18px;
            margin-top: 30px;
            background-color: #666666;
            border: none;
            border-radius: 7px;
            color: white;
            cursor: pointer;
        }
        & > button:hover{
            filter: brightness(150%);
        }

    }
`;



const SearchAdminWrite = () => {
    const [title, setTitle] = useState();
    const [fileObj,setFileObj] = useState();
    const [bookNo, setBookNo] = useState();
    const [author, setAuthor] = useState();
    const [company, setCompany] = useState();
    const [publisherYear, setPublisherYear] = useState();
    const [inputBookVo, setInputBookVo] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);


    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeFile = (e) => {
        setFileObj(e.target.files[0]);
    };
    
    const navigate = useNavigate();

    const fd = new FormData();
    fd.append("title", title);
    fd.append("f", fileObj);
    fd.append("bookNo", inputBookVo.bookNo);
    fd.append("author", inputBookVo.author);
    fd.append("company", inputBookVo.company);
    fd.append("bookCateNo", inputBookVo.bookCateNo);
    fd.append("bookRoomNo", inputBookVo.bookRoomNo);
    fd.append("publisherYear", inputBookVo.publisherYear);
    
      

    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch(`http://127.0.0.1:8888/app/admin/write`, {
            method: "POST",
            body: fd,
            })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.msg === "good") {
                    alert("도서 목록 작성 성공 !");
                    navigate("/search/list");
                } else {
                    alert("게시글 작성 실패 ...");
                }
            });
    };
    
    
    const handleChangeInput = (event) => {
        const { name, value } = event.target;
    
        setInputBookVo({
            ...inputBookVo,
            [name]: value,
        });
    };
    
    return (
        <StyledAdminWriteDiv>
            <div></div>
            <StyledWriteContentDiv>
                <div><h1>작성하기</h1></div>
                <form onSubmit={handleSubmit}>
                    <div >
                        <div>
                            <input type="file" multiple name='f' onChange={handleChangeFile}/>
                            {/* {selectedFile && (
                                <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="File Preview"
                                    style={{ width: '100px', height: '100px' }}
                                />
                            )} */}
                        </div>
                        <div className='inputContent'>
                            <div className='inptContentDiv'>
                                <strong>제목: </strong>
                                <input type="text" name='title' onChange={handleChangeTitle}/>
                            </div>
                            <div className='inptContentDiv'>
                                <strong>작가: </strong>
                                <input type="text" name='author' onChange={handleChangeInput} />
                            </div>
                             <div className='cate'>
                                <strong>카테고리: </strong>
                                <input type="text" name='bookCateNo' onChange={handleChangeInput} />
                            </div>
                            <div>
                                <strong>자료실: </strong>
                                <input type="text" name='bookRoomNo' onChange={handleChangeInput} />
                            </div>
                            <div>
                                <strong>출판사: </strong>
                                <input type="text" name='company' onChange={handleChangeInput}/>
                            </div>
                            <div>
                                <strong>출판일: </strong>
                                <input type="text" name="publisherYear" onChange={handleChangeInput}/>
                            </div>
                            <input type="submit" value="완료" className='btnImg1' />
                        </div>
                    </div>
                </form>
               
                <div></div>
            </StyledWriteContentDiv>
            <div></div>
        </StyledAdminWriteDiv>
    );
};

export default SearchAdminWrite;