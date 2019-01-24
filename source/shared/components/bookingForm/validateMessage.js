import React from 'react';
import styled from 'styled-components';

import {
  validateDistance,
  validateFirstName,
  validateLastName,
  validatePickupLocation,
  validateDropOffLocation,
  validateAgreeAuthorityToLeave,
  validateAccessNote,
  validateDate,
  validatePhone,
  validateEmail,
  validateInvoice,
  validateTotalBox,
  validateItems,
} from 'shared/components/bookingForm/validations';
import { colors } from 'shared/styles/variables';

export default ({ newBooking, boxesLimit, volumeRequired }) => (
  <StyledMessage>
    {validateLists(newBooking, boxesLimit, volumeRequired).map((validate, i) => 
      validate.error && <li key={`error${i}`}>{validate.message}</li>
    )}
  </StyledMessage>
);

const validateLists = ({ distance, value, status, items, accessories }, boxesLimit, volumeRequired) => (
  [ // todo: validate items and accessories
    {
      error: !validateItems(accessories, false),
      message: 'Please ensure all accessories have the required fields.',
    },
    {
      error: !validateItems(items, volumeRequired),
      message: 'Please ensure all items have the required fields.',
    },
    {
      error: !validateTotalBox(items, boxesLimit)[0],
      message: `You have exceeded your boxes limit of ${boxesLimit}. Please call to make an oversize booking.`,
    },
    {
      error: !validateInvoice(value.invoiceNumber),
      message: "An invoice number is required.",
    },
    {
      error: !validateEmail(value.email),
      message: "A valid customer email is required.",
    },
    {
      error: !validatePhone(value.phone),
      message: "A valid customer mobile phone number is required.",
    },
    {
      error: !validateDate(value.scheduleDate),
      message: "schedule date is not valid.",
    },
    {
      error: !validateAccessNote(value.specialAccessNote, value.placeToLeave),
      message: "Special Access Note is required.",
    },
    {
      error: !validateAgreeAuthorityToLeave(value.authorityToLeave, value.authorityToLeaveAccepted),
      message: "Terms and Conditions for Authority to Leave must be confirmed ",
    },
    {
      error: !validateDropOffLocation(value.deliveryLocation),
      message: "A valid drop-off location is required.",
    },
    {
      error: !validatePickupLocation(value.pickUpLocation),
      message: "pickup location is not valid.",
    },
    {
      error: !validateLastName(value.lastName),
      message: "A valid customer last name is required.",
    },
    {
      error: !validateFirstName(value.firstName),
      message: "A valid customer first name is required.",
    },
    {
      error: !validateDistance(distance, status.loadingDistance,status.distanceError),
      message: 'Please wait for the system to calculate driving distance.'
    },
  ]
);

const StyledMessage = styled.ul`
  margin-bottom: 2rem;
  text-align: center;
  list-style-type: none;
  & > li {
    color: ${colors.red};
    font-size: 1.6rem;
  }
`;
