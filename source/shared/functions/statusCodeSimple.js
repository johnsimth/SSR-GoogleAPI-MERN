const statuses = {
  R: 'B',
  DC: 'B',
  A: 'B',
  B: 'B',
  HP: 'P',
  AP: 'P',
  HD: 'P',
  P: 'P',
  AD: 'P',
  C: 'C',
  CX: 'CX',
  PX: 'CX',
};

export default code => statuses[code];