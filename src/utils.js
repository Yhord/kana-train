import Cookies from 'js-cookie'
import kanaData from './assets/kana.json'

const kana = kanaData;
const nbMinAnswers = 1;
const nbAnswers = 4;

function getDefault(p) {
	switch(p) {
		case 'hiragana':
			return ["あ", "い", "う", "え", "お"];
		case 'katakana':
			return ["ア", "イ", "ウ", "エ", "エ"];
		default:
			return ["あ", "い", "う", "え", "お"];
		}
}

export function getSelected() {
	let selectedItemsCookie = Cookies.get('selectedItems');
	if (selectedItemsCookie == undefined || selectedItemsCookie === 'undefined') {
		let s = {'hiragana': getDefault('hiragana')};
		setSelected(s);
		selectedItemsCookie = Cookies.get('selectedItems');
	}
	return JSON.parse(selectedItemsCookie);
}

export function getSelectedFromType(t) {
	return getSelected()[t] != undefined ? getSelected()[t] : [];
}

export function setSelected(selectedItems) {
	Cookies.set('selectedItems', JSON.stringify(selectedItems), {expires: 7, path: ''})
}

export function getNbAnswers() {
	return nbAnswers;
}

export function getNbMinAnswers() {
	return nbMinAnswers;
}

export function getKanaData(s) {
	for (let i=0; i < kana.length; i++) {
		if (Object.values(kana[i]).includes(s)) {
			return kana[i];
		}
	}
	return 'ゐ';
}

export function isObsolete(s) {
	return s == "ゐ" | s == "ゑ" | s == "ヰ" | s == "ヱ";
}

export function getAllKana() {
	let t = [];
	for (let i=0; i < kana.length; i++) {
		t.push(Object.values(kana[i])[0])
	}
	return t;
}

export function sanitizeItems(obj) {
	const keys = Object.keys(obj);
	for (let i=0; i<keys.length; i++) {
		if (!['hiragana', 'katakana'].includes(keys[i]) || obj[keys[i]].length == 0) {
			delete obj[keys[i]]
		}
		if (obj[keys[i]] != undefined && obj[keys[i]].length < nbMinAnswers) {
			obj[keys[i]] = getDefault(keys[i]);
		}
	}
	if (Object.keys(obj).length == 0) {
		obj['hiragana'] = getDefault('hiragana');
	}
}

export function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}