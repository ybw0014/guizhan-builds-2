export interface GlobalState {
  isLoading: boolean;
  isLogin: boolean;
  csrfToken: string;
  language: string; // zh-CN | en-US
  isFullScreen: boolean;
  agreeLicense: boolean;
  hasNewVersion: boolean;
  ignoreCaptcha: boolean;
}
