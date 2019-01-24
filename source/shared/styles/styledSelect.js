import React from 'react';
import styled from 'styled-components';
import { Select, FormControl, InputLabel } from '@material-ui/core';
import { colors, input } from 'shared/styles/variables';

export default ({ label, value, id, onChange, children, width }) => (
    <StyledSelect width={width}>
        <FormControl>
            <InputLabel className="label" htmlFor={id}>{label}</InputLabel>
            <Select
                className="select"
                value={value}
                inputProps={{ name: label, id }}
                onChange={e => onChange(e)}
            > {children} </Select>
        </FormControl>
    </StyledSelect>
);

const StyledSelect = styled.div`
    & div {
        width: ${props => props.width};
        & > .label {
            color: ${colors.gray};
            font-size: ${input.labelFontSize}rem;
            font-weight: ${input.labelFontWeight};
        }
        & > .select {
            /* reset */
            &::before, &::after {
                border: none !important;
            }
            & > div { overflow: hidden; }
            & > div > div:focus {
                background-color: transparent !important;
            }
            /* styling */
            line-height: 1;
            font-size: ${input.inputFontSize}rem;
            font-weight: ${input.inputFontWeight};
            color: ${colors.black};
            border-bottom: 1px solid ${colors.mainLight};
            transition: 0.1s;
            &:hover {
                border-bottom: 1px solid ${colors.blue};
            }
            svg { color: ${colors.blue}; }
        }
    }
`;