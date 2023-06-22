import { Project, Author } from 'guizhan-builds-data'

export function useAuthors(projects: Project[]) {
  const authors: Map<string, Author> = new Map()
  projects.forEach((project) => {
    if (!authors.has(project.author)) {
      authors.set(project.author, useAuthor(project.author, 1))
    } else {
      const author = authors.get(project.author) as Author
      author.projects++
    }
    if (project.displayOptions?.authors) {
      project.displayOptions.authors.forEach((author) => {
        if (!authors.has(author)) {
          authors.set(author, useAuthor(author, 1))
        } else {
          const author1 = authors.get(author) as Author
          author1.projects++
        }
      })
    }
  })
  return Array.from(authors.values())
}

export function useAuthor(author: string, projects = 0): Author {
  return {
    name: author,
    projects,
  }
}
