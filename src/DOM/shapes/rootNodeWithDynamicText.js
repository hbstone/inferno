import { isRecyclingEnabled, recycle } from '../recycling';
import { getValueWithIndex } from '../../core/variables';
import { addDOMDynamicAttributes, updateDOMDynamicAttributes } from '../addAttributes';
import recreateRootNode from '../recreateRootNode';

const recyclingEnabled = isRecyclingEnabled();

export default function createRootNodeWithDynamicText(templateNode, valueIndex, dynamicAttrs) {
	const node = {
		pool: [],
		keyedPool: [],
		create(item) {
			let domNode;

			if (recyclingEnabled) {
				domNode = recycle(node, item);
				if (domNode) {
					return domNode;
				}
			}
			domNode = templateNode.cloneNode(false);
			const value = getValueWithIndex(item, valueIndex);

			if(value != null) {
				domNode.textContent = value;
			}
			if (dynamicAttrs) {
				addDOMDynamicAttributes(item, domNode, dynamicAttrs);
			}
			item.rootNode = domNode;
			return domNode;
		},
		update(lastItem, nextItem, treeLifecycle) {
			if (node !== lastItem.domTree) {
				recreateRootNode(lastItem, nextItem, node, treeLifecycle);
				return;
			}
			const domNode = lastItem.rootNode;

			nextItem.rootNode = domNode;
			const nextValue = getValueWithIndex(nextItem, valueIndex);

			if (nextValue !== getValueWithIndex(lastItem, valueIndex)) {
				domNode.firstChild.nodeValue = nextValue;
			}
			if (dynamicAttrs) {
				updateDOMDynamicAttributes(lastItem, nextItem, domNode, dynamicAttrs);
			}
		},
    remove(lastItem) {

    }
	};
	return node;
}
