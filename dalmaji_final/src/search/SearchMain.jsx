import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchList from './SearchList';
import SearchDetail from './SearchDetail';
import SearchDetailList from './SearchDetailList';



const SearchMain = () => {
    return (
        <Routes>
            <Route path='list' element={<SearchList />}/>
            <Route path='detail/:bookNo' element={<SearchDetail/>}/>
            <Route path='detaillist' element={<SearchDetailList />}/>
        </Routes>
    );
};

export default SearchMain;