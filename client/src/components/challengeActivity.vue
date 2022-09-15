<template>
  <div>
    <div class="title">Challenge Activity</div>
    <br>
    <input 
      v-model="text" 
      @keyup.enter="add"
      placeholder="add an item" 
      type="text" 
    />
    <br><br>
    <div v-if="!arr.length">added items display here!</div>
    <div v-else-if="!filteredArr.length && arr.length">you have filtered everything out!</div>
    <button v-else @click="deleteTargeted">{{ deleteAllMsg }}</button>
    <div class="center" v-for="item in filteredArr" :key="item.id">
      <button
        @click="remove(item.text)"
        style="margin-right: 5px"
      >x</button>
      <p 
        class="todo-item"
        :style="backgroundColor(item.done)"
        @click="item.done = !item.done"
      >{{ item.text }} - {{ item.done ? 'complete :)' : 'incomplete :(' }}</p>
    </div>

    <br><br>
    <button @click="doneFilter = !doneFilter">{{ btnTxt }}</button>
    <input type="text" placeholder="substring filter" v-model="filterParam" />
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      arr: [],
      filteredArr: [],
      text: '',
      filterParam: '',
      doneFilter: false
    }
  },
  methods: {
    backgroundColor(status) {
      return `background-color: ${status ? 'rgb(50, 255, 50)' : 'rgb(255, 75, 75)'}`
    },
    filterStuff() {
      this.filteredArr = this.arr.filter((item) => {
        return this.doneFilter ? item.done && item.text.includes(this.filterParam) : item.text.includes(this.filterParam)
      });
    },
    deleteTargeted() {
      for (let i = this.arr.length - 1; i >= 0; i--) {
        const textsInsideFilteredArr = this.filteredArr.map((item) => item.text)
        if (textsInsideFilteredArr.includes(this.arr[i].text)) this.arr.splice(i, 1)
      }
    },
    add() {
      // if (!this.text) return
      this.arr.push({
        text: this.text, 
        done: false 
      })
      this.text = ''
    },
    remove(text) {
      this.arr.splice(this.arr.findIndex((item) => text === item.text), 1)
    }
  },
  computed: {
    btnTxt() {
      return this.doneFilter ? 'show all items' : 'completed items only'
    },
    deleteAllMsg() {
      return this.filteredArr.length !== this.arr.length ? 'delete everything showing now' : 'delete everything';
    }
  },
  watch: {
    arr() {
      this.filterStuff()
    },
    filterParam() {
      this.filterStuff()
    },
    doneFilter() {
      this.filterStuff()
    }
  }
}
</script>

<style scoped>
  .todo-item {
    cursor: pointer;
    user-select: none;
    width: 30%;
    padding: 5px;
    border-radius: 25px;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    font-weight: bold;
    font-size: 2rem;
  }
</style>