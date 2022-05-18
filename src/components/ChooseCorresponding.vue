<script setup>
import { ref, watch } from 'vue'

import IconSpeaker from '../components/icons/IconSpeaker.vue'
import IconCheck from '../components/icons/IconCheck.vue'

import { getKanaData } from '../utils.js'

const p = defineProps(['answers', 'goodAnswer', 'category', 'isKanasMuted', 'isMuted']);
const emit = defineEmits(['response'])

const audioPath = '../kana-train/audio/general/';
const right = new Audio(audioPath + 'good_answer'  + '.mp3');
const wrong = new Audio(audioPath + 'negative_answer'  + '.mp3');


const isConfirmed = ref(0);
const choice = ref();

playKanasMuted(p.goodAnswer)

function playKanasMuted(choice) {
    if (!p.isKanasMuted) {
      playKanas(choice);
    }
}

function playKanas(choice) {
    try {
      new Audio('../kana-train/audio/kanas/' + getKanaData(choice).hiragana  + '.mp3').play();
    }
    catch (error) {
      console.error(error);
    }
}

function onChoice(choice) {
  playKanasMuted(choice)
}

function verifyUserAnswer() {
  if (!isConfirmed.value && !p.isMuted) {
    if (choice.value == p.goodAnswer) {
      right.play();
    }
    else {
      wrong.play();
    }
  }
  isConfirmed.value = true;
  }

function restartGame() {
	emit('response');
	choice.value = '';
	isConfirmed.value = 0;
}

watch(p, () => {
	playKanasMuted(p.goodAnswer)
})
</script>

<template>
 <div id="kanaFound" class="unselectable">
    <div class="header">
        <p>{{getKanaData(p.goodAnswer).romaji}}</p>
        <IconSpeaker class="icon speaker" @click="playKanas(p.goodAnswer)"/>
    </div>
    <div class="choice-container">
      <div class="choice" v-for="answer in p.answers" :key="answer">
        <input type="radio" :name="p.category" :value="answer" :id="answer" :disabled="isConfirmed ? 1 : 0" v-model="choice"><label :for="answer" class="choice-label" :class="{ valid : isConfirmed && answer == p.goodAnswer, blocked : isConfirmed}" @click="onChoice(answer)">{{answer}}</label>
      </div>
    </div>

	<div class="footer">
		<IconCheck @click="verifyUserAnswer()" class="icon check" :class="{ blocked : isConfirmed }"/>
		<span @click="restartGame()">next</span>
	</div>
  </div>
</template>

<style scoped>
/* header */
#kanaFound .header {
  font-size: xx-large;
  text-align: center;
}

/* choice */
.choice-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.choice {
  display: flex;
  flex: 1 0 33%;
  margin: 10px;
}

.choice:hover :not(.blocked){
  background-color: #abe2ab65;
}

.choice input[type="radio"] {
  position: fixed;
  width: 0;
  opacity: 0;
}

.choice-label {
  padding: 40px 15px;
  border: 1px solid var(--vt-c-text-light-1);
  border-radius: 5px;
  font-size: xx-large;
  text-align: center;
  cursor: pointer;
}

.choice input[type="radio"]:checked + .choice-label {
    background-color:whitesmoke;
}

.choice input[type="radio"]:checked + .choice-label:hover  {
    background-color:#abe2ab65;
}

.valid {
  outline: 5px solid palegreen;
}

.blocked {
  cursor: not-allowed;
} 

/* footer */
.footer {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.footer span {
font-size: smaller;
cursor: pointer;
}

.footer span:hover {
	text-decoration: underline;
}
</style>
