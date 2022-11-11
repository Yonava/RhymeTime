<template>
  <div class="background-matte center">
    <div class="txt-container center px-5 pt-3">
      <h1>The Room You Joined is Full :(</h1>
      <p class="mt-2">
        Due to all player slots being filled, we 
        have added you as an audience member
      </p>
      <p>
        Members of the audience get to participate in the voting round, 
        however do not contribute their own prompt responses
      </p>
    </div>
  </div>
</template>

<style scoped>
  .background-matte {
    width: 100vw;
    height: 100vh;
    background-color: #FFB118;
    position: relative;
  }
  .txt-container {
    background-color: #FFD37E;
    width: 60%;
    border-radius: 10px;
    text-align: center;
    position: relative;
  }
  h1 {
    width: 80%;
    font-weight: 1000;
    font-size: 15pt;
    line-height: 18pt;
  }
  p {
    font-size: 12pt;
    line-height: 14pt;
  }
</style>