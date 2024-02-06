import React from 'react';
import AdminMyPage from './AdminMyPage';
import { Route, Routes } from 'react-router-dom';
import SearchAdminEdit from './SearchAdminEdit';
import AdminNoticeList from './AdminNoticeList';
import AdminNoticeWrite from './AdminNoticeWrite';
import AdminNoticeDetail from './AdminNoticeDetail';
import AdminLogin from './AdminLogin';
import SearchAdminWrite from './SearchAdminWrite';

const AdminMain = () => {
    return (
        <Routes>
            <Route path='/mypage/*' element={<AdminMyPage />}></Route>
            <Route path='/login/*' element={<AdminLogin />}></Route>
            <Route path='/edit/*' element={<SearchAdminEdit />}></Route>
            <Route path='/write/*' element={<SearchAdminWrite />}></Route>
            <Route path='/notice/list/*' element={<AdminNoticeList />}></Route>
            <Route path='/notice/write/*' element={<AdminNoticeWrite />}></Route>
            <Route path='/notice/detail/:no' element={<AdminNoticeDetail />}></Route>
        </Routes>
    );
};

export default AdminMain;