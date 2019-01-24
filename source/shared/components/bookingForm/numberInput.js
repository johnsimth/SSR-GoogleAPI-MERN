import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

import { colors, input } from 'shared/styles/variables';

export default ({ label, id, value, error, handleChange, step }) => {
    const increment = value => handleChange(forceValidateNumber(value + step));
    const decrement = value => handleChange(forceValidateNumber(value - step));
    return (
        <NumberInput>
            <button onClick={() => decrement(value)}>-</button>
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
                    inputProps={{ step }}
                    label={label}
                    error={error}
                    onChange={
                        e => handleChange(forceValidateNumber(e.target.value))
                    }
                    id={id}
                    type="number"
                    value={Number(value)}
                    fullWidth={true}
                />
            <button onClick={() => increment(value)}>+</button>
        </NumberInput>
    );
};

const forceValidateNumber = n => {
    const N = Math.round(n * 10);
    return N < 0 ? 0 : N / 10;
};

 const NumberInput = styled.div`
    width: 100%;
    position: relative;
    & > div { /* TextField */
        & > .label {
            color: ${colors.gray};
            font-size: ${input.labelFontSize}rem;
            font-weight: ${input.labelFontWeight};
            white-space: nowrap;
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
            width: 40px;
            margin: 16px 0 0 22px;
            &:before { border-bottom: 1px solid ${colors.mainLight} !important; }
            &:after { border-bottom: 1px solid ${colors.blue}; }
            & > input {
                line-height: 1;
                font-size: ${input.inputFontSize}rem;
                font-weight: ${input.inputFontWeight};
                padding: 8px 0 10px 0;
                text-align: center;
                color: ${colors.black};
                -moz-appearance:textfield;
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
            }
        }
    }
    & > button {
        position: absolute;
        z-index: 10;
        top: 22px;
        border: 1px solid ${colors.mainLight};
        color: ${colors.gray};
        background: none;
        border-radius: 100%;
        height: 22px; width: 22px;
        line-height: 20px;
        padding: 0 2px 6px 2px;
        outline: none;
        &:first-child {
            left: 0;
        }
        &:last-child {
            left: 62px;
        }
    }
 `;