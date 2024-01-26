<template>
  <div class="absolute">
    <div class="loading"></div>
    <p class="absolute -left-4 top-12">
      <span class="text-xs">
        <slot></slot>
      </span>
    </p>
  </div>
</template>

<style>
.loading {
  display: block;
  position: relative;
  width: 6px;
  height: 10px;
  animation: rectangle infinite 1s ease-in-out -0.2s;
  background-color: #22c55e;
}

.loading:before,
.loading:after {
  position: absolute;
  width: 6px;
  height: 10px;
  content: '';
  background-color: #22c55e;
}

.loading:before {
  left: -14px;

  animation: rectangle infinite 1s ease-in-out -0.4s;
}

.loading:after {
  right: -14px;

  animation: rectangle infinite 1s ease-in-out;
}

@keyframes rectangle {
  0%,
  80%,
  100% {
    height: 20px;
    box-shadow: 0 0 #22c55e;
  }

  40% {
    height: 30px;
    box-shadow: 0 -20px #22c55e;
  }
}
</style>
