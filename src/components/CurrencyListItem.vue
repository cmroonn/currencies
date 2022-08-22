<template>
  <div class="item">
    <slot name="reverseBtn"></slot>

    <div class="item__details">
      <slot name="rub"></slot>
      <span class="separator"> = </span>
      <slot name="currency"></slot>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #fff;
  padding-bottom: 10px;
}

.item.down::after {
  content: "";
  background-image: url("/src/assets/arrow-down.png");
  width: 30px;
  height: 30px;
  background-size: cover;
  margin-left: 5px;
}
.item.up::after {
  content: "";
  background-image: url("/src/assets/arrow-up.png");
  width: 30px;
  height: 30px;
  background-size: cover;
  margin-left: 5px;
}
.item__reverse {
  background: none;
  fill: #f2f2f2;
  border: none;
  cursor: pointer;
  margin-right: 10px;
}

.item__details {
  display: flex;
  align-items: center;
  color: var(--vt-c-white);
}

.item__details .separator {
  margin: 0 10px;
}


h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

</style>
