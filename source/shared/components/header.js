import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import { ClickAwayListener, Paper, Popper, MenuItem, MenuList } from '@material-ui/core';

import { colors, screen } from 'shared/styles/variables';
import AngleDown from 'shared/components/icons/angleDown';
import { logoutUser } from 'shared/modules/user';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        };
        this.buttonRef = React.createRef();
        this.handleClose = e => {
            if (!this.buttonRef.current.contains(e.target)) {
                this.setState({ open: false });
            }
        }
    }
    render() {
        const { name, logo } = this.props;
        const { open } = this.state;
        return (
            <FlexRoot>
                { logo !== '' && <img className="customerLogo" src={logo} /> }
                <img className="transfervansLogo" src="https://staging.transfervans.co.nz/business/static/images/logo_full.png" />
                <button
                    onClick={() => this.setState({ open: !open })}
                    ref={this.buttonRef}
                >
                    <span className="desktop">{name}</span>
                    <span className="mobile">MENU</span>
                    <AngleDown color={colors.blue} />
                </button>
                <Popper open={open} anchorEl={this.buttonRef.current} style={{ zIndex: 50 }}>
                    <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                            <DropDownMenu>
                                <MenuList>
                                    <MenuItem onClick={e => {browserHistory.push('/business/dashboard');}}>Dashboard</MenuItem>
                                    <MenuItem onClick={e => {browserHistory.push('/business/history');}}>History</MenuItem>
                                    <MenuItem onClick={e => {browserHistory.push('/business/booking/new');}}>New Booking</MenuItem>
                                    <MenuItem onClick={e => {browserHistory.push('/business/account');}}>Account</MenuItem>
                                    <MenuItem onClick={e => {browserHistory.push('/business/faq');}}>FAQ</MenuItem>
                                    <MenuItem onClick={this.props.logout}>Logout</MenuItem>
                                </MenuList>
                            </DropDownMenu>
                        </ClickAwayListener>
                    </Paper>
                </Popper>
            </FlexRoot>
        )
    }
}

export default connect(
    ({ user }) => ({
        name: user.user.name,
        // logo: '',
        logo: "https://www.transfervans.co.nz/static/images/retailers_logo_furniture_now.png",
        // logo: user.user.logo, todo
    }),
    dispatch => ({
        logout: () => dispatch(logoutUser()),
    }),
)(Header);

const DropDownMenu = styled.div`
    & > ul > li {
        font-size: 1.6rem;
        color: ${colors.black};
        a {
            color: ${colors.black};
        }
    }
`;
const FlexRoot = styled.div`
    display: flex;
    @media ${screen.tablet} { margin-bottom: 0; }
    margin-bottom: 16px;
    justify-content: flex-end;
    align-items: center;
    z-index: 50;
    & > img, button {
        display: block;
        margin-right: 18px;
        height: 80px;
    }
    & > .customerLogo {
        @media ${screen.tablet} { display: none; }
    }
    & > .transfervansLogo {
        display: none;
        height: 30px;
        margin: 0 auto 0 0;
        @media ${screen.tablet} { display: block; }
    }
    & > button {
        display: flex;
        align-items: center;
        border: none;
        background: none;
        padding: 8px 0 8px 8px;
        cursor: pointer;
        outline: none;
        span {
            &.mobile {
                display: none;
                font-size: 18px;
                padding-top: 4px;
                @media ${screen.tablet} { display: inline; }
            }
            font-size: 24px;
            &.desktop {
                @media ${screen.tablet} { display: none; }
            }
        }
        svg {
            margin: 4px 0 0 8px;
            width: 14px;
        }
    }
`;