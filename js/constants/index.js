export const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api';

export const METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

export const FILTER = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

const _REVERSE_FILTER = {
  all: 'ALL',
  active: 'ACTIVE',
  completed: 'COMPLETED',
};

const FILTER_TEXT = {
  ALL: '전체 보기',
  ACTIVE: '해야할 일',
  COMPLETED: '완료한 일',
};

export const GET_FILTER_TEXT = (filterStr) =>
  FILTER_TEXT[_REVERSE_FILTER[filterStr]];

export const MESSAGES = {
  ADD_USER: '추가하고 싶은 이름을 입력해주세요.',
  FAILED_ADD_USER: '이름은 최소 2글자 이상이어야 합니다.',
};

export const MINIMUM_USER_NAME_LENGTH = 2;

export const HTML_TAG_NAMES = [
  'a',
  'abbr',
  'acronym',
  'address',
  'applet',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'basefont',
  'bdi',
  'bdo',
  'big',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'center',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'font',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'meta',
  'meter',
  'nav',
  'noframes',
  'noscript',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strike',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'svg',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'tt',
  'u',
  'ul',
  'video',
  'wbr',
];
