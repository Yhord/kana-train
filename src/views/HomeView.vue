<script setup>
import { ref } from 'vue'
import ClickableArray from '../components/ClickableArray.vue';

import layoutHiragana from '../assets/layout_hiragana.json'
import layoutKatakana from '../assets/layout_katakana.json'
import LogoKanaTrain from '../assets/LogoKanaTrain.vue'

import { getSelected, setSelected } from '../utils.js'

let sItems = ref(getSelected());

function setCookie() {
  setSelected(sItems.value);
}
</script>

<template>
  <header>
    <LogoKanaTrain/>
    <h2>Select kanas you want to practice</h2>
  </header>

  <main>
    <ClickableArray :layout="layoutHiragana[0]" type="hiragana" @response="(msg) => sItems.hiragana = msg" />
    <ClickableArray :layout="layoutKatakana[0]" type="katakana" @response="(msg) => sItems.katakana = msg" />
  </main>
  
  <footer>
    <RouterLink to="/train" @click="setCookie()">Start training</RouterLink>
  </footer>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}

footer {
  float: right;
}

.clickable-array {
	margin-top: 10px;
	margin-bottom: 25px;
}
</style>
