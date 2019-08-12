import hr from './hr.data';
import { HRFilter, HRInfo } from './hr.i';
import { map } from 'lodash-es';

export interface ReducedHRInfo {
  matched: { [key: string]: HRInfo[] };
  wildcard: { [key: string]: HRInfo[] };
}

export interface MatchedHRInfo {
  char: HRInfo;
  exact: boolean;
  tags: string[];
  title: string;
}

enum Rairty {
  一星干员 = 1,
  新手 = 2,
  三星干员 = 3,
  四星干员 = 4,
  资深干员 = 5,
  高级资深干员 = 6,
}

export class HRSystem {
  // TODO: 改为从API导入
  charlist: HRInfo[] = hr;

  /** 过滤符合条件的干员 */
  filterChars(filters: HRFilter) {
    return this.charlist.filter(char => this.testChar(char, filters));
  }

  /** 测试一个干员是否符合条件 (wildcard) */
  testChar(char: HRInfo, filters: HRFilter) {
    // 过滤稀有度
    if (filters.rairties.length && filters.rairties.length !== 6) {
      const list = filters.rairties.map(v => Rairty[v]);
      if (list.length && !list.includes(char.r)) return false;
    }
    // 过滤性别
    if (filters.genders.length === 1 && !!char.sex !== (filters.genders[0] === '男')) return false;
    // 过滤招募方式
    if (filters.methods.length) {
      const code = filters.methods.reduce((r, v) => r | { 干员寻访: 1, 公开招募: 2 }[v], 0);
      if (code === 2 && char.r === 6 && !filters.rairties.includes('高级资深干员')) return false;
      if (!(code & char.pool)) return false;
    }
    // 过滤职业
    if (filters.professions.length) {
      if (!filters.professions.includes(char.job)) return false;
    }
    // 过滤tag
    const tags = [...filters.locations, ...filters.tags];
    if (tags.length) {
      if (!char.tags.some(tag => tags.includes(tag))) return false;
    }
    return true;
  }

  /** 匹配干员符合条件的项目 */
  matchChar(char: HRInfo, filters: HRFilter) {
    let exact = true;
    const charTags = [...char.tags, Rairty[char.r], char.sex ? '男' : '女', , char.job];
    const matchedTags = map(filters, (tags, type) => {
      if (type === 'methods') return [];
      return tags.filter(tag => {
        const isInChar = charTags.includes(tag);
        if (!isInChar) exact = false;
        return isInChar;
      });
    }).reduce((a, b) => a.concat(b));

    return { char, exact, tags: matchedTags, title: matchedTags.join('+') } as MatchedHRInfo;
  }

  /** 按公招规则输出tag列表和干员列表 */
  reduceChars(filters: HRFilter) {
    const filtered = this.charlist
      .filter(char => {
        if (filters.methods.length) {
          const code = filters.methods.reduce((r, v) => r | { 干员寻访: 1, 公开招募: 2 }[v], 0);
          if (code === 2 && char.r === 6 && !filters.rairties.includes('高级资深干员')) return false;
          if (!(code & char.pool)) return false;
        }
        return true;
      })
      .map(char => this.matchChar(char, filters))
      .filter(v => v.title);
    const groups: ReducedHRInfo = {
      matched: filtered.reduce((r, v) => {
        if (v.exact) {
          if (!r[v.title]) r[v.title] = [v.char];
          else r[v.title].push(v.char);
        }
        return r;
      }, {}),
      wildcard: filtered.reduce((r, v) => {
        if (!v.exact) {
          if (!r[v.title]) r[v.title] = [v.char];
          else r[v.title].push(v.char);
        }
        return r;
      }, {}),
    };
    return groups;
  }
}
