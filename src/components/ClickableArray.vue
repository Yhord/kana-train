<script setup>
import { ref } from 'vue'
import { getSelectedFromType, getKanaData, isObsolete } from '../utils.js'

const p = defineProps(['layout', 'type']);
const emit = defineEmits(['response'])

let selectedItems = ref(getSelectedFromType(p.type));
let allSelected = ref(getAll().every((item) => selectedItems.value.includes(item)));
let columns = ref(new Array(p.layout.tbody[0].length+1).fill(false));
initColumns()

function send()  {
  emit('response', selectedItems.value);
}

function initColumns() {
  for(let j=0; j<p.layout.tbody[0].length; j++) {
    columns.value[j] = getColumn(j).every(el => {
      return selectedItems.value.includes(el);
    });
  }
}

// Return all the items in a table, line per line
function getAll() {
  let t = [];
  for (let i=0; i<p.layout.tbody.length; i++) {
    for (let j=0; j<p.layout.tbody[i].length; j++) {
      let curr = p.layout.tbody[i][j];
      if (curr != '' & !isObsolete(curr)) {
        t.push(curr);
      }
    }
  }
  return t;
}

function getColumn(j = 0) {
  let t = [];
  for (let i=0; i<p.layout.tbody.length; i++) {
    let curr = p.layout.tbody[i][j];
    if (curr != '' & !isObsolete(curr)) {
      t.push(curr);
    }
  } 
  return t;
}

function whichColumn(item) {
  for(let i=0; i<p.layout.tbody.length; i++) {
    for(let j=0; j<p.layout.tbody[0].length; j++) {
      if(p.layout.tbody[i][j].includes(item)) {
        return j;
      }
    }
  }
  return -1; 
}

function selectColumn(j) {
  if (columns.value[j] === false) {
    selectedItems.value = selectedItems.value.concat(getColumn(j));
  }
  else {
    selectedItems.value = selectedItems.value.filter((el) => !getColumn(j).includes(el));
  }
  columns.value[j] = !columns.value[j]
  send();
}

function selectAll() {
  selectedItems.value = !allSelected.value ? getAll() : [];
  columns.value = !allSelected.value ? new Array(p.layout.tbody[0].length+1).fill(true) : new Array(p.layout.tbody[0].length+1).fill(false);
  send();
}

function singleChange(item) {
  allSelected.value = selectedItems.value.length != getAll().length ? false : true;
  columns.value[whichColumn(item)] = getColumn(whichColumn(item)).every(el => {
    return selectedItems.value.includes(el);
  });
  send();
}
</script>

<template>
    <div class="clickable-array">
      <div class="title-bar">
        <h2 v-if="p.layout.name">{{p.layout.name}}</h2>
        <span><input :id="p.type + '-checkAll'" class="checkbox-interact" type="checkbox" @click="selectAll()" v-model="allSelected" /><label :for="p.type + '-checkAll'"> All</label></span>
      </div>
      <table>
        <thead v-if="p.layout.thead">
            <tr>
              <th v-for="h in p.layout.thead" :key="h">{{h}}</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="i in Math.ceil(p.layout.tbody.length)" :key="i">
            <td v-for="item in p.layout.tbody[i-1]" :key="item">
                  <input v-if="item" type="checkbox" class="checkboxButton" :id="item" :value="item" v-model="selectedItems" @change="singleChange(item)">
                  <label v-if="item" :for="item">
                    <ruby v-if="isObsolete(item)" title="obsolete">({{item}})<rt>{{getKanaData(item).romaji}}</rt></ruby>
                    <ruby v-else>{{item}}<rt>{{getKanaData(item).romaji}}</rt></ruby>
                  </label>
              </td>
          </tr>
        </tbody>
          <tr>
            <th v-for="j in Math.ceil(p.layout.tbody[0].length)" :key="j">
              <input :id="j-1" class="checkbox-interact" @click="selectColumn(j-1)" v-model="columns[j-1]" type="checkbox"/>
            </th>
          </tr>
        </table>
    </div>
</template>

<style>
.clickable-array {
  /*overflow-x: scroll;*/
}

.checkbox-interact {
  accent-color: rgb(117, 226, 117);
  cursor: pointer;
}

.title-bar {
	display: flex;
  justify-content: space-between;
  width: inherit;
	line-height: 8px;
}

/* TABLE */
table {
	border-collapse: collapse;
	border-spacing: 0;
}

td {
  width: 50px;
	height: 50px;
	font-size:x-large;
  border: 1px solid black;
	text-align: center;
}

.checkboxButton:not(:checked), .checkboxButton:checked {
  position: absolute;
  left: -9999%;
}
.checkboxButton + label {
  display: inline-block;
  cursor: pointer;
  background-color: white;
}

.checkboxButton:not(:checked) + label:hover, .checkboxButton:checked + label:hover {
  background-color: rgb(117, 226, 117);
}

.checkboxButton:checked + label {
	background-color: palegreen;
}

label {
  min-width: 100%;
  min-height: 100%;
}
</style>