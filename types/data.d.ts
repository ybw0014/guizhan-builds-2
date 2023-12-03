declare module 'guizhan-builds-2-data-extra' {
  interface Author extends Record<string, any> {
    name: string;
    projects: number;
  }

  interface MinecraftVersionString {
    major: number;
    minor: number;
    appendix?: string;
  }
}
