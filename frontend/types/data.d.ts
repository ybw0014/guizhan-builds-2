declare module 'guizhan-builds-2-types-extra' {
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
