<script setup>
import {computed, onMounted, reactive, ref} from "vue"
import { useStore } from 'vuex'
import ConverterArea from "../components/ConverterArea.vue"

const store = useStore()

const list = computed(() => store.getters['currencies'])
const codes = computed(() => store.getters['getCharCodes'])
const valutes = computed(() => store.getters['getValutes'])


const defaults = reactive({
  primaryCurrency: 'RUB',
  secondaryCurrency: 'USD',
  primaryVal: 0,
  secondaryVal: 0,
})


function changeCurrency (newCurrency, blockId) {
  if (newCurrency === defaults.secondaryCurrency || newCurrency === defaults.primaryCurrency) {
    [defaults.primaryCurrency, defaults.secondaryCurrency] = [defaults.secondaryCurrency, defaults.primaryCurrency]
  } else {
    blockId === 1 ? defaults.primaryCurrency = newCurrency : false;
    blockId === 2 ? defaults.secondaryCurrency = newCurrency : false;
  }
  calculate()
}

function reverse () {
  [defaults.primaryCurrency, defaults.secondaryCurrency] = [defaults.secondaryCurrency, defaults.primaryCurrency]
  calculate()
}

function calculate(val) {
  if (val) defaults.primaryVal = val;

  defaults.secondaryVal = parseFloat(
      ((defaults.primaryVal * valutes.value[defaults.primaryCurrency].Value) /
          valutes.value[defaults.secondaryCurrency].Value
      ).toFixed(4)
  )
}


onMounted(() => {
  store.dispatch('getCurrencies')
})



</script>

<template>
  <section class="converter">
    <ConverterArea
        :current-currency="defaults.primaryCurrency"
        :currencies-list="codes"
        :input-value="defaults.primaryVal"
        @change-currency="changeCurrency"
        :block-id="1"
        class="converter__item"
        @calc-value="calculate"
    />

    <button
        type="button"
        class="converter__change"
        @click="reverse"
    >
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
        <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 2c5.519 0 10 4.481 10 10s-4.481 10-10 10-10-4.481-10-10 4.481-10 10-10zm2 12v-3l5 4-5 4v-3h-9v-2h9zm-4-6v-3l-5 4 5 4v-3h9v-2h-9z"/>
      </svg>
    </button>

    <ConverterArea
        :current-currency="defaults.secondaryCurrency"
        :currencies-list="codes"
        :input-value="defaults.secondaryVal"
        @change-currency="changeCurrency"
        :block-id="2"
        :is-disabled="true"
        class="converter__item"
    />
  </section>
</template>


<style>

.converter__change {
  background: none;
  border: none;
  width: 24px;
  height: 24px;
  transform: scale(2);
  padding: 0;
  align-self: center;
}
.converter__change svg {
  width: 24px;
  height: 24px;
  fill: #fff;
}

.converter__item {
  max-height: 140px;
}


@media (min-width: 1024px) {
  .converter {
    display: flex;
    justify-content: space-between;
    max-height: 140px;
  }
}
</style>
