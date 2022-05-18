<script setup>
import { ref } from 'vue'

import ChooseCorresponding from '../components/ChooseCorresponding.vue';

import IconSpeaker from '../components/icons/IconSpeaker.vue'
import IconSpeakerMute from '../components/icons/IconSpeakerMute.vue'
import IconSpeech from '../components/icons/IconSpeech.vue'
import IconSpeechMute from '../components/icons/IconSpeechMute.vue'
import IconBackArrows from '../components/icons/IconBackArrows.vue'

import { getSelected, sanitizeItems, getNbAnswers, rand } from '../utils.js'

const isMuted = ref(false);
const isKanasMuted = ref(false);

let items = getSelected();
sanitizeItems(items);

const category = ref();
const answers = ref();
const goodAnswer = ref();


function chooseItems(category) {
  let answers = [];
  let curr;
  const nbAnswers = getNbAnswers();
  const nb = category.length >= nbAnswers ? nbAnswers : category.length;
  // Pick nb randoms symbol
  while (answers.length < nb) {
    curr = category[rand(0, category.length-1)];
    if (!(answers.includes(curr))) {
      answers.push(curr);
    }
  }
  const goodAnswer = answers[rand(0, answers.length-1)];
  return [answers, goodAnswer];
}

function chooseCategory() {
  const keys = Object.keys(items);
  const type = keys[rand(0, keys.length-1)];
  return items[type];
}

function startGame() {
	category.value = chooseCategory();
	[answers.value, goodAnswer.value] = chooseItems(category.value);
}

function swapIsMuted() {
  isMuted.value = !isMuted.value;
}

function swapIsKanasMuted() {
  isKanasMuted.value = !isKanasMuted.value;
}

startGame();

</script>

<template>
  <ChooseCorresponding :answers="answers" :goodAnswer="goodAnswer" :category="category" :isKanasMuted="isKanasMuted" :isMuted="isMuted" @response="() => startGame()" />
  <div id="icon-bar">
    <div id="backarrows-bar" title="Go back to kanas selection">
      <IconBackArrows class="icon" @click="this.$router.push({ name:'home' })" />
    </div>
    <div id="sound-bar">
      <div id="soundKanas" title="Mute/unmute kanas sounds">
        <IconSpeech :class="{ hidden : isKanasMuted == true }" @click="swapIsKanasMuted()" class="icon"/>
        <IconSpeechMute class="icon" :class="{ hidden : isKanasMuted == false }"  @click="swapIsKanasMuted()"/>
      </div>
      <div id="soundSystem" title="Mute/unmute right and wrong answers sounds">
        <IconSpeaker :class="{ hidden : isMuted == true }" @click="swapIsMuted()" class="icon"/>
        <IconSpeakerMute class="icon" :class="{ hidden : isMuted == false }"  @click="swapIsMuted()"/>
      </div>
    </div>
  </div>


</template>

<style>
#icon-bar, #sound-bar {
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
}

.hidden {
  display: none;
}
</style>








