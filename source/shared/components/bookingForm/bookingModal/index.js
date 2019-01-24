import React from 'react';
import styled from 'styled-components';
import { Modal } from '@material-ui/core';

import ModalContent from 'shared/components/bookingForm/bookingModal/modalContent';

const BookingModal = ({ status, ...other }) => {
    const modalState = getModalState(status);
    return (
        <StyledModalWrapper open={modalState !== 'CLOSED'}>
            <ModalContent status={modalState} {...other} />
        </StyledModalWrapper>
    )
};

export default BookingModal;

const getModalState = status => {
    const { requestingBooking, booked } = status;
    if (requestingBooking) return 'DISPLAY_BOOKING_LOADING';
    if (booked) return 'DISPLAY_BOOKING_SUCCESS';
    return 'CLOSED';
}

const StyledModalWrapper = styled(props => <Modal {...props} />)`
    & > div:first-child {
        background-color: rgba(37, 64, 82, 0.9);
        z-index: -1;
    }
`;