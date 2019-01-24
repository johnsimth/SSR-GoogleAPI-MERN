import React from 'react';
import styled from 'styled-components';
import { Radio, FormControlLabel } from '@material-ui/core';

import StyledNotes from 'shared/styles/styledNotes';
import StyledBlock from 'shared/styles/styledBlock';

import TitleIcon from 'shared/components/icons/crew';
import OneMan from 'shared/components/icons/account';
import TwoMan from 'shared/components/icons/twoman';

import { colors, screen } from 'shared/styles/variables';

const CrewForm = ({ extraDriver, handleInputChange }) => (
    <StyledBlock>
        <h3 className="title">
            <TitleIcon color={colors.gray} />
            <span>CREW</span>
        </h3>
        <StyledCrew>
            <RadioWrapper className="StyledCrew--check">
                <FormControlLabel
                    control={
                        <div>
                            <Radio
                                classes={{ root: 'radioRoot', checked: 'checked' }}
                                checked={extraDriver}
                                onChange={e => handleInputChange(!extraDriver, 'extraDriver')}
                                value="Two Men"
                            />
                            <TwoMan className="icon" color={colors.gray} />
                        </div>
                    }
                    label="Two Men"
                />
                <FormControlLabel
                    control={
                        <div>
                            <Radio
                                classes={{ root: 'radioRoot', checked: 'checked' }}
                                checked={!extraDriver}
                                onChange={e => handleInputChange(!extraDriver, 'extraDriver')}
                                value="One Man"
                            />
                            <OneMan className="icon" color={colors.gray} />
                        </div>
                    }
                    label="One Man"
                />
            </RadioWrapper>
            <div className="StyledCrew--memo">
                {!extraDriver &&
                    <StyledNotes>
                        <p className="worn">* If there are any items which require two men to carry, there must be assistance at the pickup and the dropoff.</p>
                    </StyledNotes>
                }
            </div>
        </StyledCrew>
    </StyledBlock>
);

export default CrewForm;

const StyledCrew = styled.div`
    display: flex;
    flex-wrap: wrap;
    & > .StyledCrew--check {
        @media ${screen.tablet} { width: 100%; } 
        width: 280px;
    }
    & > .StyledCrew--memo { flex: 1; }
`;

const RadioWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    & > label {
        display: flex;
        justify-content: space-around;
        align-items: baseline;
        & > div > .radioRoot {
            color: ${colors.gray};
            &.checked { color: ${colors.blue}; }
            svg {
                margin-top: -8px;
            }
        }
        & > div > svg {
            width: 28px;
            margin-left: -4px;
        }
        & > span {
            display: block;
            font-size: 1.4rem;
            margin: 10px 0 0 4px;
        }
    }
`;