<template>
  <div class="home">
    <img class="background" src="../assets/food1.png" alt="background">
    <div class="welcome">
      Welcome to
    </div>
    <div class="name">
      ZanEAT
    </div>
    <div class="promo">
      Register to get our promotions via email!!
    </div>
    <div class="arrow">
      |<br>
      |<br>
      |<br>
      |<br>
      |<br>
      |<br>
      |<br>
      \/<br>
      
    </div>
  </div>
</template>
<script>
  export default{
    
  }
</script>
<style scoped>
.home{
  position: relative;
}
.background {
  opacity: 0.7;
}
.name {
  background-color: black;
  position: fixed;
  padding: 32px;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  color: white;
  font-size: 60px;
  letter-spacing: 5px;
  border-radius: 10px;
}
.welcome {
  position: fixed;
  font-size: 32px;
  top: 40%;
  color: black;
  width: 100%;
  text-align: center;
}
.promo{
  position: fixed;
  font-size: 32px;
  top: 60%;
  color: black;
  width: 100%;
  text-align: center;
}
.arrow{
  position: fixed;
  font-size: 32px;
  top: 65%;
  color: black;
  left: 56%;
}
</style>