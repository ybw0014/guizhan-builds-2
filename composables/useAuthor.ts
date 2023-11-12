import { Project } from 'guizhan-builds-2-data';
import { Author } from 'guizhan-builds-2-data-extra';
import _ from 'lodash';

export async function useAuthorList(): Promise<Ref<Author[] | null>> {
  const projects = await useProjects();
  const authors: Map<string, Author> = new Map();
  if (!projects.value) {
    return ref(null);
  }
  projects.value.forEach((project) => {
    if (!authors.has(project.author)) {
      authors.set(project.author, useAuthor(project.author, 1));
    } else {
      const author = authors.get(project.author) as Author;
      author.projects++;
    }
    if (project.displayOptions?.authors) {
      project.displayOptions.authors.forEach((author) => {
        if (!authors.has(author)) {
          authors.set(author, useAuthor(author, 1));
        } else {
          const author1 = authors.get(author) as Author;
          author1.projects++;
        }
      });
    }
  });
  return ref(Array.from(authors.values()));
}

export async function useAuthorProjects(author: string): Promise<Ref<Project[] | null>> {
  const projects = await useProjects();
  if (!projects.value) {
    return ref(null);
  }
  return ref(
    projects.value.filter((project) => {
      if (project.author === author) {
        return true;
      }
      if (project.displayOptions?.authors) {
        return project.displayOptions.authors.includes(author);
      }
      return false;
    })
  );
}

export async function useProjectAuthors(project: Project): Promise<Ref<Author[] | null>> {
  const authors = project.displayOptions?.authors || project.author;
  if (_.isArray(authors)) {
    const result: Author[] = [];
    authors.forEach((author) => {
      result.push(useAuthor(author));
    });
    return ref(result);
  } else {
    return ref([useAuthor(authors)]);
  }
}

export function useAuthor(author: string, projects = 0): Author {
  return {
    name: author,
    projects
  };
}
