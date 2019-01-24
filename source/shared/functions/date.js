import moment from 'moment-timezone';

export const today = moment().tz("Pacific/Auckland").format('DD MMM');
export const tomorrow = moment().tz("Pacific/Auckland").add(1, 'days').format('DD MMM');
export const formatDate = d => moment.tz(d, "Pacific/Auckland").format('DD MMM');
export const getLastEdit = d => {
  const edited = moment(d);
  const today = moment();
  // return days if more than one day
  const days = today.diff(edited, 'days');
  if (days > 0) return `${days} days`;
  // return hours if more than one hour
  const hours = today.diff(edited, 'hours');
  if (hours > 0) return `${hours} hours`;
  // return minutes
  return `${today.diff(edited, 'minutes')} minutes`;
};
export const isSameDay = d => d.format('YYYYDDMM') === moment().tz("Pacific/Auckland").format('YYYYDDMM');