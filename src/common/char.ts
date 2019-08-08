import hr from './hr.data';
import { HRFilter, HRInfo } from './hr.i';

export interface HRMatchGroup {
  name: string;
  pattens: string[];
  matched: HRInfo[];
}

export class HRSystem {
  charlist: HRInfo[] = hr;

  /** 过滤符合条件的干员 */
  filterChars(filters: HRFilter) {
    return this.charlist.filter(char => {
      // 过滤稀有度
      if (filters.rairties.length) {
        const list = filters.rairties.map(v => ({ 新手: 2, 资深干员: 5, 高级资深干员: 6 }[v]));
        if (list.length && !list.includes(char.star)) return false;
      }
      // 过滤性别
      if (filters.genders.length === 1 && char.sex && filters.genders[0] === '男') return false;
      // 过滤招募方式
      if (filters.methods.length) {
        const code = filters.methods.reduce((r, v) => r | { 公开招募: 2, 干员寻访: 1 }[v], 0);
        if (!(code & char.pub)) return false;
      }
      // 过滤tag
      const tags = [...filters.tags, ...filters.locations];
      if (tags.length) {
        if (!char.tags.some(tag => tags.includes(tag))) return false;
      }
      // 至此无关的干员已被过滤完成
      return true;
    });
  }

  /** 按公招规则输出tag列表和干员列表 */
  reduceChars(filters: HRFilter, list: HRInfo[]) {
    const filtered = this.filterChars(filters);
    const groups = {
      matched: [],
      wildcard: [],
    };

    return groups;
  }
}
