<script setup>
import {useStore} from "vuex";

defineProps({
  currentCurrency: String,
  currenciesList: Array,
  blockId: Number,
  isDisabled: Boolean,
  inputValue: Number
});

import {computed, ref} from 'vue'

const store = useStore()

const otherCurrencies = computed(() => store.getters['getCharCodes'].slice(5));

const val = ref()
const item = ref()
</script>


<template>
  <div class="converter-area">
    <div class="converter-area__currencies">
      <button
          class="currency-code"
          type="button"
          v-for="item in currenciesList" :key="currenciesList.indexOf(item)"
          :class="item === currentCurrency ? 'active' : ''"
          v-show="currenciesList.indexOf(item) < 5 ? true : false"
          @click="$emit('changeCurrency', item, blockId)"
      >
        {{ item }}
      </button>

      <select
          @change="$emit('changeCurrency', val, blockId)"
          class="select"
          v-model="val"
          :class="val === currentCurrency ? 'active' : ''"
      >
        <option value="" disabled selected></option>
        <option :value="item" v-if="true" v-for="item in otherCurrencies" :key="otherCurrencies.indexOf(item)">
          {{ item }}
        </option>
      </select>
    </div>
    <input
        type="number"
        class="converter-area__field"
        v-model="inputValue"
        :readonly="isDisabled"
        @input="$emit('calcValue', inputValue)"
    >
  </div>
</template>

<style scoped>
  .converter-area__field {
    font-family: inherit;
    padding: 10px;
    font-size: 2rem;
    border: none;
    resize: none;
    width: 320px;
    height: 100px;
  }

  .converter-area__currencies {
    display: flex;
    justify-content: space-between;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }


  .currency-code {
    border: none;
    width: 40px;
    height: 40px;
    font-size: .9rem;
    margin-right: 5px;
    background-color: #fff;
    cursor: pointer;
    transition: .2s ease;
  }

  .select {
    width: 80px;
    height: 40px;
    outline: none;
    border: none;
  }

  .select.active {
    background-color: var(--vt-c-indigo);
    color: #fff;
  }

  .currency-code:hover {
    opacity: .7;
    transition: .2s ease;
  }

  .currency-code.active {
    background-color: var(--vt-c-indigo);
    color: #fff;
  }

  .currency-code.active:hover {
    opacity: 1;
  }
</style>