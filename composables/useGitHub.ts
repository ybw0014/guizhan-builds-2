import type { Project } from 'guizhan-builds-2-data';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import rehypeExternalLinks from '~/plugins/rehype/rehype-external-links';
import rehypeGithubLinks from '~/plugins/rehype/rehype-github-links';

export function isMainBranch(branch: string): boolean {
  return ['master', 'main'].includes(branch);
}

export async function useGitHubReadme(project: Project): Promise<Ref<string | null>> {
  // 从 jsdelivr 获取
  const { data: data2 } = await useFetch(`https://cdn.jsdelivr.net/gh/${project.author}/${project.repository}@${project.branch}/README.md`);
  useProjectReadmeLog(`fetched from cdn.jsdelivr.net, ${data2.value !== null ? 'success' : 'failed'}`);
  if (data2.value) {
    return ref(data2.value as string);
  }

  return ref(null);
}

export async function useGitHubReadmeParsed(project: Project): Promise<Ref<string | null>> {
  const readme = await useGitHubReadme(project);
  if (readme.value === null) {
    return ref(null);
  }
  const parsed = await remark()
    .use(remarkGfm)
    .use(remarkGemoji)
    .use(remarkRehype, {
      allowDangerousHtml: true
    })
    .use(rehypeRaw)
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        code: [...(defaultSchema.attributes?.code || []), ['className', 'language-java', 'language-xml', 'language-md']]
      }
    })
    .use(rehypeExternalLinks)
    .use(rehypeHighlight)
    .use(rehypeGithubLinks, {
      repo: `${project.author}/${project.repository}`,
      branch: project.branch
    })
    .use(rehypeStringify)
    .process(readme.value);
  return ref(String(parsed.value));
}
