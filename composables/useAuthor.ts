import { Author } from 'guizhan-builds-data'

export function useAuthor(author: string, projects = 0): Author {
  return {
    name: author,
    projects,
  }
}
