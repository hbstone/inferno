import isArray from '../../util/isArray';
import { getValueWithIndex } from '../../core/variables';
import { updateKeyed } from '../domMutate';
import { addDOMDynamicAttributes, updateDOMDynamicAttributes } from '../addAttributes';

export default function createNodeWithDynamicSubTreeForChildren(templateNode, subTreeForChildren, dynamicAttrs, domNamespace) {
	let domNode;
	const node = {
		create(item, treeLifecycle) {
			domNode = templateNode.cloneNode(false);
			if (subTreeForChildren != null) {
				if (isArray(subTreeForChildren)) {
					for (let i = 0; i < subTreeForChildren.length; i++) {
						const subTree = subTreeForChildren[i];
						domNode.appendChild(subTree.create(item, treeLifecycle));
					}
				} else if (typeof subTreeForChildren === 'object') {
					domNode.appendChild(subTreeForChildren.create(item, treeLifecycle));
				}
			}
			if (dynamicAttrs) {
				addDOMDynamicAttributes(item, domNode, dynamicAttrs);
			}
			return domNode;
		},
		update(lastItem, nextItem, treeLifecycle) {
			if (subTreeForChildren != null) {
				if (isArray(subTreeForChildren)) {
					for (let i = 0; i < subTreeForChildren.length; i++) {
						const subTree = subTreeForChildren[i];
						subTree.update(lastItem, nextItem, treeLifecycle);
					}
				} else if (typeof subTreeForChildren === 'object') {
					subTreeForChildren.update(lastItem, nextItem, treeLifecycle);
				}
			}
			if (dynamicAttrs) {
				updateDOMDynamicAttributes(lastItem, nextItem, domNode, dynamicAttrs);
			}
		},
    remove(item, treeLifecycle) {
      if (subTreeForChildren != null) {
        if (isArray(subTreeForChildren)) {
          for (let i = 0; i < subTreeForChildren.length; i++) {
            const subTree = subTreeForChildren[i];
            subTree.remove(item, treeLifecycle);
          }
        } else if (typeof subTreeForChildren === 'object') {
          subTreeForChildren.remove(item, treeLifecycle);
        }
      }
    }
	};
	return node;
}
