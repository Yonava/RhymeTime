<template>
  <div v-if="!name">
    <p>Enter a name!</p>
  </div>
  <div v-else-if="notCool">
    <p>{{ name }} is not cool</p>
  </div>
  <div v-else>
    <p>{{ name.length }} is not long enough</p>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    notCool() {
      return this.name == 'yona';
    },
    validateName() {
      return this.name.length >= 5;
    }
  }
  
}
</script>