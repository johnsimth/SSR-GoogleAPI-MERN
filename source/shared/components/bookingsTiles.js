import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { browserHistory } from 'react-router';
import CompletedIcon from 'shared/components/icons/deliveriesCompleted';
import UpcomingIcon from 'shared/components/icons/deliveriesUpcoming';
import TodayIcon from 'shared/components/icons/deliveriesToday';
import { colors, screen } from 'shared/styles/variables';

const BookingsStats = ({ today, upcoming, completed }) => (
    <StyledWrapper>
        <StyledStatsButton>
            <button className="today" onClick={() => browserHistory.push('/business/dashboard#TODAY')}>
                <TodayIcon color="#3e83c1" />
                <div>
                    <p>{today}</p>
                    <h3>TODAY'S<br/>DELIVERIES</h3>
                </div>
            </button>
        </StyledStatsButton>
        <StyledStatsButton>
            <button className="upcoming" onClick={() => browserHistory.push('/business/dashboard#ALL')}>
                <UpcomingIcon color="#3ca23e" />
                <div>
                    <p>{upcoming}</p>
                    <h3>UPCOMING<br/>DELIVERIES</h3>
                </div>
            </button>
        </StyledStatsButton>
        <StyledStatsButton>
            <button className="completed" onClick={() => browserHistory.push('/business/history')}>
                <CompletedIcon color="#d79b3b" />
                <div>
                    <p>{completed}</p>
                    <h3>MONTHLY<br/>COMPLETED</h3>
                </div>
            </button>
        </StyledStatsButton>
    </StyledWrapper>
);

export default connect(
    ({ bookings }) => ({
        today: bookings.stats.deliveriesToday,
        upcoming: bookings.stats.totalUpcoming,
        completed: bookings.stats.completedThisMonth,
    }),
)(BookingsStats);
const StyledWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    @media ${screen.mobile} { display: none }
    & > div {
        width: 30%;
    }
`;

const StyledStatsButton = styled.div`
    border: none;
    background: none;
    & > button, & > a {
        width: 100%;
        height: 100px;
        display: block;
        border-radius: 5px;
        background: none;
        border: none;
        position:relative;
        transition: 0.3s;
        &:hover {
            opacity: 0.8;
        }
        svg {
            width: 40%;
            position: absolute;
            right: 30px;
            top: 28px;
            z-index: 1;
        }
        & > div {
            display: flex;
            position: relative;
            z-index: 2;
            justify-content: start;
            padding-left: 10%;
            & > p {
                font-size: 48px;
                color: ${colors.white};
                margin: 0;
                padding: 0 20px 0 0;
                font-weight: lighter;
            }
            & > h3 {
                text-align: left;
                font-size: 15px;
                line-height: 1.3;
                color: ${colors.white};
                margin: 0;
                padding: 10px 0 0 0;
                font-weight: lighter;
            }
        }
    }
    & > .today {
        background: -moz-linear-gradient( 45deg, #468ec7 0%, #62aed7 100%);
        background: -webkit-linear-gradient( 45deg, #468ec7 0%, #62aed7 100%);
        background: -ms-linear-gradient( 45deg, #468ec7 0%, #62aed7 100%);
        box-shadow: 0px 9px 19px 0px rgba(39, 129, 189, 0.34);
    }
    & > .upcoming {
        background: -moz-linear-gradient( 45deg, #5eb861 0%, #84cc89 100%);
        background: -webkit-linear-gradient( 45deg, #5eb861 0%, #84cc89 100%);
        background: -ms-linear-gradient( 45deg, #5eb861 0%, #84cc89 100%);
        box-shadow: 0px 9px 19px 0px rgba(56, 150, 61, 0.34);
    }
    & > .completed {
        background: -moz-linear-gradient( 45deg, #e1b25b 0%, #e9c881 100%);
        background: -webkit-linear-gradient( 45deg, #e1b25b 0%, #e9c881 100%);
        background: -ms-linear-gradient( 45deg, #e1b25b 0%, #e9c881 100%);
        box-shadow: 0px 9px 19px 0px rgba(227, 178, 87, 0.34);
    }
`;
