export const formatScheduleTime = time => {
  if (time === 'anytime') return time;
  return time.replace('to', '-');
};