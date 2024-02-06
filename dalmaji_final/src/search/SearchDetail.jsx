import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";


const StyledSearchDetailDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1.5fr 8fr 1.5fr;
    place-items: center center;
`;

const StyledDetailContentDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 5fr 3fr 1fr;
    & > div:first-child {
        border-bottom: 3px solid black;
    }
    & > div:first-child > h1 {
            margin-top: 50px;
            margin-left: 10px;
            margin-bottom: 10px;
            font-size: 40px;
        }
    & > div:nth-child(2){
        width: 100%;
        height: 100%;
        margin: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        & > div {
            width: 100%;
            height: 100%;
            & > .title{
                font-size: 33px;
            }
            & > div {
                margin-top: 15px;
                font-size: 24px;
            }
        }
        & > div > img{
            width: 350px;
            height: 500px;
        }

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
        & > button:first-child,
            button:nth-child(2) {
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

const StyledModalDiv = styled.div`
    z-index: 100;
    width: 500px;
    height: 400px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: white;
    box-shadow: 3px 3px 6px 2px rgba(169, 169, 169, 0.5);
    border-radius: 20px;
    display: grid;
    grid-template-rows: 1.5fr 1fr 1fr 1fr;
    place-items: center center;
    & > div:first-child {
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: #EFEFF1;
        padding-top: 40px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }
    & > div:nth-child(2) {
        font-size: 25px;
    }
    & > input {
        width: 200px;
        height: 40px;
        font-size: 25px;
        padding-left: 7px;
    }
    & > input:focus {
        background-color: #7b7b7b;
        color: white;
    }
    & > .modalButton {
        display: flex;
        gap: 5px;
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
        & > button:hover {
            background-color: #E72900;
        }
    }
