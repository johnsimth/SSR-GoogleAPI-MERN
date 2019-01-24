import React from 'react';
import styled from 'styled-components';

import { validateAccessNote } from 'shared/components/bookingForm/validations';
import DistanceForm from 'shared/components/bookingForm/locationForm/distance';
import AuthToLeave from 'shared/components/bookingForm/locationForm/authToLeave';
import LocationIcon from 'shared/components/icons/location';

import StyledTextField from 'shared/styles/styledTextField';
import StyledBlock from 'shared/styles/styledBlock';
import StyledNotes from 'shared/styles/styledNotes';
import { colors, screen } from 'shared/styles/variables';

const LocationForm = ({
    handleInputChange,
    pickUpLocation,
    distance,
    deliveryLocation,
    deliveryLocationUnit,
    authorityToLeave,
    placeToLeave,
    authorityToLeaveAccepted,
    specialAccessNote,
    defaultLocations,
    status,
    displayError,
    authorityToLeaveEnabled,
}) => (
    <StyledBlock>
        <h3 className="title">
            <LocationIcon color={colors.gray} />
            <span>WHERE</span>
        </h3>
        <DistanceForm {...{ pickUpLocation, defaultLocations, handleInputChange, displayError, deliveryLocation, deliveryLocationUnit, status, distance }} />
        { authorityToLeaveEnabled &&
            <AuthToLeave {...{ authorityToLeave, handleInputChange, placeToLeave, authorityToLeaveAccepted, displayError }} />
        }
        <StyledLocation>
            <div className="StyledLocation--notes">
                <StyledTextField
                    label="Special Access Notes"
                    value={specialAccessNote}
                    onChange={e => handleInputChange(e.target.value, 'specialAccessNote')}
                    error={displayError && !validateAccessNote(specialAccessNote, placeToLeave)}
                />
            </div>
            { authorityToLeave &&
                <div className="StyledLocation--memo">
                    <StyledNotes>
                        <p>Please ensure the above location is weatherproof, out of view of the street, and safe and easy for the Representatives to access.</p>
                        { authorityToLeave && placeToLeave === 'other' &&
                            <p className="worn">* Please put detailed instructions on where to leave the parcel in the special access notes.</p> 
                        }
                    </StyledNotes>
                </div>
            }
        </StyledLocation>
    </StyledBlock>
);

export default LocationForm;

const StyledLocation = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    & > .StyledLocation--notes {
        margin: 0 10px 10px 0;
        width: 400px;
        @media ${screen.tablet} { width: 100%; }
    }
    & > .StyledLocation--memo {
        margin-bottom: 10px;
        flex: 1;
        @media ${screen.tablet} { width: 100%; }
    }
`;