import { md5 } from './md5';

// api for wiki

/** 获取对应图片真实地址 */
export const wikiImageUrl = (name: string, thumbSize: number | string = '') => {
  name = name[0].toUpperCase() + name.substr(1);
  const hash = md5(name);
  if (typeof thumbSize === 'number') thumbSize = thumbSize + 'px';
  return thumbSize
    ? `//huiji-thumb.huijistatic.com/arknights/uploads/thumb/${hash.substr(0, 1)}/${hash.substr(0, 2)}/${name}/${thumbSize}-${name}`
    : `//huiji-public.huijistatic.com/arknights/uploads/${hash.substr(0, 1)}/${hash.substr(0, 2)}/${name}`;
};

/** 解析Wikitext */
export const parseWikitext = async (wikitext: string) => {
  const url = 'https://arknights.huijiwiki.com/api/rest_v1/transform/wikitext/to/html';
  const body = new FormData();
  body.append('wikitext', wikitext);
  body.append('body_only', 'true');
  const data = await fetch(url, {
    method: 'POST',
    body,
  }).then(response => response.text());
  return data.replace(/^<p id="mwAQ">|<\/p>$/g, '');
};
/** 解析图片以显示未进入缓存的缩略图 */
export const preloadWikiImage = (file: string, size: number) => {
  return parseWikitext(`[[File:${file}|${size}px]][[File:${file}|${size*2}px]]`);
};

window['parseWikitext'] = parseWikitext;
