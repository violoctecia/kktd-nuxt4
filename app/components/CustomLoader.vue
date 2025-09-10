<template>
  <div class="wrapper">
    <div class="ball"></div>
    <div class="ball"></div>
    <div class="ball"></div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
$radius: 60px;

.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999; 
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0e0e10; 
  filter: url('/assets/svg/loader-filter.svg#filter'); 
}

.ball { 
  width: $radius;
  height: $radius;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:before {
    content: '';
    background: #00ffdd;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &:nth-child(1) {
    transform: translate(-$radius * 1.1, -50%);
    animation: x-axis-lateral 2s infinite alternate ease-in-out;
    &:before {
      animation: y-axis-lateral 1s infinite 0.1s alternate ease-in-out;
    }
  }
  
  &:nth-child(2) {
    animation: x-axis 2s infinite alternate ease-in-out;
    &:before {
      animation: y-axis 1s infinite 0.5s alternate ease-in-out;
    }
  }
  
  &:nth-child(3) {
    transform: translate($radius * 1.1, $radius * 1.3);
    animation: x-axis-lateral 2s infinite alternate ease;
    &:before {
      animation: y-axis-lateral 1s infinite 0.4s alternate ease-in-out;
    }
  }
}

@keyframes x-axis {
  0% { transform: translate(-$radius * 1.6, -50%); }
  100% { transform: translate($radius * 1.6, -50%); }
}

@keyframes y-axis {
  0% { transform: translateY($radius * 0.7); }
  100% { transform: translateY(-$radius * 1.1) scale(0.8); background: #00fffb; }
}

@keyframes x-axis-lateral {
  0% { transform: translate(-$radius * 0.6, -50%); }
  100% { transform: translate($radius * 0.6, -50%); }
}

@keyframes y-axis-lateral {
  0% { transform: translateY($radius / 5); }
  100% { transform: translateY(-$radius); background: #00fffb; }
}
</style>
