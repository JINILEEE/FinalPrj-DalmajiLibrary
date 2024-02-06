import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNaviDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    place-items: center center;
    background-color: #2f2f49;
    color: white;
    & > div > a{
        text-decoration: none;
        color: white;
    }
    & > div > a:hover{
        color: #D9F1FF;
    }
`;

const Navi = () => {

    const userJsonStr = sessionStorage.getItem("loginMemberVo");
    const sessionLoginMemberVo = JSON.parse(userJsonStr);
    const adminJsonStr = sessionStorage.getItem("AdminLoginMemberVo");
    const sessionLoginAdminVo = JSON.parse(adminJsonStr);

    return (
        <StyledNaviDiv>
            <div>
            {
                sessionLoginAdminVo
                ?
                (
                    <Link to="/admin/notice/list">공지사항</Link>
                )
                : sessionLoginMemberVo
                ?
                (
                    <Link to="/notice/list">공지사항</Link>
                )
                :
                <div>공지사항</div>
            }    
            </div>
            <div><Link to="/search/list">도서목록</Link></div>
            <div><Link to="/search/detaillist">도서검색</Link></div>
            {sessionLoginAdminVo && (
                <div><Link to="/admin/write">도서작성</Link></div>
            )}
            <div>
            {
                sessionLoginAdminVo 
                ? 
                (
                    <Link to="/admin/mypage">마이페이지</Link>
                ) 
                : sessionLoginMemberVo 
                ? 
                (
                    <Link to={`/member/borrowList/${sessionLoginMemberVo.memberNo}`}>마이페이지</Link>
                ) 
                : 
                <div>마이페이지</div>
            }
            </div>
        </StyledNaviDiv>
    );
};

export default Navi;