<script setup>
import CurrencyListItem from "./CurrencyListItem.vue"
import ReverseButton from "./ReverseButton.vue"
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()


const currencyData = computed(() => store.getters['searchCurrencies'])


onMounted(() => {
  store.dispatch('getCurrencies')
})

</script>

<template>
  <CurrencyListItem v-for="curr in currencyData" :key="curr.NumCode" :class="curr.hasGrown ? 'up' : 'down'">
    <template #reverseBtn>
      <ReverseButton :index="currencyData.indexOf(curr)" />
    </template>
    <template #rub>
      {{ curr.Value }} Российский рубль (RUB)
    </template>
    <template #currency>
      {{ curr.Nominal }} {{ curr.Name }} ({{ curr.CharCode }})
    </template>
  </CurrencyListItem>
</template>
