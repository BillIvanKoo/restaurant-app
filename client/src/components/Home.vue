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
  z-index: -101;
}
.background {
  opacity: 0.5;
  z-index: -100;
}
.name {
  background-color: black;
  position: fixed;
  padding: 32px;
  top: 45%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  color: white;
  font-size: 96px;
  letter-spacing: 5px;
  border-radius: 10px;
}
.welcome {
  position: fixed;
  font-size: 32px;
  top: 35%;
  color: black;
  width: 100%;
  text-align: center;
}
.promo{
  position: fixed;
  font-size: 40px;
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