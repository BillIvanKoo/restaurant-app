<template>
  <div class="bb">
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog1">
      <md-dialog-title>Sign In</md-dialog-title>
      
      <md-dialog-content>
        <md-input-container>
          <md-icon>perm_identity</md-icon>
          <label>Username</label>
          <md-input placeholder="Enter username" v-model="username"></md-input>
        </md-input-container>
        <md-input-container md-has-password>
          <md-icon>lock</md-icon>
          <label>Password</label>
          <md-input type="password" placeholder="Enter password" v-model="password"></md-input>
        </md-input-container>
      </md-dialog-content>
      
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('dialog1')">Cancel</md-button>
        <md-button class="md-primary" @click.native="signIn()">Submit</md-button>
      </md-dialog-actions>
    </md-dialog>
    
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog2">
      <md-dialog-title>Register</md-dialog-title>
      
      <md-dialog-content>
        <md-input-container>
          <md-icon>perm_identity</md-icon>
          <label>Username</label>
          <md-input placeholder="Enter username" v-model="username"></md-input>
        </md-input-container>
        <md-input-container md-has-password>
          <md-icon>lock</md-icon>
          <label>Password</label>
          <md-input type="password" placeholder="Enter password" v-model="password"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Confirm Password</label>
          <md-input type="password" v-model="confirm_password"></md-input>
        </md-input-container>
        <md-input-container>
          <md-icon>email</md-icon>
          <label>Email</label>
          <md-input placeholder="Enter email" v-model="email"></md-input>
        </md-input-container>
      </md-dialog-content>
      
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('dialog2')">Cancel</md-button>
        <md-button class="md-primary" @click.native="signUp()">Submit</md-button>
      </md-dialog-actions>
    </md-dialog>
    
    <md-bottom-bar v-if="shown">
      <md-bottom-bar-item md-icon="input" @click.native="openDialog('dialog1')">Sign In</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="account_circle" @click.native="openDialog('dialog2')">Register</md-bottom-bar-item>
    </md-bottom-bar>
    <md-bottom-bar v-if="shown===false">
      <md-bottom-bar-item md-icon="account_box">Welcome {{username}}!!</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="power_settings_new" @click.native="logOut()">Log out</md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
export default {
  data(){
    return {
      shown: true,
      username: '',
      password: '',
      confirm_password: '',
      email: ''
    }
  },
  methods: {
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {
      console.log('Opened');
    },
    onClose(type) {
      console.log('Closed', type);
    },
    signIn() {
      Vue.axios.post('http://localhost:3000/users/signin', {
        username: this.username,
        password: this.password
      }).then((response) => {
        console.log(response.data)
        localStorage.setItem('token', response.data.token)
        this.shown = false
        this.password = ''
        this.closeDialog('dialog1')
        location.reload()
      }).catch((err) => {
        console.log(err);
      })
    },
    signUp() {
      if(this.confirm_password === this.password){
        Vue.axios.post('http://localhost:3000/users/signup', {
          username: this.username,
          password: this.password,
          email: this.email
        }).then((response) => {
          alert('Your account is ready')
          console.log(response)
          this.closeDialog('dialog2')
          this.signIn()
        }).catch((err) => {
          console.log(err);
        })
      } else {
        alert('Password does not match!')
      }
    },
    logOut() {
      localStorage.removeItem('token')
      this.shown=true
      this.username=''
      location.reload()
    }
  },
  created: function(){
    let that = this
    let token = localStorage.getItem('token')
    if(token!==null){
      Vue.axios.post('http://localhost:3000/users/'+token).then((response)=>{
        that.username = response.data.username
        that.shown=false
      })
    }
  }
};
</script>
<style>
  .bb{
    z-index: 10;
  }
</style>