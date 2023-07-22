export function useR2AssetPath(path: string): Ref<string> {
  return ref(new URL(path, `https://${useR2Host().value}/`).toString());
}

export function useR2Host(): Ref<string> {
  const nuxtApp = useNuxtApp();
  let host = "";
  if (process.server) {
    host = nuxtApp.ssrContext?.event.node.req.headers.host as string;
  } else {
    host = window.location.host;
  }
  // 设置 r2 host
  let r2Host = "builds-r2.gzassets.net";
  if (host === "builds.guizhanss.cn") {
    r2Host = "builds-r2.gzassets.cn";
  }
  return ref(r2Host);
}
