import React from 'react';
import styled from 'styled-components';

const StyledFooterDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center center;
    background-color: #EFEFF1;
    color: #595959;
`;

const Footer = () => {
    return (
        <StyledFooterDiv>
            <div>
                <div>달맞이 도서관</div>
                <div>서울특별시 강남구 테헤란로 130 호산빌딩 5F, 6F</div>
                <div>전화번호 : 02-0000-0000</div>
            </div>
            <div>
                <div>이용시간 : 화~금 09:00~21:00 / 토, 일 09:00~18:00 / 월요일, 공휴일 휴관</div>
                <div>Copyright by 달맞이 도서관사업소 All Right Reserved.</div>
                <div>개인정보처리방침 | 이용약관 | 찾아오시는길</div>
            </div>
        </StyledFooterDiv>
    );
};

export default Footer;