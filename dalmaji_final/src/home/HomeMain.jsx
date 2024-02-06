import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MultipleRows from './MultipleRows';

const StyledHomeMainDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1.2fr;
    place-items: center center;
    `;

const StyledFirstMainDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center center;
    grid-template-columns: 1.5fr 8fr 1.5fr;
    background-color: #D9F1FF;
    & > div:nth-child(2) {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 1s ease;
        & > img {
            width: 90%;
            height: 70%;
            display: block;
            margin: auto;
        }
      
    }
`;

const StyledSecondMainDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center center;
    margin: 0;
    padding: 0;
    & > h2 {
        margin-top: 20px;
    }
    & > div:nth-child(2) {
        width: 1000px;
        height: 310px;
        display: block;
        margin-bottom: 150px;
    }
`;

const MainImages = [
    "/images/main/MainImg01.png",
    "/images/main/MainImg02.png",
    "/images/main/MainImg03.png",
    "/images/main/MainImg04.png",
];

const HomeMain = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % MainImages.length);
        }, 2500);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <StyledHomeMainDiv>
            <StyledFirstMainDiv>
                <div></div>
                <div className='slide'>
                    <img src={MainImages[currentSlide]} alt={`홈메인 ${currentSlide + 1}번째 사진`} />
                </div>
                <div></div>
            </StyledFirstMainDiv>
            <StyledSecondMainDiv>
                <h2>달맞이 사서 추천 도서</h2>
                <MultipleRows />
            </StyledSecondMainDiv>
        </StyledHomeMainDiv>
    );
};

export default HomeMain;