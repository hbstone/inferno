import template from './';
import eventMapping from '../shared/eventMapping';
import addListener from './events/addListener';
import setValueForStyles from './setValueForStyles';
import { getValueWithIndex } from '../core/variables';

/**
 * Set HTML attributes on the template
 * @param{ HTMLElement } node
 * @param{ Object } attrs
 */
export function addDOMStaticAttributes(vNode, domNode, attrs) {
	
	let styleUpdates;
	
	for (let attrName in attrs) {
		const attrVal = attrs[attrName];

		if (attrVal) {
			if ( attrName === 'style') {
                 
				 styleUpdates = attrVal;
			
			} else {
			template.setProperty(vNode, domNode, attrName, attrVal, false);
			}
		}
	}
	
	if ( styleUpdates) {
		setValueForStyles(vNode, domNode, styleUpdates);
	}
}

// A fast className setter as its the most common property to regularly change
function fastPropSet(attrName, attrVal, domNode) {
	if (attrName === 'class' || attrName === 'className') {
		if (attrVal != null) {
			domNode.className = attrVal;
		}
		return true;
	} else if (attrName === 'ref') {
		attrVal.element = domNode;
		return true;
	}
	return false;
}

export function addDOMDynamicAttributes(item, domNode, dynamicAttrs) {
	if (dynamicAttrs.index !== undefined) {
		dynamicAttrs = getValueWithIndex(item, dynamicAttrs.index);
		addDOMStaticAttributes(item, domNode, dynamicAttrs);
		return;
	}
	let styleUpdates;
	
	for (let attrName in dynamicAttrs) {
		let attrVal = getValueWithIndex(item, dynamicAttrs[attrName]);

		if (attrVal !== undefined) {
			if ( attrName === 'style') {
				 styleUpdates = attrVal;
			} else {
				if (fastPropSet(attrName, attrVal, domNode) === false) {
					if (eventMapping[attrName]) {
						addListener(item, domNode, eventMapping[attrName], attrVal);
					} else {
						template.setProperty(item, domNode, attrName, attrVal, true);
					}
				}
		    }
		}
	}
	if ( styleUpdates) {
		setValueForStyles(item, domNode, styleUpdates);
	}
}

export function updateDOMDynamicAttributes(lastItem, nextItem, domNode, dynamicAttrs) {
	if (dynamicAttrs.index !== undefined) {
		const nextDynamicAttrs = getValueWithIndex(nextItem, dynamicAttrs.index);
		addDOMStaticAttributes(nextItem, domNode, nextDynamicAttrs);
		return;
	}
	let styleUpdates;
	
	for (let attrName in dynamicAttrs) {
		const lastAttrVal = getValueWithIndex(lastItem, dynamicAttrs[attrName]);
		const nextAttrVal = getValueWithIndex(nextItem, dynamicAttrs[attrName]);

		if (lastAttrVal !== nextAttrVal) {
			if (nextAttrVal !== undefined) {
				if ( attrName === 'style') {
					styleUpdates = attrVal;
				} else {
					if (fastPropSet(attrName, nextAttrVal, domNode) === false) {
						if (eventMapping[attrName]) {
							addListener(nextItem, domNode, eventMapping[attrName], nextAttrVal);
						} else {
							template.setProperty(nextItem, domNode, attrName, nextAttrVal, true);
						}
					}
			    }
			}
		}
	}
    if ( styleUpdates) {
		setValueForStyles(vNode, domNode, styleUpdates);
	}	
}