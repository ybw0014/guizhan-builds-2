import { Author } from 'guizhan-builds-data'
import { RouteLocationRaw } from 'vue-router'

export function useAuthor(author: string, projects = 0): Author {
  if (author.startsWith('@')) {
    // 指向作者 GitHub 页面
    return getGitHubAuthor(author, projects)
  } else {
    // 指向作者站内页面
    return getLocalAuthor(author, projects)
  }
}

function getGitHubAuthor(name: string, projects: number): Author {
  const author = name.slice(1)
  return {
    name: author,
    href: `https://github.com/${author}`,
    target: '_blank',
    projects,
  }
}

function getLocalAuthor(name: string, projects: number): Author {
  return {
    name: name,
    href: {
      name: 'author',
      params: {
        author: name,
      },
    } as RouteLocationRaw,
    target: '_self',
    projects,
  }
}
