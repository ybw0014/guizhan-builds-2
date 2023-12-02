import type { Plugin } from 'unified';
import type { Root } from 'hast';
import { visit } from 'unist-util-visit';
import _ from 'lodash';

export interface Options {
  repo: string;
  branch: string;
}

interface LinkNode {
  type: 'element';
  tagName: string;
  properties: {
    [attr: string]: string;
  };
}

const defaultOptions: Partial<Options> = {};

const plugin: Plugin<[Options?], Root> = (options?: Partial<Options>) => {
  const finalOptions = _.defaults(options, defaultOptions);
  return (tree: any) => {
    visit(tree, { type: 'element', tagName: 'a' }, (node) => {
      const linkNode = node as any as LinkNode;
      if (!linkNode.properties) {
        return;
      }
      const href = linkNode.properties.href;
      if (!href || typeof href !== 'string' || href.startsWith('/external')) {
        return;
      }
      const link = new URL((finalOptions.repo || '/') + `/tree/${finalOptions.branch}/${href}`, 'https://github.com/').toString();
      linkNode.properties.href = '/external?link=' + encodeURIComponent(link);
      linkNode.properties.target = '_blank';
    });
  };
};

export default plugin;
