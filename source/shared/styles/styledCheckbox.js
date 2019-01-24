import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import styled from 'styled-components';

import { colors } from 'shared/styles/variables';

export default ({ checked, onChange, value, label, error }) => (
    <StyledCheckbox error={error}>
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={e => onChange(e)}
                    value={value}
                    classes={{ checked: "checked" }}
                />
            }
            label={label}
        />
    </StyledCheckbox>
);

const StyledCheckbox = styled.div`
    & > label {
        & > span:first-child {
            color: ${props => props.error ? colors.red : undefined};
        }
        & > span.checked {
            color: ${colors.blue};
        }
        & > span:last-child {
            font-size: 1.4rem;
            color: ${props => props.error ? colors.red : undefined};
        }
    }
`;