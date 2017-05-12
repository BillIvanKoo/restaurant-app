<template>
  <div id="app">
    <side-nav id="sn"></side-nav>
    <router-view></router-view>
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
    <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">
    <bottom-bar id="bb"></bottom-bar>
  </div>
</template>

<script>
import SideNav from './components/SideNav'
import BottomBar from './components/BottomBar'
export default {
  name: 'app',
  components: {
    BottomBar,SideNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#bb {
  width: 100%;
  position: fixed;
  bottom: 0px;
}
</style>