`;

const SearchDetail = () => {
    console.log("SearchDetail render!!!");

    //url에서 bookNo 추출
    const selectedBookNo = useParams();

    // 사용할 변수 준비
    const [vo, setVo] = useState({});
    const [borrowVo, setBorrowVo] = useState([]);
    const [change, setChange] = useState('');
    // const [isAdmin, setIsAdmin] = useState
    
    //세션에 담긴 유저값 가져오기
    const jsonStr = sessionStorage.getItem("loginMemberVo");
    const sessionLoginMemberVo = JSON.parse(jsonStr);

    //어드민 정보 가져옥
    const admin = JSON.parse(sessionStorage.getItem("AdminLoginMemberVo"));
    const isAdmin = admin !== null; //  admin이 null이 아니면 관리자로 간주

    console.log('sessionLoginMemberVo1번::',sessionLoginMemberVo);

    const [mvo, setMvo] = useState([]);

    // bookNo 가져와서 상세정보 가져오기
    useEffect( () => {
        const loadBookDetailVo = () => {
            fetch(`http://127.0.0.1:8888/app/search/book/detail?bookNo=${selectedBookNo.bookNo}`,{
                    method: "GET",
                        headers: {
                            "Content-Type" : "application/json",
                        },
                })
            .then( resp => resp.json() )
            .then( (data) => {
                console.log('data:::', data);
                setVo(data.vo);
                setBorrowVo(data.borrowVo);
               
            })
            ;
        }
        loadBookDetailVo();
    }, [ change])

    // 모달창을 위한 준비
    const [modal, setModal] = useState(false);

    // 목록버튼 클릭시 돌아가기
    const navigate = useNavigate();
    const redirect = () => {
        navigate("/search/list");
    };
    
    //모달창 대출비번 확인용
    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setMvo({
            ...mvo,
            [name]: value,
        });
    }

    // 대출완료 버튼 클릭 핸들러

    const handleClickBorrow = (e) => {
        e.preventDefault();
        
        console.log('bookNo',selectedBookNo.bookNo)
        console.log('handleClickBorrow render~~~');
        console.log('mvo:::', mvo);
        
        if (sessionLoginMemberVo === null) {
            alert("회원만 대출이 가능합니다.");
            return;
        }
   
        // 서버에 대출완료를 요청하는 api 호출
        fetch(`http://127.0.0.1:8888/app/search/book/check`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...mvo,
                bookNo : selectedBookNo.bookNo,
                memberNo : sessionLoginMemberVo.memberNo,
            }), 
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log('api응답data',data);
            console.log('mvo.borrowPwd:: ' + mvo.borrowPwd);
            console.log('sessionLoginMemberVo.borrowPwd:: ' + sessionLoginMemberVo.borrowPwd);
                
            console.log('sessionLoginMemberVo.oNo:::',sessionLoginMemberVo.oNo);
            if(data.status === "good"){
                //대출 성공시 추가적인 로직
                console.log("대출 성공!!!");
                alert("대출 완료!");
            } else if(data.bookState !== "대출가능"){
                alert("대출중인 책이라 대출이 불가능 합니다.");
            }else if(sessionLoginMemberVo.oNo !== 1){
                alert("대출제한이 걸린 상태입니다.");
            }else{
                console.log("대출 실패...");
                alert("대출비밀번호가 일치하지 않습니다.")
            }
            setModal(false);
            if(sessionLoginMemberVo != null){
                setChange(change+'a');
            }
        })
        ;
    }   

    const edit = () => {
        navigate(`/admin/edit`, {
            state : {
                vo : vo,
            }
        })
    }
    const deleteBook = () => {
        if(vo.bookState === "대출중"){
            alert('현재 대출중인 도서입니다.');
            return;
        } else {
           fetch('http://127.0.0.1:8888/app/admin/delete',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(vo),
           })
           .then((resp) => resp.json())
           .then((data) =>{
                if(data.msg === "good"){
                    alert("삭제 완료")
                    navigate("/search/list");
                }
           })
        }
    }

    
    return (
        <StyledSearchDetailDiv>
            <div></div>
            <StyledDetailContentDiv>
                <div><h1>상세정보</h1></div>
                <div>
                    <div>
                        <img src={vo.bookImg} alt={vo.title} />
                    </div>
                    <div>
                        <div className='title'><strong>{vo.title}</strong></div>
                        <div><strong>작가: </strong> {vo.author}</div>
                        <div><strong>출판사: </strong> {vo.company}</div>
                        <div><strong>출판일: </strong> {vo.publisherYear}</div>
                    </div>
                </div>
                <StyledTableDiv>
                    <div>소장정보</div>
                    <table>
                        <thead>
                            <tr>
                                <th>NO.</th>
                                <th>소장위치</th>
                                <th>도서상태</th>
                                <th>반납예정일</th>
                            </tr> 
                        </thead>
                        <tbody> 
                            <tr>
                                <td>{vo.bookNo}</td>
                                <td>{vo.roomName}</td>
                                <td>{vo.bookState}</td>
                                {
                                    borrowVo === undefined
                                    ?
                                    <td></td>
                                    :
                                    <td>{borrowVo.dueDate}</td>
                                    
                                }
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        {!isAdmin && (
                            <>
                              <button onClick={ () => { setModal(!modal) } }><FontAwesomeIcon icon={faBook} /> 대출</button>
                            </>
                        )}
                        {isAdmin && (
                            <>
                                <button onClick={edit}>수정</button>
                                <button onClick={deleteBook}>삭제</button>
                            </>
                        )}       
                        {modal === true 
                            ? 
                            <StyledModalDiv>
                                        <div><h1>알림</h1></div>
                                        <div> <FontAwesomeIcon icon={faLock} /> 대출 비밀번호를 입력해주세요.</div>
                                        <input type="password" placeholder='password' name='borrowPwd' onChange={handleInputChange}/>
                                        <div className='modalButton'>
                                            <button onClick={handleClickBorrow}>완료</button>
                                            <button onClick={ () => {setModal(false)} }>취소</button>
                                        </div>
                            </StyledModalDiv> 
                            : 
                            null
                        }
                        <button className='redirect' onClick={redirect}><FontAwesomeIcon icon={faList} /> 목록으로</button>
                    </div>
                </StyledTableDiv>
                <div></div>
            </StyledDetailContentDiv>
            <div></div>
        </StyledSearchDetailDiv>
    );
};

export default SearchDetail;