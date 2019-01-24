import React from 'react';
import styled from 'styled-components';

import { StyledButton, StyledButtonLink } from 'shared/styles/styledButton';
import StyledProgress from 'shared/styles/styledProgress';
import { colors, screen } from 'shared/styles/variables';

export default ({
    resetForm,
    bookedId,
    status,
}) => {
    switch (status) {
        case 'DISPLAY_BOOKING_LOADING':
            return (
                <StyledModal tabIndex={-1}>
                    <section>
                        <div className="loading">
                            <StyledProgress />
                            make booking...
                        </div>
                    </section>
                </StyledModal>
            );
        case 'DISPLAY_BOOKING_SUCCESS':
            return (
                <StyledModal tabIndex={-1}>
                    <section>
                        <img src="/business/static/images/booking_confirm.png" alt="image" />
                        <h1>YOUR BOOKING HAS BEEN CONFIRMED!</h1>
                        <p>We’ll find a driver and keep you updated with the progress of your delivery.</p>
                        <div className="buttons">
                            <StyledButton
                                onClick={e => resetForm()}
                            >CONTINUE</StyledButton>
                            <StyledButtonLink to={`/business/booking/${bookedId}`} onClick={e => resetForm()}>VIEW</StyledButtonLink>
                        </div>
                    </section>
                </StyledModal>
            );
        case 'CLOSED':
        default:
            return <div tabIndex={-1}></div>;
    }
}

const StyledModal = styled.div`
    position: absolute;
    width: 98%;
    max-width: 310px;
    background-color: white;
    top: 18%;
    @media ${screen.mobile} { top: 10px; }
    left: 0; right: 0;
    height: 450px;
    margin: 0 auto;
    border-radius: 10px;
    padding: 40px;
    outline: none;

    section {
        position: relative;
        height: 100%;
        & > .loading {
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            font-size: 1.4rem;
            & > div { margin-bottom: 20px; }
        }
        img {
        max-width: 170px;
        display: block;
        margin: 0 auto;
        }
        & > span {
            text-align: center;
            font-size: 8rem;
            text-align: center;
            display: block;
            color: ${colors.gray};
            margin-top: 30px;
        }
        h1 {
            text-align: center;
            font-weight: bold;
            font-size: 1.5rem;
            margin: 30px 0 20px 0;
        }
        p {
            font-size: 1.2rem;
            line-height: 1.4;
            text-align: center;
            color: ${colors.gray};
        }
        .buttons {
            width: 100%;
            display: flex;
            justify-content: space-around;
            position: absolute;
            bottom: 0;
            flex-wrap: wrap;
            .textButton {
                font-size: 1.2rem;
                background-color: none;
                text-decoration: underline;
                &:hover {
                    background: none;
                    color: ${colors.gray};
                }
            }
        }
    }
`;
  
