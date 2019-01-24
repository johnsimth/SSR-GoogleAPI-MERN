'use strict';
import React from 'react';
import styled from 'styled-components';
import { sideWidth, screen, colors } from 'shared/styles/variables';
import Header from 'shared/components/header';

const Container = ({ children }) => (
    <StyledContainer>
        {/* <TEMP_BREAKPOINT /> */}
        <Header />
        {children}
    </StyledContainer>
);

export default Container;

const StyledContainer = styled.div`
    @media ${screen.tablet} { padding: 16px 32px; }
    @media ${screen.mobile} { padding: 4px 8px; }
    padding: 16px 32px 32px ${32 + sideWidth}px;
    width: 100%;
    max-width: 1600px;
`;

// TODO: remove
const TEMP_BREAKPOINT = styled.div`
    position: fixed;
    height: 4px;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: ${colors.red};
    z-index: 1000;
    @media ${screen.tablet} { background-color: ${colors.blue} }
    @media ${screen.mobile} { background-color: ${colors.green} }
`;