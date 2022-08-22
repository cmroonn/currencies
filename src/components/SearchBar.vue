<template>
  <div class="searchbar">
    <label class="searchbar__label">
      <span>Поиск по коду или имени валюты</span>
      <input type="text" v-model="val" @input="changeHandler">
    </label>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const val = ref()

const store = useStore()

function changeHandler() {
  store.dispatch('setSearchData', val.value)
  console.log(store.state.searchData)
}
</script>

<style scoped>
.searchbar__label {
  display: flex;
  flex-direction: column;
}

.searchbar__label span {
  font-size: 0.8rem;
  margin-bottom: 10px;
}

.searchbar__label input {
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: 0 10px;
}


</style>