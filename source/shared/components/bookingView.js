import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Ajax from 'client/ajax';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { formatDate } from 'shared/functions/date';
import { colors, screen } from 'shared/styles/variables';
import displayStatus from 'shared/functions/statusCodeToString';
import Watch from 'shared/components/icons/watch';
import Calendar from 'shared/components/icons/calendar';

class BookingView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: null, error: null };
    }
    componentDidMount() {
        const { id, userId } = this.props;
        loadBooking(id).then(res => {
            const data = JSON.parse(res.data);
            if (!data.businessId || data.businessId !== userId) {
                this.setState({ error: true });
            } else {
                this.setState({ data });
            }
        }).catch(() => this.setState({ error: true }));
    }
    render() {
        const { data, error } = this.state;
        if (data === null && error === null) return <div>loading..</div>;
        if (error) return <div>booking not found.</div>;
        const items = [ ...data.items ];
        const accessories = [ ...data.accessories ];
        const pickUps = data.locations.filter(l => l.type === 'pick-up')
        const dropOffs = data.locations.filter(l => l.type === 'drop-off')
        return (
            <BookingViewWrapper>
                <BookingHeader>
                    <div className="data">
                        <span className="data--label">Delivery #</span>
                        <h2 className="data--data">{data.id}</h2>
                    </div>
                    <div className="data">
                        <span className="data--label">Invoice #</span>
                        <p className="data--data">{data.invoiceNumber? data.invoiceNumber : 'n/a'}</p>
                    </div>
                    <div className="data data_right">
                        <span className="data--label">Quote</span>
                        <p className="data--data">${data.captured}</p>
                    </div>
                    <div className="data">
                        <span className="data--label">Status</span>
                        <p className="data--data">{displayStatus(data.status)}</p>
                    </div>
                </BookingHeader>
                <div className="left">
                    <BookingViewTable className="left">
                        <h4>Customer</h4>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{data.firstName} {data.lastName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>{data.mobileNumber}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>{data.email}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </BookingViewTable>
                    <BookingViewTable className="left">
                        <h4>Location</h4>
                        <Table>
                            <TableBody>
                                {pickUps.map((location, index) => (
                                <TableRow>
                                    <TableCell>Pick-up {index > 0? (index + 1):''}</TableCell>
                                    <TableCell>{location.unit? "Unit " + location.unit + ', ': ''}{removeNz(location.address)}</TableCell>
                                </TableRow>
                                ))}
                                {dropOffs.map((location, index) => (
                                <TableRow>
                                    <TableCell>Drop-off {index > 0? (index + 1):''}</TableCell>
                                    <TableCell>{location.unit? "Unit " + location.unit + ', ': ''}{removeNz(location.address)}</TableCell>
                                </TableRow>
                                ))}
                                {//todo swaps
                                }
                                <TableRow>
                                    <TableCell>Authority to Leave</TableCell>
                                    <TableCell>
                                        {data.authToLeaveId ? 'Yes' : 'No'}
                                    </TableCell>
                                </TableRow>
                                { data.authToLeaveId !== 0 && 
                                    <TableRow>
                                        <TableCell>Place to leave</TableCell>
                                        <TableCell>
                                            {displayPlaceToLeave(data.whereToLeave)}
                                        </TableCell>
                                    </TableRow>
                                }
                                <TableRow>
                                    <TableCell>Special Access Notes</TableCell>
                                    <TableCell>{data.accessNote}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Delivery Notes</TableCell>
                                    <TableCell>{data.notes}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </BookingViewTable>
                </div>
                <div className="right">
                    <DeliveryInfo>
                        <p className="deliveryInfo--icon"><Calendar color={colors.blue}/>{formatDate(data.scheduleDate)}</p>
                        <p className="deliveryInfo--icon"><Watch color={colors.blue}/>{data.scheduleTime}</p>
                    </DeliveryInfo>
                    {data.driverFirstName &&
                        <DriverInfo>
                            <span>Driver</span>
                            <p>{data.driverFirstName} {data.driverLastName}</p>
                            <p>{data.driverMobileNumber}</p>
                        </DriverInfo>
                    }
                    {!data.driverFirstName &&
                        <DriverInfo>
                            <span>Driver</span>
                            <p>To be assigned</p>
                        </DriverInfo>
                    }
                </div>
                <BookingViewTable className="full">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Items</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Num. of boxes</TableCell>
                                <TableCell>Volume</TableCell>
                                <TableCell>Weight</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        { items.map((item, index) => (
                            <TableRow key={`items_${index}`}>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.boxes}</TableCell>
                                <TableCell>
                                    {(!item.volume || item.volume === 0)? '-' : `${item.volume} m3`}
                                </TableCell>
                                <TableCell>
                                    {(!item.weight || item.weight === 0)? '-' : `${item.weight} kg`}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </BookingViewTable>
                { accessories.length > 0 && 
                <BookingViewTable className="full">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Accessories</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Num. of boxes</TableCell>
                                <TableCell>Volume</TableCell>
                                <TableCell>Weight</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        { accessories.map((item, index) => (
                            <TableRow key={`items_${index}`}>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.boxes}</TableCell>
                                <TableCell>
                                    {(!item.volume || item.volume === 0)? '-' : `${item.volume} m3`}
                                </TableCell>
                                <TableCell>
                                    {(!item.weight || item.weight === 0)? '-' : `${item.weight} kg`}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </BookingViewTable>
                }
            </BookingViewWrapper>
        );
    };
}

export default connect(
    ({ user }) => ({
        userId: user.user.id,
    }),
    null,
)(BookingView);

const loadBooking = id => {
    let token = typeof(localStorage) !== 'undefined' ? localStorage.getItem('jwtTokenBusiness') : null
    return Ajax.get(`/api/delivery/${id}`, token);
}

const displayPlaceToLeave = string => {
    const options = {
        frontPorch: 'Leave on the front porch / deck',
        backPorch: 'Leave on the back porch / deck',
        frontDoor: 'Leave on the front door',
        backDoor: 'Leave on the back door',
        other: 'other (details below)',
    };
    return options[string];
}

const BookingViewWrapper = styled.div`
    border-radius: 5px;
    background-color: ${colors.white};
    padding: 24px 32px;
    @media ${screen.mobile} { padding: 16px 8px; }
    position: relative;
    margin-bottom: 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    & > .left  {
        width: 68%;
        @media ${screen.tablet} {
            width: 100%;
            order: 3;
        }
        
    }
    & > .right {
        width: 30%;
        @media ${screen.tablet} {
            width: 100%;
            order: 2;
            margin-bottom: 8px;
        }
    }
    & > .full  {
        width: 100%;
        @media ${screen.tablet} { order: 4; }
    }
`;

const BookingHeader = styled.header`
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    flex-direction: row;
    @media ${screen.mobile} {
        order: 1;
        flex-direction: column;
    }
    @media ${screen.tablet} { margin-bottom: 4px; }
    margin-bottom: 32px;
    & > .data {
        margin-right: 4%;
        margin-bottom: 8px;
        &_right {
            margin-left: auto;
            @media ${screen.mobile} { margin-left: 0; }
        }
        & > .data--label {
            font-size: 1.4rem;
            margin-bottom: 0.4rem;
            display: block;
            color: ${colors.lightBlue};
        }
        & > .data--data {
            font-size: 2.4rem;
            font-weight: bold;
            color: ${colors.black};
        }
    }
`;

const DeliveryInfo = styled.div`
    background-color: ${colors.yellow};
    padding: 16px;
    margin-top: 18px;
    border-radius: 5px;
    .deliveryInfo--icon {
        display: flex;
        align-content: center;
        align-items: center;
        line-height: 30px;
        margin: 2px 0;
        font-size: 1.6rem;
        & > svg {
            width: 32px;
            padding-right: 8px;
        }
    }
`;

const DriverInfo = styled.div`
    background-color: ${colors.yellow};
    padding: 16px;
    border-radius: 5px;
    margin-top: 2rem;
    span {
        font-size: 1.8rem;
        margin-bottom: 0.4rem;
        display: block;
        color: ${colors.gray};
    }
    p {
        font-size: 1.6rem;
        margin-bottom: 0.4rem;
    }
`;

const BookingViewTable = styled.div`
    margin-bottom: 24px;
    max-width: 100%;
    overflow-x: auto;
    & > h4 {
        font-size: 1.3rem;
        color: ${colors.lightBlue};
        font-weight: normal;
        padding-bottom: 4px;
    }
    & > table {
        border-collapse: collapse;
        border-spacing: 0;
        & > thead {
            & > tr {
                height: auto;
                & > th {
                    font-size: 1.2rem;
                    line-height: 1.2;
                    &:first-child {
                        color: ${colors.lightBlue};
                        font-size: 1.3rem;
                        width: 180px;
                        padding: 0 4px;
                    }
                }
            }
        }
        & > tbody {
            border-top: 2px solid ${colors.lightBlue};
            & > tr {
               height: 40px;
               background-color: #fcfdfe;
               &:nth-child(even) {
                background-color: white;
               }
               & > td {
                    font-size: 1.3rem;
                    border-color: ${colors.mainLight};
                    &:first-child {
                        color: ${colors.gray};
                        width: 180px;
                        padding: 0 16px;
                    }
                }
            }
        }
    }
`;

const removeNz = string => string.replace(', New Zealand', '');