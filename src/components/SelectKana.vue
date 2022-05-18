<script setup>
import kanaData from './../kana.json'
import ClickableContentTD from './ClickableContentTD.vue';

const katakanas = kanaData;



function add() {
}

</script>

<template>

<h1>Select kanas you want to practice</h1>
<div id="hiragana">
	<div class="title-bar">
		<h2>Hiragana</h2>
		<span><input id="all-hi" type="checkbox"/><label for="all-hi"> All</label></span>
	</div> 
	<table>
		<thead>
		<tr>
			<th>n</th><th>w-</th><th>r-</th><th>y-</th><th>m-</th><th>h-</th><th>n-</th><th>t-</th><th>s-</th><th>k-</th><th></th>
		</tr>
		</thead>
		<tbody>
			<!-- 11 columns ; see https://localcoder.org/vuejs-v-for-add-bootstrap-row-every-5-items-->
			<tr v-for="i in Math.ceil(katakanas.length/11)" :key="i">
				<td v-for="kana in katakanas.slice((i - 1) * 11, i*11)" :key="kana.hiragana" :id="kana.hiragana" :class="(kana.roumaji != '') ? '' :'empty'" @click="add($event)">
					<ClickableContentTD :kana="kana.hiragana" :roumaji="kana.roumaji" />
				</td>
			</tr>
		</tbody>
		<tr>
			<th v-for="i in Math.ceil(11)" :key="i">
				<input :id="i" type="checkbox"/>
			</th>
		</tr>
	</table>
</div>


<div id="katakana">
	<div class="title-bar">
		<h2>Katakana</h2>
		<span><input id="all-ka" type="checkbox"/><label for="all-ka"> All</label></span>
	</div> 
	<table>
		<thead>
		<tr>
			<th>n</th><th>w-</th><th>r-</th><th>y-</th><th>m-</th><th>h-</th><th>n-</th><th>t-</th><th>s-</th><th>k-</th><th></th>
		</tr>
		</thead>
		<tbody>
			<tr v-for="i in Math.ceil(katakanas.length/11)" :key="i">
				<td v-for="kana in katakanas.slice((i - 1) * 11, i*11)" :key="kana.katakana" :id="kana.katakana" :class="(kana.roumaji != '') ? '' :'empty'" @click="add($event)">
					<ClickableContentTD :kana="kana.katakana" :roumaji="kana.roumaji" />
				</td>
			</tr>
		</tbody>
		<tr>
			<th v-for="i in Math.ceil(11)" :key="i">
				<input :id="i" type="checkbox"/>
			</th>
		</tr>
	</table>
</div>

</template>

<style scoped>

table {
	border-collapse: collapse;
	border-spacing: 0;
}

td {
	font-size:x-large;
	border: 1px solid black;
	text-align: top;
	width: 50px;
	height: 50px;
	text-align: center;
	cursor:pointer;

}

.empty {
	cursor: not-allowed;
}

.title-bar {
	display: flex;
	justify-content: space-between;
	line-height: 8px;
	width: inherit;
}

#hiragana, #katakana {
	margin-top: 20px;
	margin-bottom: 25px;
}

</style>

