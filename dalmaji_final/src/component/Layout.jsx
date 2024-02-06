import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const StyledLayoutDiv = styled.div`
    width: 100vw;
    height: 150vh;
    display: grid;
    grid-template-rows: 15vh 120vh 15vh;
    place-items: center center;
`;

const Layout = () => {
    return (
        <StyledLayoutDiv>
            <Header />
            <Main />
            <Footer />
        </StyledLayoutDiv>
    );
};

export default Layout;