declare namespace mw {
  interface UserInfo {
    id: number;
    name: string;
    groups: string[];
    rights: string[];
  }
  type TokenType = 'block' | 'createaccount' | 'csrf' | 'delete' | 'edit' | 'email' | 'import' | 'login' | 'move' | 'options' | 'patrol' | 'protect' | 'rollback' | 'unblock' | 'userrights' | 'watch';
  class Api {
    abort: () => Promise<any>;
    ajax: (parameters: object, ajaxOptions: object) => Promise<any>;
    get: (parameters: object, ajaxOptions: object) => Promise<any>;
    post: (parameters: object, ajaxOptions: object) => Promise<any>;
    badToken: (type: string) => Promise<any>;
    /** 获取令牌 */
    getToken: (type: TokenType, assert: object) => Promise<string>;
    postWithToken: (tokenType: TokenType, params: object, ajaxOptions: object) => Promise<any>;
    /** 预处理参数 */
    preprocessParameters: (parameters: { [x: string]: any }, useUS: boolean) => Promise<any>;
    /** 保存选项 */
    saveOption: (name: string, value: any) => Promise<any>;
    /** 保存多个选项 */
    saveOptions: (options: { [x: string]: any }) => Promise<any>;
    /** 监视页面 */
    watch: (pages: string[]) => Promise<any>;
    /** 解除监视页面 */
    unwatch: (pages: string[]) => Promise<any>;
    /** 获取用户信息 */
    getUserInfo: () => Promise<UserInfo>;
  }
}
