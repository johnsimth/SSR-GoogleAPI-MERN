const statuses = {
  R: 'Booked',
  DC: 'Booked',
  A: 'Booked',
  B: 'Booked',
  HP: 'On the way to pick-up',
  AP: 'Arrived at pick-up',
  HD: 'On the way to drop-off',
  P: 'In progress',
  AD: 'Arrived at drop-off',
  C: 'Completed',
  CX: 'Canceled',
  PX: 'Canceled',
};

export default code => statuses[code];