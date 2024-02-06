import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Navi from './Navi';
import { Link, useNavigate } from 'react-router-dom';
import { useDalmajiContext } from '../context/DalmajiContext';

const StyledHeaderDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 2fr 1fr;
    place-items: center center;
`;

const StyledTopMenu = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1.5fr 2fr 4fr 2fr 1.5fr;
    place-items: center center;
    
    & > a {
        width: 100%;
        height: 100%;
    }

    & > a > div > img {
        width: 150px;
        height: 95px;
        //img를 중앙에 오도록 하려면 일단 block 요인으로 만들어야함.
        display: block;
        margin-top: 0;
    }

    & > div:nth-child(3){
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & > div:nth-child(3) > button {
        background-color: transparent;
        border: none;
        position: absolute;
        left: 400px;
        margin: 0px;
    }

    & > div:nth-child(3) > input {
        outline: none;
        width: 450px;
        height: 35px;
        padding-left: 25px;
        font-size: 15px;
        border: 3px solid #051921;
        border-radius: 25px;
    }

    & > div:nth-child(4){
        width: 100%;
        height: 100%;
        display: flex;
        margin-right: 0;
        justify-content: right;
        align-items: center;
        gap: 20px;
        & > a {
            text-decoration: none;
            color: black;
        }
    }
`;

const Header = () => {

    const {loginMember, AdminLoginMember, setLoginMember, setAdminLoginMember} = useDalmajiContext();    
    
    const navigate = useNavigate();
    
    // 페이지 로드 시 세션 스토리지에서 로그인 정보 가져오기
    const [loginInfo, setLoginInfo] = useState(() => {
    const loginInfoStr = sessionStorage.getItem('loginMemberVo');
    return JSON.parse(loginInfoStr) || null;
    });

    console.log("헤더");
    console.log("로그인", loginInfo);

    const handleLogout = () => {
        sessionStorage.removeItem("loginMemberVo");
        sessionStorage.removeItem("AdminLoginMemberVo");

        setLoginInfo(null);
        setLoginMember(null);
        setAdminLoginMember(null);
        navigate("/")

        // 로그아웃 완료 후 알람 창 띄우기
        window.alert("로그아웃 되었습니다.");
    };

        return (
        <StyledHeaderDiv>
            <StyledTopMenu>
                <div></div>
                <Link to='/'>
                <div><img src="/images/header/newlogo.png" alt="logo" /></div>
                </Link>
                <div>
                    <input type='search' name='search' placeholder='검색어를 입력하세요.'></input>
                    <button>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
                <div className='login_join'>
                    {loginMember === null 
                    ?
                        (AdminLoginMember === null
                        ? 
                        <>
                            <Link className='login' to='/member/login'>
                            <div>로그인</div>
                            </Link>
                            <Link className='login' to='/member/join' >
                            <div>회원가입</div>
                            </Link>
                        </>
                        : 
                        <>
                            <div className='nick'>
                                <Link to="/">
                                    <h4>{AdminLoginMember.name} 님</h4>
                                </Link>
                            </div>
                            <div className='out'>
                                <button className='btn' onClick={handleLogout}>로그아웃</button>
                            </div>
                        </>
                        ) 
                    :
                    <>
                        <div className='nick'>
                            <Link to="/">
                                <h4>{loginMember.name} 님</h4>
                            </Link>
                        </div>
                        <div className='out'>
                        <button className='btn' onClick={handleLogout}>로그아웃</button>
                        </div>
                    </>
                    }   
                    </div>
                <div></div>
            </StyledTopMenu>
            <Navi />
        </StyledHeaderDiv>
    );
};

export default Header;