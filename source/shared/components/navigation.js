import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import DashboardIcon from 'shared/components/icons/dashboard';
import HistoryIcon from 'shared/components/icons/history';
import FAQIcon from 'shared/components/icons/faq';
import NewBookingIcon from 'shared/components/icons/newBooking';
import AccountIcon from 'shared/components/icons/account';
import { sideWidth, colors, screen } from 'shared/styles/variables';


export default ({ logout, opened }) => {
    const setClass = str => opened === str ? 'active' : undefined;
    const setColor = str => opened === str ? colors.black : colors.blue;
    return (
        <StyledNavigation>
            <img src="/business/static/images/logo_full.png" alt="transfervans" />
            <nav>
                <ul>
                    <li className={setClass('DASHBOARD')}>
                        <Link to="/business/dashboard">
                            <DashboardIcon color={setColor('DASHBOARD')} />
                            DASHBOARD
                        </Link>
                    </li>
                    <li className={setClass('HISTORY')}>
                        <Link to="/business/history">
                            <HistoryIcon color={setColor('HISTORY')} />
                            HISTORY
                        </Link>
                    </li>
                    <li className={setClass('NEW_BOOKING')}>
                        <Link to="/business/booking/new">
                            <NewBookingIcon color={setColor('NEW_BOOKING')} />
                            NEW BOOKING
                        </Link>
                    </li>
                    <li className={setClass('ACCOUNT')}>
                        <Link to="/business/account">
                            <AccountIcon color={setColor('ACCOUNT')} />
                            ACCOUNT
                        </Link>
                    </li>
                    <li className={setClass('FAQ')}>
                        <Link to="/business/faq">
                            <FAQIcon color={setColor('FAQ')} />
                            FAQ
                        </Link>
                    </li>
                </ul>
            </nav>
        </StyledNavigation>
    );
};

const StyledNavigation = styled.div`
    @media ${screen.tablet} { display: none; }
    position: fixed;
    width: ${sideWidth}px;
    height: 100%;
    background-color: ${colors.white};
    padding: 32px;
    & > img {
        width: 100%;
        display: block;
        margin: 0 auto 100px auto;
    }
    li {
        position: relative;
        margin-bottom: 20px;
        svg {
            width: 17px;
            position: absolute;
            left: 32px;
            top: 7px;
        }
        a {
            border-radius: 5px;
            padding: 0 0 0 64px;
            height: 32px;
            line-height: 32px;
            text-decoration: none;
            display: block;
            font-size: 1.2rem;
            color: ${colors.blue};
            transition: 0.3s;
        }
        a:hover {
            background-color: ${colors.mainLight};
        }
        &.active > a {
            background-color: ${colors.mainLight};
            color: ${colors.black};
        }
    }
    button {
        position: absolute;
        left: 0;
        bottom: 0;
    }
`;