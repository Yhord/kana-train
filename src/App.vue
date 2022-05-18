<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
@import '@/assets/base.css';

*.unselectable {
   -moz-user-select: -moz-none;
   -khtml-user-select: none;
   -webkit-user-select: none;
   -ms-user-select: none;
   user-select: none;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

body {
  display: flex;
  place-items: center;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  font-size: larger;
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

a:hover,
.green {
  background-color:palegreen;
}

.icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  border: 4px solid;
  border-radius: 4px;
  background-color: palegreen;
  border-color:  palegreen;
}

.icon:hover {
  background-color: #53f953;;
  border-color: #53f953;;
}

.check {
  width: 90px;
  border-radius: 10px;
}
</style>
