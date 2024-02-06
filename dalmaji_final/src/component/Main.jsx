import React from 'react';
import {Routes, Route} from 'react-router-dom';
import ErrorPageNotFound from '../error/ErrorPageNotFound';
import HomeMain from '../home/HomeMain';
import MypageMain from '../mypage/MypageMain';
import SearchMain from '../search/SearchMain';
import AdminMain from '../admin/AdminMain';
import NoticeMain from '../notice/NoticeMain';

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<HomeMain />}></Route>
            <Route path='/notice/*' element={<NoticeMain/>}></Route>
            <Route path='/search/*' element={<SearchMain/>}></Route>
            <Route path='/mypage/*'></Route>
            <Route path='/member/*' element={<MypageMain />}></Route>
            <Route path='/admin/*' element={<AdminMain />}></Route>
            <Route path='*' element={ <ErrorPageNotFound /> }></Route>
        </Routes>
    );
};

export default Main;