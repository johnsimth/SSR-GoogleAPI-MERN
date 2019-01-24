import v8n from 'v8n';
import { isValidNumber } from 'libphonenumber-js';
import moment from 'moment-timezone';

export const validateFirstName = v => v8n().not.empty().test(v);
export const validateLastName = v => v8n().not.empty().test(v);
export const validatePickupLocation = v => v8n().not.empty().test(v);
export const validateDropOffLocation = v => v8n().not.empty().test(v);
export const validateAgreeAuthorityToLeave = (toLeave, agree) => {
  if (!toLeave) return true;
  if (toLeave && agree) return true;
  return false;
};
export const validateAccessNote = (note, placeToLeave) => {
  if (placeToLeave !== 'other') return true;
  if (placeToLeave === 'other' && note !== '') return true;
  return false;
}
export const validateDate = v => v.diff(moment().tz("Pacific/Auckland"), 'days') >= 0;
export const validatePhone = v => isValidNumber(v, 'NZ');
export const validateEmail = v => (
  v8n().includes('@').includes('.')
  .not.first('@').not.first('.')
  .not.last('@').not.last('.')
  .test(v)
);
export const validateInvoice = (invoice, required) => {
  if (!required) return true;
  return v8n().not.empty().test(invoice);
};

export const validateItemDescription = (description, quantity) => {
  if (quantity == 0) return true;
  return v8n().not.empty().test(description);
};
export const validateItemBoxes = v => v !== 0;
export const validateItemVolume = v => v !== 0;
export const validateTotalQuantity = (items, max) => {
  const total = items.reduce((total, current) => total + current.quantity, 0);
  const result = total <= max ? true : false;
  return [result, total];
}
export const validateTotalBox = (items, max) => {
  if (max === -1) return [true, 0];
  const total = items.reduce((total, current) => total + (current.quantity * current.boxes), 0);
  const result = total <= max ? true : false;
  return [result, total];
}
export const validateItems = (items, volumeRequired) => items.every(item => (
  validateItemBoxes(item.boxes)
  &&
  validateItemDescription(item.description, item.quantity)
  &&
  (validateItemVolume(item.volume) || !volumeRequired)
));

export const validateDistance = (distance, loading, error) => (
  distance !== 0 && !loading && !error
);

export const validateAll = (newBooking, pricingModel) => {
  const { value, items, accessories, status, distance } = newBooking;
  const { itemLimit, boxesLimit, invoiceRequired, volumeRequired } = pricingModel;
  return (
    validateInvoice(value.invoiceNumber, invoiceRequired)
    &&
    validateTotalQuantity(items, itemLimit)[0]
    &&
    validateTotalBox(items, boxesLimit)[0]
    &&
    validateFirstName(value.firstName)
    &&
    validateLastName(value.lastName)
    &&
    validateEmail(value.email)
    &&
    validatePhone(value.phone)
    &&
    validateAccessNote(value.specialAccessNote, value.placeToLeave)
    &&
    validateDate(value.scheduleDate)
    &&
    validatePickupLocation(value.pickUpLocation)
    &&
    validateDropOffLocation(value.deliveryLocation)
    &&
    validateAgreeAuthorityToLeave(value.authorityToLeave, value.authorityToLeaveAccepted)
    &&
    validateItems([...items, ...accessories], volumeRequired)
    &&
    validateDistance(distance, status.loadingDistance ,status.distanceError)
  );
};