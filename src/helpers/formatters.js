import dayjs from 'dayjs';
import localisedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localisedFormat);
export function formatDateString(dateString) {
    return dayjs(dateString).format('DD/MM/YYYY LT');
}
