import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

import { colors, input } from 'shared/styles/variables';

export default ({ errorMessage, error, ...other }) => (
    <StyledTextField>
        <TextField
            InputLabelProps={{
                shrink: true,
                FormLabelClasses: {
                    root: 'label',
                    focused: 'focused',
                    disabled: 'disabled',
                    error: 'error',
                }
            }}
            error={error}
            {...other}
            fullWidth={true}
        />
        { error && <p className="errorMessage">{errorMessage}</p>}
    </StyledTextField>
);

const StyledTextField = styled.div`
    & > div { /* TextField */
        & > .label {
            color: ${colors.gray};
            font-size: ${input.labelFontSize}rem;
            font-weight: ${input.labelFontWeight};
            &.focused {
                color: ${colors.blue};
            }
            &.error {
                color: ${colors.red};
            }
        }
        & > .label.error + div {
            &:after { border-bottom: 1px solid ${colors.red}; }
        }
        & > div {
            &:before { border-bottom: 1px solid ${colors.mainLight} !important; }
            &:after { border-bottom: 1px solid ${colors.blue}; }
            & > div {
                padding: 10px 12px 0 0;
                p {
                    font-size: 1.4rem;
                    color: ${colors.blue};
                }
            }
            & > input {
                line-height: 1;
                font-size: ${input.inputFontSize}rem;
                font-weight: ${input.inputFontWeight};
                padding: 8px 0 10px 0;
                color: ${colors.black};
            }
        }
    }
    .errorMessage {
        color: ${colors.red};
    }
`;