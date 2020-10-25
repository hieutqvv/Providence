import {addLocaleData} from 'react-intl';
import localeEn from 'react-intl/locale-data/en';
import localeJa from 'react-intl/locale-data/ja';
import ja from './lang/ja.js';

const locale = 'ja';
const timezone = 'Asia/tokyo';
const messages = {ja};

addLocaleData([...localeEn, ...localeJa]);

export default {
  messages: messages[locale],
  locale: locale,
  timezone: timezone
};
