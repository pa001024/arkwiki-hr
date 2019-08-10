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
