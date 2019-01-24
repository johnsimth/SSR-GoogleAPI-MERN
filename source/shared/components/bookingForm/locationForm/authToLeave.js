import React from 'react';
import styled from 'styled-components';

import { validateAgreeAuthorityToLeave } from 'shared/components/bookingForm/validations';
import StyledSelect from 'shared/styles/styledSelect';
import StyledCheckbox from 'shared/styles/styledCheckbox';
import MenuItem from 'shared/styles/styledMenuItem';
import { colors, screen } from 'shared/styles/variables';

export default ({
    authorityToLeave,
    handleInputChange,
    placeToLeave,
    authorityToLeaveAccepted,
    displayError,
}) => (
    <StyledAuthToLeave>
        <div className="checkbox">
            <StyledCheckbox
                checked={authorityToLeave}
                onChange={e => handleInputChange(!authorityToLeave, 'authorityToLeave')}
                value="Authority to leave"
                label="Authority to leave"
            />
        </div>
        { authorityToLeave &&
            <div className="placeToLeave">
                <StyledSelect
                    width="100%"
                    label="Where should we leave your parcel?"
                    value={placeToLeave}
                    id="placeToLeave"
                    onChange={e => handleInputChange(e.target.value, 'placeToLeave')}
                >
                    <MenuItem value={'frontPorch'}>Leave on the front porch / deck</MenuItem>
                    <MenuItem value={'backPorch'}>Leave on the back porch / deck</MenuItem>
                    <MenuItem value={'frontDoor'}>Leave on the front door</MenuItem>
                    <MenuItem value={'backDoor'}>Leave on the back door</MenuItem>
                    <MenuItem value={'other'}>other</MenuItem>
                </StyledSelect>
            </div>
        }
        { authorityToLeave &&
            <div className="checkbox2">
                <StyledCheckbox
                    checked={authorityToLeaveAccepted}
                    onChange={e => handleInputChange(!authorityToLeaveAccepted, 'authorityToLeaveAccepted')}
                    error={displayError && !validateAgreeAuthorityToLeave(authorityToLeave, authorityToLeaveAccepted)}
                    value="I accept the term and condition and confirm that I have authority to use this service."
                    label="I accept the term and condition and confirm that I have authority to use this service."
                />
            </div>
        }
    </StyledAuthToLeave>
);

const StyledAuthToLeave = styled.div`
    display: flex;
    flex-wrap: wrap;
    & > div { margin-bottom: 10px; }
    & > .checkbox {
        flex: 1;
        @media ${screen.tablet} { width: 100%; }
    }
    & > .placeToLeave {
        width: 320px;
        @media ${screen.tablet} { width: 100%; }
    }
    & > .checkbox2 {}
`;