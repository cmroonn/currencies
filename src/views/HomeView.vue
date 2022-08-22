<script setup>
import CurrencyList from "@/components/CurrencyList.vue";
import SearchBar from "@/components/SearchBar.vue";
</script>

<template>
  <main>
    <SearchBar />
    <CurrencyList />
  </main>
</template>

<style scoped>
  main {
    padding: 5rem 0;
    min-height: 100vh;
  }
</style>