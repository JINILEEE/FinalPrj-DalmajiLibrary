import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NoticeDetail from './NoticeDetail';
import ErrorPageNotFound from '../error/ErrorPageNotFound';
import NoticeList from './NoticeList';


const NoticeMain = () => {
    return (
        <Routes>
            <Route path='/list/*' element={<NoticeList />}/>
            <Route path='/detail/:no' element={<NoticeDetail />}/>
            <Route path='*' element={<ErrorPageNotFound />}/>
        </Routes>
    );
};

export default NoticeMain;