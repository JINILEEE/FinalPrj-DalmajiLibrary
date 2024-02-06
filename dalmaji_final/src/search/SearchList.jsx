import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledSearchListDiv = styled.div`
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 3%;

    & > table {
        width: 70%;
        height: 90%;
        margin-top: 2.5%;
        padding-bottom: 3%;
    }

    & > table tr:first-child th {
        background-color: #2f2f49;
        border-bottom: 1px solid gray;
        color: white;
        padding: 20px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    & > .h11 {
        width: 70%;
        margin-bottom: 2%;

        h1 {
            margin-bottom: 2%;
            margin-left: 2%;
            color: #2f2f49;
            font-size: 45px;
            font: bold;
        }
    }

    & > .h11 > .h12 {
        border-bottom: 6px solid #2f2f49;
        flex-direction: column;
        align-items: right;
    }

    & > table th,
    table td {
        border-left: none;
        border-right: none;
        text-align: center;
    }

    & > table td {
        background-color: #f8f4ec;

        .detail_button {
            border-radius: 10%;
            color: #2f2f49;
        }
    }

    & > .ul {
        width: 70%;
        height: 5%;
        background-color: #4B878B;
        color: #EFEFF1;
        font: bold;
        border-radius: 8px;
        display: flex;
        justify-items: center;
        margin-top: 0%;
        margin-bottom: 3%;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font: bold;

        ul {
            padding: 0%;
            margin-top: 1.5%;
            width: 100%;
            height: 10%;
            display: flex;
            justify-content: space-evenly;
            list-style: none;
        }
        a:hover{
            color: #2f2f49;
        }
    }

    & > .bnt {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .selectCategory{
        cursor: pointer;
    }

`;

const SearchList = ({ bookVoListProp, totalPagesProp, currentPageProp, handlerClickPageNumProp }) => {
    const location = useLocation();
    const [bookVoList, setBookVoList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    // const searchVoList = location.state.bookVoList;

    const loadCateList = (bookCateNo) => {
        fetch("http://127.0.0.1:8888/app/search/listByBookCate/" + bookCateNo)
        .then(resp => resp.json())
        .then(data => {
            setCurrentPage(1);
            setBookVoList(data.voList);
            setTotalPages(data.pvo.maxPage);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    // useEffect(() => {
    //     loadCateList();
    // },[])

    const loadBookVoList = () => {
        fetch('http://127.0.0.1:8888/app/search/list')
            .then((resp) => resp.json())
            .then((data) => {
                setBookVoList(data.voList);
                setTotalPages(data.pvo.maxPage);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

 

    const loadBookVoListTwo = (page) => {
        const categoryParam = selectedCategory ? `&category=${selectedCategory}` : '';
        fetch(`http://127.0.0.1:8888/app/search/list?currentPage=${page}${categoryParam}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setBookVoList(data.voList);
                setTotalPages(data.pvo.maxPage);
                console.log("data.voList: ",data.voList);
            })
            .catch((error) => {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            });
    };
   
    const handlerClickPageNum = (page) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        if (location.state && location.state.bookVoList) {
            setBookVoList(location.state.bookVoList);
            setTotalPages(1); // 검색 결과는 하나의 페이지로 간주
            setCurrentPage(1);
            console.log('useEffect 호출됨');
        } else {
            loadBookVoList();
        }
    }, [location.state, selectedCategory]);

    useEffect(() => {
        if (!location.state || !location.state.bookVoList) {
            // 검색 결과가 없는 경우에만 loadBookVoListTwo 호출
            loadBookVoListTwo(currentPage);
            loadBookVoList();
          }
    }, [currentPage, selectedCategory]);

    // useEffect(() => {
    //     console.log('bookVoList', bookVoList);
    // }, [bookVoList]);



    return (
        <StyledSearchListDiv>
            <div className='h11'>
                <div className='h12'>
                    <h1>
                        <strong>도서목록</strong>
                    </h1>
                </div>
            </div>

             <div className='ul'>
                <ul>
                    <li>
                        <Link to='/search/list' onClick={() => loadCateList('전체', null)}>전체</Link>
                    </li>
                    <li>
                        <a className="selectCategory" onClick={() => loadCateList(1)}>소설</a>
                    </li>
                    <li>
                        <a className="selectCategory" onClick={() => loadCateList(2)}>인문</a>
                    </li>
                    <li>
                        <a className="selectCategory" onClick={() => loadCateList(3)}>경제/경영</a>
                    </li>
                    <li>
                        <a className="selectCategory" onClick={() => loadCateList(4)}>역사/문화</a>
                    </li>
                    <li>
                        <a className="selectCategory" onClick={() => loadCateList(5)}>여행</a>
                    </li>
                </ul>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>제목</th>
                        <th>저자</th>
                        <th>발행처</th>
                        <th>발행년도</th>
                        <th>조회수</th>
                        <th>상세조회</th>
                    </tr>
                </thead>
                <tbody>
                    {bookVoList.length === 0 ? (
                        <tr>
                            <td colSpan="8">로딩 중...</td>
                        </tr>
                    ) : (
                        bookVoList.map((vo) => (
                            <tr key={vo.bookNo}>
                                <td>{vo.bookNo}</td>
                                <td>{vo.title}</td>
                                <td>{vo.author}</td>
                                <td>{vo.company}</td>
                                <td>{vo.publisherYear}</td>
                                <td>{vo.cont}</td>
                                <td>
                                    <Link to={`/search/detail/${vo.bookNo}`}>
                                        <button className='detail_button'>상세조회</button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className='pagination'>
                {totalPages ? (
                    Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={`page_button_${i}`}
                            onClick={() => handlerClickPageNum(i + 1)}
                            disabled={currentPage === i + 1}
                        >
                            {i + 1}
                        </button>
                    ))
                ) : null}
            </div>
            <div></div>
        </StyledSearchListDiv>
    );
};

export default SearchList;
