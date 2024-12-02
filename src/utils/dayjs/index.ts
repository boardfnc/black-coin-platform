import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(duration);

export default dayjs;
