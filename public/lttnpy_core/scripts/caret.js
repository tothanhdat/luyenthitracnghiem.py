/**
 * @file get/set caret position and insert text
 * @author islishude
 * @license MIT
 */
class Caret {
	/**
	 * get/set caret position
	 * @param {HTMLColletion} target
	 */
	constructor(target) {
		this.isContentEditable = target && target.contentEditable
		this.target = target
	}
	/**
	 * get caret position
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Range}
	 * @returns {number}
	 */
	getPos() {
		// for contentedit field
		if (this.isContentEditable) {
			this.target.focus()
			let _range = document.getSelection().getRangeAt(0)
			let range = _range.cloneRange()
			range.selectNodeContents(this.target)
			range.setEnd(_range.endContainer, _range.endOffset)
			return range.toString().length;
		}
		// for texterea/input element
		return this.target.selectionStart
	}

	/**
	 * set caret position
	 * @param {number} pos - caret position
	 */
	setPos(pos) {
		// for contentedit field
		if (this.isContentEditable) {
			this.target.focus()
			document.getSelection().collapse(this.target, pos)
			return
		}
		this.target.setSelectionRange(pos, pos)
	}
}

/**
 * insert text or orther to editor
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
 * @module Editor
 */
class Editor {
	constructor() {

	}
	/**
	 * @param {string} content - your insert text
	 * @returns {boolean}
	 */
	insertText(content) {
		document.execCommand('insertText', false, content)
	}
}

var setSelectionRange = function(element, start, end) {
	var rng = document.createRange(),
		sel = getSelection(),
		n, o = 0,
		tw = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, null);
	while (n = tw.nextNode()) {
		o += n.nodeValue.length;
		if (o > start) {
			rng.setStart(n, n.nodeValue.length + start - o);
			start = Infinity;
		}
		if (o >= end) {
			rng.setEnd(n, n.nodeValue.length + end - o);
			break;
		}
	}
	sel.removeAllRanges();
	sel.addRange(rng);
};

var setCaret = function(element, index) {
	setSelectionRange(element, index, index);
};
