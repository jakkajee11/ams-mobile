import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime);
dayjs.extend(utc);

const DateTimeFormat = {
  toStandardDate(date: string | number | Date | Dayjs): string {
    if (dayjs(date).isValid()) return dayjs(date).format('DD-MM-YYYY');

    return date.toString();
  },
  toStandardDateTime(date: string | number | Date | Dayjs): string {
    if (dayjs(date).isValid()) return dayjs(date).format('DD-MM-YYYY HH:mm');

    return date.toString();
  },
  timeFromNow() {
    return dayjs().fromNow();
  },
  toTimeFromNow(date: string | number | Date | Dayjs, isUtc = true) {
    if (dayjs(date).isValid())
      return isUtc ? dayjs(date).utc().fromNow() : dayjs(date).fromNow();

    return date;
  },
};

export { DateTimeFormat };
