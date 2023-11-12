import { Plugin } from 'unified';
import { Root } from 'hast';
import { visit } from 'unist-util-visit';
import _ from 'lodash';

export interface Options {
  prefix?: string[];
}

interface LinkNode {
  type: 'element';
  tagName: string;
  properties: {
    [attr: string]: string;
  };
}

const defaultOptions: Partial<Options> = {
  prefix: ['http', 'https']
};

const plugin: Plugin<[Options?], Root> = (options?: Partial<Options>) => {
  options = _.defaults(options, defaultOptions);
  return (tree: any) => {
    visit(tree, { type: 'element', tagName: 'a' }, (node) => {
      const linkNode = node as any as LinkNode;
      if (!linkNode.properties) {
        return;
      }
      const href = linkNode.properties.href;
      if (!href || typeof href !== 'string') {
        return;
      }
      const protocol = href.split(':')[0];
      if (!options?.prefix?.includes(protocol)) {
        return;
      }
      linkNode.properties.target = '_blank';
      linkNode.properties.href = '/external?link=' + encodeURIComponent(href);
    });
  };
};

export default plugin;
