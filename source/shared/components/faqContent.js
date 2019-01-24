import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export default class FAQContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
        this.handleToggleOpen = () => this.setState({ open: !this.state.open });
    }
    render() {
        const { question, answer } = this.props.qa;
        const { open } = this.state;
        return (
            <StyledFAQContent>
                <h3
                    onClick={this.handleToggleOpen}
                    className={open ? 'open' : 'close'}
                >{question}</h3>
                {open && <div>{ReactHtmlParser(answer)}</div>}
            </StyledFAQContent>
        )
    };
};

import styled from 'styled-components';
import { colors } from 'shared/styles/variables';

const StyledFAQContent = styled.div`
    background-color: ${colors.white};
    padding: 16px;
    margin-bottom: 2rem;
    border-radius: 5px;
    & > h3 {
        font-size: 1.6rem;
        cursor: pointer;
        &.open::before { content: "- "; }
        &.close::before { content: "+ "; }
        &::before { color: ${colors.blue}; }
        &:hover, &.open {
            opacity: 0.6;
            transition: 0.2s;
        }
    }
    & > div {
        word-wrap: break-word;
        margin-top: 1rem;
        & > h4 {
            font-size: 1.6rem;
            font-weight: bold;
            margin-bottom: 0.8rem;
        }
        & > p {
            font-size: 1.6rem;
            line-height: 1.8;
            margin-bottom: 1.6rem;
        }
        & > ul {
            list-style-type: disc;
        }
        & > ol, & > ul {
            margin: 0 0 1.6rem 0;
            padding: 0 0 0 20px;
            & > li {
                font-size: 1.6rem;
                line-height: 2;
            }
        }
    }
`;