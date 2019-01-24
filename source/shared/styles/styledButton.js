import styled from 'styled-components';
import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router';

import DeleteIcon from 'shared/components/icons/delete';
import { colors } from 'shared/styles/variables';

export const StyledButtonInBlock = styled(Button)`
    && {
        background-color: ${colors.green};
        border-radius: 3px;
        border: 0;
        color: ${colors.white} !important;
        height: 32px;
        font-size: 12px !important;
        padding: 0 30px;
        &:hover {
            background-color: ${colors.greenLight};
        }
    }
`;

export const StyledButton = styled(Button)`
&& {
    background: -moz-linear-gradient( 45deg, #468ec7 0%, #62aed7 100%);
    background: -webkit-linear-gradient( 45deg, #468ec7 0%, #62aed7 100%);
    background: -ms-linear-gradient( 45deg, #468ec7 0%, #62aed7 100%);
    box-shadow: 0px 9px 19px 0px rgba(39, 129, 189, 0.34);
    border-radius: 4px;
    border: 0;
    color: ${colors.white} !important;
    height: 32px;
    font-size: 12px !important;
    padding: 0 30px;
    transition: 0.3s;
    display: inline-block;
    &:hover {
        box-shadow: 0px 9px 19px 0px rgba(39, 129, 189, 0.5);
    }
}
`;

export const StyledButtonGreen = styled(Button)`
&& {
    background: -moz-linear-gradient( 45deg, #5eb861 0%, #84cc89 100%);
    background: -webkit-linear-gradient( 45deg, #5eb861 0%, #84cc89 100%);
    background: -ms-linear-gradient( 45deg, #5eb861 0%, #84cc89 100%);
    box-shadow: 0px 9px 19px 0px rgba(56, 150, 61, 0.34);
    border-radius: 4px;
    border: 0;
    color: ${colors.white} !important;
    height: 32px;
    font-size: 12px !important;
    padding: 0 30px;
    transition: 0.3s;
    display: inline-block;
    &:hover {
        box-shadow: 0px 9px 19px 0px rgba(56, 150, 61, 0.5);
    }
}
`;

export const StyledButtonLink = styled(Link)`
    background: -moz-linear-gradient( 45deg, #5eb861 0%, #84cc89 100%);
    background: -webkit-linear-gradient( 45deg, #5eb861 0%, #84cc89 100%);
    background: -ms-linear-gradient( 45deg, #5eb861 0%, #84cc89 100%);
    box-shadow: 0px 9px 19px 0px rgba(56, 150, 61, 0.34);
    border-radius: 4px;
    border: 0;
    color: ${colors.white} !important;
    height: 36px;
    font-size: 12px !important;
    padding: 0 30px;
    transition: 0.3s;
    line-height: 36px;
    display: inline-block;
    text-decoration: none;
    vertical-align: bottom;
    margin-top: 1px;
    &:hover {
        box-shadow: 0px 9px 19px 0px rgba(56, 150, 61, 0.48);
    }
`;

export const DeleteButton = styled(props => (
    <button {...props}>
        <DeleteIcon color={colors.red} />
    </button>
))`
    border: none;
    background: none;
    svg {
        width: 32px;
    }
    position: absolute;
    top: -14px;
    left: 4px;
    outline: none;
`;