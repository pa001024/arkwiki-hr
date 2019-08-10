import hr from './hr.data';
import { HRFilter, HRInfo } from './hr.i';

export interface HRMatchGroup {
  name: string;
  pattens: string[];
  matched: HRInfo[];
}

export class HRSystem {
  // TODO: 改为从API导入
  charlist: HRInfo[] = hr;

  /** 过滤符合条件的干员 */
  filterChars(filters: HRFilter) {
    return this.charlist.filter(char => this.testChar(char, filters));
  }

  testChar(char: HRInfo, filters: HRFilter) {
    // 过滤稀有度
    if (filters.rairties.length) {
      const list = filters.rairties.map(
        v =>
          ({
            一星干员: 1,
            新手: 2,
            三星干员: 3,
            四星干员: 4,
            资深干员: 5,
            高级资深干员: 6,
          }[v])
      );
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

  matchChar(char: HRInfo, filters: HRFilter) {
    const matched: HRFilter = {
      genders: [],
      locations: [],
      professions: [],
      tags: [],
      rairties: [],
      methods: [],
    };
    // TODO:
    return {
      matched: false,
      genders: [],
      locations: [],
      professions: [],
      tags: [],
      rairties: [],
      methods: [],
    };
  }

  /** 按公招规则输出tag列表和干员列表 */
  reduceChars(filters: HRFilter) {
    const filtered = this.filterChars(filters);
    const groups = {
      matched: filtered.filter(v => {
        return v;
      }),
      wildcard: [],
    };

    return groups;
  }
}
