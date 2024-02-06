import React from 'react';
import styled from 'styled-components';

const StyledLoginMainDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1.5fr;
    place-items: center center;

    & > .edittitle {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10%;
        font-family: 'Pretendard';
        font-weight: 700;
        font-size: 40px;
        /* background-color: yellow; */
    }

    & > form {
        width: 63%;
        height: 120%;
        margin-bottom: 20%;
        border: 2px solid black;
        background-color: beige;

        & > .pwd_box {
            height: 40%;
            margin-top: 20%;
            /* background-color: red; */

            & > .pwd {
                height: 15%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: 'Pretendard';
                font-weight: 700;
                font-size: 20px;
                /* background-color: yellow; */
            }

            & > .pwdinput {
                height: 18%;
                display: flex;
                justify-content: center;
                /* background-color: aqua; */

                & > input {
                    width: 40%;
                }
            }

            & > button
        }



    }
`;


const MemberEdit = () => {
    return (
        <StyledLoginMainDiv>
            <div className='edittitle'>비밀번호 변경</div>
            <form>
                <div className='pwd_box'>
                <div className='pwd'>기존 비밀번호</div>
                <div className='pwdinput'><input type="password" name='pwd' /></div>
                <div className='pwd'>새 비밀번호</div>
                <div className='pwdinput'><input type="password" name='pwd' /></div>
                </div>
                <div className='button'><inpu type='submit' value='저장' /></div>       
            </form>
        </StyledLoginMainDiv>
    );
};

export default MemberEdit;