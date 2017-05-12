<template>
    <div>
  <md-toolbar class="md-transparent viewport">
    <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
      <md-icon>menu</md-icon>
    </md-button>
    <!-- <router-link to="/">
    <h2 class="md-title">ZanEAT</h2> -->
  </router-link>
  </md-toolbar>

  <md-sidenav class="md-left sideport" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
    <md-toolbar class="md-transparent">
      <div class="md-toolbar-container">
        <h3 class="md-title">Options</h3>
      </div>
    </md-toolbar>
    <md-list>
      <router-link to="/">
        <md-list-item>
          <md-icon>home</md-icon> <span>Home</span>
        </md-list-item>
      </router-link>
      <router-link to="/menu">
        <md-list-item>
          <md-icon>assignment</md-icon> <span>Menu</span>
        </md-list-item>
      </router-link>
      <router-link to="/about">
        <md-list-item>
          <md-icon>face</md-icon> <span>About</span>
        </md-list-item>
      </router-link>
    </md-list>
  </md-sidenav>
</div>
</template>
<script>
  export default {
    methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    closeRightSidenav() {
      this.$refs.rightSidenav.close();
    },
    open(ref) {
      console.log('Opened: ' + ref);
    },
    close(ref) {
      console.log('Closed: ' + ref);
    }
  }
  }
</script>
<style scoped>
  .viewport{
    position: fixed;
    width: 100%;
    top: 0%;
  }
  h2 {
    color: white;
  }
  .sideport{
    top: 0%
  }
</style>