import dayjs, { ConfigType } from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/zh-cn";
import "dayjs/locale/zh-tw";

dayjs.extend(localizedFormat);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      dayjs: (cfg?: ConfigType) => {
        switch(useI18n().locale.value) {
          case "zh-Hans":
            dayjs.locale("zh-cn");
            break;
          case "zh-Hant":
            dayjs.locale("zh-tw");
            break;
          default:
            dayjs.locale("en");
        }
        return dayjs(cfg);
      },
      dayjsR: (cfg?: ConfigType) => {
        return dayjs(cfg);
      }
    }
  };
});
