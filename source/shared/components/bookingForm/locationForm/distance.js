import React from 'react';
import styled from 'styled-components';

import { validatePickupLocation, validateDropOffLocation } from 'shared/components/bookingForm/validations';
import LocationSearch from 'shared/components/locationSearch';
import StyledProgress from 'shared/styles/styledProgress';
import MenuItem from 'shared/styles/styledMenuItem';
import StyledSelect from 'shared/styles/styledSelect';
import { colors, screen } from 'shared/styles/variables';
import StyledTextField from 'shared/styles/styledTextField';

export default ({
    pickUpLocation,
    defaultLocations,
    deliveryLocation,
    deliveryLocationUnit,
    status,
    handleInputChange,
    displayError,
    distance,
}) => (
    <StyledLocation>
        <div>
            <div className="location--pickupDefault">
                <StyledSelect
                    width="100%"
                    label="Pick-up"
                    value={getLocationAddress(pickUpLocation, defaultLocations)}
                    id="defaultPickUp"
                    onChange={ e => {
                        let storeName = getLocationStoreName(e.target.value, defaultLocations)
                        handleInputChange(storeName, 'pickUpLocationName');
                        if (e.target.value === 'other') {
                            handleInputChange('', 'pickUpLocation');
                        } else {
                            handleInputChange(e.target.value, 'pickUpLocation');
                        }
                    }}
                >
                    { defaultLocations.map(v => (
                            <MenuItem key={v.id} value={v.address}>{v.storeName}</MenuItem>
                        ))}
                        <MenuItem key={"other"} value="other">other location</MenuItem>
                </StyledSelect>
            </div>
            <div className="location--pickup">
                <LocationSearch
                    inputLabel="Pick-up"
                    name="pickUpLocation"
                    value={pickUpLocation}
                    handleInputChange={v => handleInputChange(v, 'pickUpLocation')}
                    error={displayError && !validatePickupLocation(pickUpLocation)}
                />
            </div>
        </div>
        <div>
            <div className="location--dropOff">
                <LocationSearch
                    inputLabel="Drop-off"
                    value={deliveryLocation}
                    handleInputChange={v => handleInputChange(v, 'deliveryLocation')}
                    error={displayError && !validateDropOffLocation(deliveryLocation)}
                />
            </div>
            <div className="location--unit">
                <StyledTextField
                    id="deliveryLocationUnit"
                    label="Unit"
                    type="text"
                    onChange={ e => handleInputChange(e.target.value, 'deliveryLocationUnit') }
                    value={deliveryLocationUnit}
                />
            </div>
            <div className="location--distance">
                <DistanceBlock>
                    <span className="title">distance</span>
                    {!status.loadingDistance && !(displayError && status.distanceError) && <span className="km">{distance} km</span> }
                    { status.loadingDistance && <div><StyledProgress size={24} /></div> }
                    {displayError && status.distanceError && <span className="error">Please enter valid address.</span>}
                </DistanceBlock>
            </div>
        </div>
    </StyledLocation>
);

const getLocationAddress = (location, defaultLocations) => {
    if(defaultLocations.find(d => d.address === location)) return location;
    return 'other';
};
const getLocationStoreName = (location, defaultLocations) => {
    let store = defaultLocations.find(d => d.address === location)
    if(store) return store.storeName;
    return '';
};

const StyledLocation = styled.div`
    & > div {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        margin-bottom: 18px;
    }
    .location {
        &--pickupDefault {
            @media ${screen.tablet} {
                width: 100%;
                margin-bottom: 10px;
            }
            width: 300px;
            margin-right: 10px;
        }
        &--pickup {
            flex: 1;
            @media ${screen.tablet} { width: 100%; }
        }
        &--dropOff {
            flex: 1;
            margin-right: 10px;
        }
        &--unit {
            width: 50px;
            margin-right: 10px;
        }
        &--distance {
            width: 200px;
            @media ${screen.tablet} {
                width: 100%;
                margin-top: 10px;
            }
        }
    }
`;
const DistanceBlock = styled.div`
    background-color: ${colors.mainLight};
    width: 200px;
    height: 60px;
    padding: 6px 20px;
    & > span {
        display: block;
        text-align: center;
    }
    & > .title {
        font-size: 1.2rem;
        color: ${colors.gray};
    }
    & > div {
        display: flex;
        justify-content: center;
        margin-top: 6px;
    }
    & > .km {
        font-size: 1.4rem;
        font-weight: bold;
        margin-top: 8px;
    }
    & > .error {
        font-size: 1.2rem;
        color: ${colors.red};
        margin-top: 8px;
    }
`;