import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const StyledMultipleRowsDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .slick-list{
        width: 1000px;
        height: 400px;
    }
    .slick-track{
        width: 970px;
        height: 400px;
    }
    & img{
        height: 200px;
        width: 140px;
    }
    .slick-arrow:hover {
        background-color: lightgray;
    }
    .slick-prev:before, .slick-next:before {
        font-family: 'slick';
        font-size: 20px;
        line-height: 1;
        opacity: .75;
        color:  #00558B;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

`;

// export default class MultipleRows extends Component

const MultipleRows = () => {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
      rows: 2,
      slidesPerRow: 2
    };
    return (
      <StyledMultipleRowsDiv>
        <Link to='/search/list'>
          <Slider {...settings}>
              <div>
                <img src="https://image.yes24.com/momo/TopCate3252/MidCate008/325172939.jpg" alt="어린왕자" />
              </div>
              <div>
                <img src="https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791170610403.jpg" alt="후려치는 안녕" />
              </div>
              <div>
                <img src="https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9791168341128.jpg" alt="순도 100퍼센트의 휴식" />
              </div>
              <div>
                <img src="https://contents.kyobobook.co.kr/sih/fit-in/200x0/pdt/9788932042411.jpg" alt="헤테로토피아" />
              </div>
              <div>
                <img src="https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9791166393976.jpg" alt="메뉴관리의 이해" />
              </div>
              <div>
                <img src="https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788957365793.jpg" alt="자본주의" />
              </div>
              <div>
                <img src="https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788965235088.jpg" alt="붉은 항일" />
              </div>
              <div>
                <img src="https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788962465136.jpg" alt="'백제 기와 연구" />
              </div>
              <div>
                <img src="https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9791188602612.jpg" alt="오래된 서촌 오래된 서울" />
              </div>
              <div>
                <img src="https://contents.kyobobook.co.kr/sih/fit-in/200x0/pdt/9788978496964.jpg" alt="초역 괴테의 말" />
              </div>
              <div>
                <img src="https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788998690748.jpg" alt="자전거로 유럽 도시 읽기" />
              </div>
              <div>
                <img src="https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9791189958480.jpg" alt="대문 바깥" />
              </div>
              <div>
                <img src="https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788967501426.jpg" alt="철도원 삼대와 인천걷기" />
              </div>
              <div>
                <img src="https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9791197880407.jpg" alt="유럽 와이너리 여행" />
              </div>
              <div>
                <img src="https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9791189143435.jpg" alt="아시아 1945-1990" />
              </div>
              <div>
                <img src="https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788976965820.jpg" alt="모나리자의 집은 어디인가" />
              </div>
          </Slider>
        </Link>
      </StyledMultipleRowsDiv>
    );
  }


export default MultipleRows 