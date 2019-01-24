import React from 'react';
import { Select } from '@material-ui/core';
import styled from 'styled-components';
import { colors, screen } from 'shared/styles/variables';
import { connect } from 'react-redux';
import { changeLocationFilter } from 'shared/modules/bookings';
import { browserHistory } from 'react-router';
import MenuItem from 'shared/styles/styledMenuItem';

const BookingsFilter = ({
    filterOptions,
    filterValue,
    changeLocationFilter,
    locationFilter,
    defaultLocations,
}) => (
    <BookingFilterWrapper>
        <BookingFilterSelect>
            <Select
                className="select"
                onChange={e => changeLocationFilter(e.target.value)}
                value={locationFilter}
            >
                <MenuItem value={'ALL'}>All pick-up locations</MenuItem>
                {defaultLocations && defaultLocations.map(location => (
                    <MenuItem
                        value={location.address}
                        key={`location_${location.id}`}
                    >{getLocationName(location)}</MenuItem>
                ))}
            </Select>
        </BookingFilterSelect>
        <BookingFilterSelect>
            <Select
                className="select"
                value={filterValue}
                onChange={e => {
                    const { page, filter } = filterOptions.find(op => op.filter === e.target.value);
                    browserHistory.push(`/business/${page}#${filter}`);
                }}
            >
                {filterOptions.map(op => (
                    <MenuItem
                        key={`${op.page}${op.filter}`}
                        value={op.filter}
                    >{op.label}</MenuItem>
                ))}
            </Select>
        </BookingFilterSelect>
    </BookingFilterWrapper>
);

export default connect(
    ({ bookings, settings }) => ({
        locationFilter: bookings.locationFilter,
        defaultLocations: settings.locations,
    }),
    dispatch => ({
        changeLocationFilter: address => dispatch(changeLocationFilter(address)),
    })
)(BookingsFilter);

const getLocationName = location => {
    if (location.storeName !== '' && location.storeName !== null ) {
        return location.storeName;
    }
    const addressSplit = location.address.split(', ');
    return addressSplit[addressSplit.length - 3];
};

const BookingFilterWrapper = styled.div`
    width: 100%;
    display: flex;
    @media ${screen.mobile} {
        display: block;
        margin-top: 0;
    }
    margin: 36px auto 18px auto;
    padding: 0 10px;
    & > div {
        width: 50%;
        @media ${screen.mobile} {
            text-align: center;
            width: 100%;
            margin-bottom: 4px;
        }
        &:last-child {
            text-align: right;
            @media ${screen.mobile} {
                text-align: center;
            }
        }
    }
`;

const BookingFilterSelect = styled.div`
    & > span {
        color: ${colors.gray};
        display: inline-block;
        margin: 0 10px 0 0;
    }
    & > .select {
        /* reset */
        &::before, &::after {
            border: none !important;
        }
        & > div > div:focus {
            background-color: transparent !important;
        }
        /* styling */
        font-size: 1.1rem;
        border-radius: 100px;
        padding: 4px 10px 2px 20px;
        color: ${colors.blue};
        border: 1px solid ${colors.blue};
        transition: 0.1s;
        &:hover {
            background-color: ${colors.blue};
            color: white;
            svg { color: white; }
        }
        svg { color: ${colors.blue}; }
    }
`;