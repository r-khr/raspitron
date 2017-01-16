// @flow
import moment from 'moment';

export default function sortRulesByMinutesOfDate(a, b) {
  if (minutesOfDay(a.time) < minutesOfDay(b.time)) {
    return -1;
  }
  if (minutesOfDay(a.time) > minutesOfDay(b.time)) {
    return 1;
  }
  return 0;
}

function minutesOfDay(time) {
  const m = moment(time);
  return m.minutes() + m.hours() * 60;
}
