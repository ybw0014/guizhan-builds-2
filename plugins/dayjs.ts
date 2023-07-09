import dayjs, { ConfigType } from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/zh-cn";

dayjs.extend(localizedFormat);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      dayjs: (cfg?: ConfigType) => {
        useI18n().locale.value === "zh" ? dayjs.locale("zh-cn") : dayjs.locale("en");
        return dayjs(cfg);
      }
    }
  };
});
