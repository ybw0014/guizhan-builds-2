export function useDayjsLocalized() {
  const dayjs = useDayjs();
  try {
    switch (useI18n().locale.value) {
      case "zh-CN":
        dayjs.locale("zh-cn");
        break;
      case "zh-TW":
        dayjs.locale("zh-tw");
        break;
      default:
        dayjs.locale("en");
    }
  } catch (e) {
    dayjs.locale("en");
  }
  return dayjs;
}
