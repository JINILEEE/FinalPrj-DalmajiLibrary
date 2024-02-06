import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledAdminBorrowListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 0.3fr 1.5fr 1fr 8fr 2fr 1.5fr;
    place-items: center center;
    & > div {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center center;
    }
    & > div > h1 {
        color: #217DFF;
    }
    & > div > table {
        text-align: center;
        width: 85%;
        height: 100%;
        margin: 0;
        padding: 0;
        border-collapse: collapse;
        & > thead > tr {
            width: 100%;
            height: 50px;
        }
        & > thead > tr > th {
            margin: 0;
            padding: 0;
            background-color: #20407B;
            color: white;
            border: 2px solid white;
        }
        & > tbody > tr > td {
            margin: 0;
            padding: 0;
            background-color: #D9F1FF;
            border: 2px solid white;
        }
    }

    .restriction{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    .pagination {
        display: flex;
        justify-content: center;
        margin-top: 20px;

        & > button {
            border: none;
            border-radius: 20px;
            margin: 0 5px;
            padding: 5px 10px;
            cursor: pointer;
        }
    }
`;

const AdminMyPage = () => {
    console.log("AdminMyPage render ~~~");
    const [adminBorrowVoList, setAdminBorrowVoList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태 추가
    const [totalPages, setTotalPages] = useState(1);    // 전체 페이지 수 상태 추가
    
    const [change, setChange] = useState(true);  // 이 변수를 이용해 랜더링 새로 해야할 때 사용하려고 만든것
    const [optionList, setOptionList] = useState([]);
    
    // 제한사항 옵션용
    const loadOptionList = () => {
        fetch("http://127.0.0.1:8888/app/admin/borrow/option")
        .then(resp => resp.json())
        .then((data) => {
            console.log('optionList', data.optionList);
            setOptionList(data.optionList);
        })
        ;
    }
        
    useEffect(() =>{
        console.log('useEffect called....', optionList);
        loadOptionList(optionList.oNo);
    },[optionList.oNo])
    
    //fetch 이용해 데이터 준비 (페이지 처리)
    const loadAdminBorrowVoList = (page) => {
        
        // URL 문자열 안에 변수를 넣을 때는 백틱(``)을 사용하고, 변수는 ${}로 감싸줌
        fetch(`http://127.0.0.1:8888/app/admin/borrow/list?currentPage=${page}`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
            },
        })
        .then( resp => resp.json() )
        .then( (data) => {
            console.log('voList' , data.voList);
            setAdminBorrowVoList(data.voList); //데이터 저장
            setTotalPages(data.pvo.maxPage); //총 페이지 수 저장
            console.log('data' , data);
        } )
        ;
    }
    
    //페이지 번호를 클릭하면 해당 페이지의 목록을 불러오는 함수
    const handlerClickPageNum = (page) => {
        console.log(`page = ${page}`);
        setCurrentPage(page);  //페이지 변경 요청 수행
    }
    
    useEffect( () => {
        loadAdminBorrowVoList(currentPage); //현재 페이지의 목록 불러오기
    }, [currentPage, change] );
        
    //제한사항 변경할 경우    
    const updateRestriction = (memberNo, oNo) => { 

        const option = {
            memberNo,
            oNo,
        }

        fetch("http://127.0.0.1:8888/app/admin/borrow/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(option)
        })
        .then(response => response.json())
        .then(data => {
            console.log('msg', data.msg);
            setChange(!change);
        });
    }

    
    return (
        <StyledAdminBorrowListDiv>
            <div></div>
            <div></div>
            <div><h1>유저 대출/반납 기록</h1></div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>도서번호</th>
                            <th>책 제목</th>
                            <th>저자</th>
                            <th>출판사</th>
                            <th>사용자 번호</th>
                            <th>사용자 이름</th>
                            <th>대출일</th>
                            <th>반납일</th>
                            <th>연체횟수</th>
                            <th>상태</th>
                            <th>제한사항</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            adminBorrowVoList && adminBorrowVoList.length === 0
                            ?
                            (<tr>
                                <td colSpan="12">로딩중...</td>
                            </tr>)
                            :
                            adminBorrowVoList && adminBorrowVoList.map( adminBorrowVo => <tr key={adminBorrowVoList.borrowNo}>
                                <td>{adminBorrowVo.borrowNo}</td>
                                <td>{adminBorrowVo.bookNo}</td>
                                <td>{adminBorrowVo.title}</td>
                                <td>{adminBorrowVo.author}</td>
                                <td>{adminBorrowVo.company}</td>
                                <td>{adminBorrowVo.memberNo}</td>
                                <td>{adminBorrowVo.name}</td>
                                <td>{adminBorrowVo.borrowDate}</td>
                                <td>{adminBorrowVo.dueDate}</td>
                                <td>{adminBorrowVo.overdueCount}</td>
                                <td>{adminBorrowVo.bookState}</td>
                                <td className='restriction'>
                                    <select onChange={(e) => {
                                        updateRestriction(adminBorrowVo.memberNo, e.target.value);
                                    }}>
                                        {
                                            optionList && optionList.length === 0
                                            ?
                                            <option value="로딩중">로딩중...</option>
                                            :
                                            optionList && optionList.map(optionVo => {
                                                console.log('adminBorrowVo',adminBorrowVo.oNo);
                                                console.log('optionVo.oNo',optionVo.oNo);
                                                if(adminBorrowVo.oNo === optionVo.oNo){
                                                    return <option selected key={optionVo.oNo} value={optionVo.oNo}>{optionVo.bOption}</option>                                                
                                                }else{
                                                    return <option key={optionVo.oNo} value={optionVo.oNo}>{optionVo.bOption}</option>
                                                }
                                            })
                                        }
                                    </select>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className='pagination'>
                {totalPages 
                ? 
                (
                    Array.from({length: totalPages}, (_, i) =>
                        <button
                            key={`page_button_${i}`}
                            onClick={() => handlerClickPageNum(i + 1)}
                            disabled={currentPage === i+1}
                        >
                            {i + 1}
                        </button>
                    )) 
                : 
                null
                }
            </div>
            <div></div>
        </StyledAdminBorrowListDiv>
    );
};

export default AdminMyPage;