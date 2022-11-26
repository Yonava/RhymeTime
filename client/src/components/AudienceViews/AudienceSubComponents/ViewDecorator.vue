<template>
  <div class="background-matte center">
    <div class="audience-text-container pa-4">
      <div 
        style="line-height: 21pt;"
        class="text-h5 font-weight-black mb-2"
      >
        {{ viewTitle }}
      </div>
      <div>
        <slot name="view-content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewDecorator',
  props: {
    viewTitle: {
      type: String,
      reuired: true
    }
  }
}
</script>

<style scoped>
.background-matte {
  width: 100vw;
  height: 100vh;
  background-color: #FFB118;
}
.audience-text-container {
  background-color: #FFD37E;
  width: 60%;
  border-radius: 10px;
  text-align: center;
  position: relative;
}
.audience-view-title {
  width: 80%;
  font-weight: 900;
  font-size: 15pt;
  line-height: 18pt;
}
</style>