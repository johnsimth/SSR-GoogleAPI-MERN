import React from 'react';
import styled from 'styled-components';

import { StyledButton, StyledButtonGreen } from 'shared/styles/styledButton';
import { screen } from 'shared/styles/variables';
import StyledProgress from 'shared/styles/styledProgress';


export default ({ quote, status, makeBooking, getQuote }) => (
    <StyledSubmit>
        { status.loadingQuote ?
            <StyledProgress />
            :
            status.loadQuote ?
                <div className="quoteWrapper">
                    <span>Final Quote: ${quote}(inc gst)</span>
                    <StyledButtonGreen onClick={makeBooking}>
                        MAKE BOOKING
                    </StyledButtonGreen>
                </div>
                :
                <StyledButton onClick={getQuote}>GET QUOTE</StyledButton>
        }
    </StyledSubmit>
);

const StyledSubmit = styled.div`
    text-align: center;
    margin-bottom: 3rem;
    & > .quoteWrapper {
        position: relative;
        width: 100%;
        & > span {
            position: absolute;
            display: block;
            left: 10px;
            top: 8px;
            font-size: 2rem;
            font-weight: bolder;
            @media ${screen.mobile} {
                position: relative;
                top: 0;
                margin-bottom: 12px;
                left: 0;
            }
        }
    }
`;