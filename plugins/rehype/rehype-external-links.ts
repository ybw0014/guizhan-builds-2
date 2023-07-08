import type { Transformer } from 'unified'
import { visit } from 'unist-util-visit'
import type { Node, Data } from 'unist'
import _ from 'lodash'

interface Options {
  prefix?: string[]
}

interface LinkNode {
  type: 'element'
  tagName: string
  properties: {
    [attr: string]: string
  }
}

const defaultOptions: Partial<Options> = {
  prefix: ['http', 'https']
}

export default function rehypeExternalLinks(options?: Partial<Options>): Transformer {
  options = _.defaults(options, defaultOptions)

  return async function transformer(tree: Node<Data>): Promise<Node> {
    const linkNodes: LinkNode[] = []

    visit(tree, { type: 'element', tagName: 'a' }, (node: Node) => {
      linkNodes.push(node as any as LinkNode)
    })

    linkNodes.forEach((node) => {
      if (!node.properties) {
        return
      }

      const href = node.properties.href
      if (!href || typeof href !== 'string') {
        return
      }

      const protocol = href.split(':')[0]

      if (!options?.prefix?.includes(protocol)) {
        return
      }

      node.properties.target = '_blank'
      node.properties.href = '/external?link=' + encodeURIComponent(href)
    })

    return tree
  }
}
