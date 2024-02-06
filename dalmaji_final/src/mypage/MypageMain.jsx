import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MypageJoin from './MypageJoin';
import MypageLogin from './MypageLogin';
import MemberEdit from './MemberEdit';
import ErrorPageNotFound from '../error/ErrorPageNotFound';
import MemberDelete from './MemberDelete';
import MypageLogout from './MypageLogout';
import MemberBorrowList from './MemberBorrowList';

const MypageMain = () => {
    return (
            <Routes>
                <Route path='join' element={<MypageJoin />}/>
                <Route path='login' element={<MypageLogin />}/>
                <Route path='logout' element={<MypageLogout />}/>
                <Route path='edit' element={<MemberEdit />}/>
                <Route path='delete' element={<MemberDelete />}/>
                <Route path='*' element={<ErrorPageNotFound />}/>
                <Route path='borrowList/:memberNo' element={<MemberBorrowList />} />
            </Routes>
    );
};

export default MypageMain;