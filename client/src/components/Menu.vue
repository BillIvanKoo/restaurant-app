<template>
  <div class="menudiv">
    
    <menu-edit v-if="admin===true" :foods="menu[0]" class="menu" v-on:deleteFood="getter" @createFood="getter" @updateFood="getter"></menu-edit>
    <md-tabs md-right class="menu md-transparent" v-else>
      <md-tab id="movies" md-label="Starters">
        <starters v-if="menu[0]" :start="menu[0]"></starters>
      </md-tab>
      
      <md-tab id="music" md-label="Main Course">
        <main-course v-if="menu[0]" :main="menu[0]"></main-course>
      </md-tab>
      
      <md-tab id="books" md-label="Desserts">
        <desserts v-if="menu[0]" :dessert="menu[0]"></desserts>
      </md-tab>
    </md-tabs>
  </div>
  
</template>
<script>

import Vue from 'vue'
import firebase from 'firebase'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDPCj_HQeNFK2S7oCeOtYNdwDAn9c9Z7Uc",
    authDomain: "restaurantdemo-62ae3.firebaseapp.com",
    databaseURL: "https://restaurantdemo-62ae3.firebaseio.com",
    projectId: "restaurantdemo-62ae3",
    storageBucket: "restaurantdemo-62ae3.appspot.com",
    messagingSenderId: "227438965865"
  })
var db = firebaseApp.database()
  import MainCourse from "./MainCourse"
  import Starters from "./Starters"
  import Desserts from "./Desserts"
  import MenuEdit from "./MenuEdit"
  export default {
    components: {
      MainCourse,Starters,Desserts,MenuEdit
    },
    data() {
      return {
        menu:[],
        // mains:[],
        // dessertss:[],
        // startss:[],
        admin: false,
      }
    },
    created () {
      let menu=this.menu;
      // let mains =  this.mains;
      // let dessertss = this.dessertss;
      // let startss = this.startss
      let that = this;
      db.ref('/menu').on('value', function(snapshot){
        menu.shift()
        menu.push(snapshot.val());
        console.log(snapshot.val());
      })
      Vue.axios.get('http://localhost:3000/foods').then((response)=>{
        db.ref('/menu').set(
          response.data
        )
      }).catch((err)=>{
        console.log(err);
      });
      let token = localStorage.getItem('token')
      if(token!==null){
        Vue.axios.post('http://localhost:3000/users/'+token).then((redeleteFoodsponse)=>{
          if(response.data.role === "admin"){
            that.admin = true
          }
          console.log(response)
        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    beforeDestroy: function(){
      db.ref('/menu').set(null)
    },
    methods: {
      getter: function(){
        let that = this
        Vue.axios.get('http://localhost:3000/foods').then((response)=>{
          db.ref('/menu').set(
            response.data
          )
          
        }).catch((err)=>{
          console.log(err);
        });
      }
    }
    
  }
</script>
<style scoped>
  .menu{
    top: 50px;
    margin-bottom: 100px;
  }
</style>