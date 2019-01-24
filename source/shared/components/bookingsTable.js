import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import { formatDate } from 'shared/functions/date';
import { colors } from 'shared/styles/variables';
import displayStatus from 'shared/functions/statusCodeSimple';
import { formatScheduleTime } from 'shared/functions/format';

const BookingsTable = ({ bookings }) => (
    <StyledTable>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell className="id">#</TableCell>
                    <TableCell className="date">DATE</TableCell>
                    <TableCell className="time">TIME</TableCell>
                    <TableCell className="name">NAME</TableCell>
                    <TableCell className="phone">PHONE</TableCell>
                    <TableCell className="from">FROM</TableCell>
                    <TableCell className="to">TO</TableCell>
                    <TableCell className="status">STATUS</TableCell>
                    <TableCell className="invoice">INVOICE #</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {bookings.map(booking => (
                    <TableRow key={booking.id} onClick={() => browserHistory.push(`/business/booking/${booking.id}`)}>
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>{formatDate(booking.scheduleDate)}</TableCell>
                        <TableCell>{formatScheduleTime(booking.scheduleTime)}</TableCell>
                        <TableCell>{`${booking.firstName} ${booking.lastName}`}</TableCell>
                        <TableCell>{booking.mobileNumber}</TableCell>
                        <TableCell>{displayLocationName(booking.pickupLocations)}</TableCell>
                        <TableCell>{displayLocationName(booking.dropoffLocations)}</TableCell>
                        <TableCell>{displayStatus(booking.status)}</TableCell>
                        <TableCell>{booking.invoiceNumber}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </StyledTable>
);

export default BookingsTable;

const displayLocationName = locations => {
    if (locations.length === 0) return '';
    const locationName = locations[0].locationName;
    if (locations.length === 1) {
        return locationName;
    } else {
        return `${locationName}[+ ${locations.length - 1}]`;
    }
}

export const StyledTable = styled.div`
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    margin-bottom: 14px;
    width: 100%;
    overflow-x: auto;
    & > table {
        border-collapse: collapse;
        border-spacing: 0;
        & th, & td {
            padding: 22px 18px;
            font-size: 1.2rem;
        }
        & > thead {
            & > tr {
                & > th {
                    color: ${colors.black};
                    font-weight: bold;
                }
            }
        }
        & > tbody {
            & > tr {
                max-width: 100%;
                overflow: hidden;
                transition: 0.1s;
                cursor: pointer;
                & > td {
                    border-color: ${colors.mainLight};
                    color: ${colors.gray};
                }
                &:hover {
                    background-image: -moz-linear-gradient( 0deg, #468ec7 0%, #62aed7 100%);
                    background-image: -webkit-linear-gradient( 0deg, #468ec7 0%, #62aed7 100%);
                    background-image: -ms-linear-gradient( 0deg, #468ec7 0%, #62aed7 100%);
                    box-shadow: 0px 5px 10px 0px rgba(39, 129, 189, 0.34);
                    & > td {
                        color: white;
                        border-bottom-width: 0 !important;
                    }
                }
            }
        }
    }
`;