<template>
  <div class="bb">
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog1">
      <md-dialog-title>Sign In</md-dialog-title>
      
      <md-dialog-content>
        <md-input-container>
          <md-icon>perm_identity</md-icon>
          <label>Username</label>
          <md-input placeholder="Enter username"></md-input>
        </md-input-container>
        <md-input-container md-has-password>
          <md-icon>lock</md-icon>
          <label>Password</label>
          <md-input type="password" placeholder="Enter password" ></md-input>
        </md-input-container>
      </md-dialog-content>
      
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('dialog1')">Cancel</md-button>
        <md-button class="md-primary" @click.native="closeDialog('dialog1')">Submit</md-button>
      </md-dialog-actions>
    </md-dialog>
    
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog2">
      <md-dialog-title>Sign In</md-dialog-title>
      
      <md-dialog-content>
        <md-input-container>
          <md-icon>perm_identity</md-icon>
          <label>Username</label>
          <md-input placeholder="Enter username"></md-input>
        </md-input-container>
        <md-input-container md-has-password>
          <md-icon>lock</md-icon>
          <label>Password</label>
          <md-input type="password" placeholder="Enter password" ></md-input>
        </md-input-container>
        <md-input-container>
          <label>Confirm Password</label>
          <md-input type="password"></md-input>
        </md-input-container>
        <md-input-container>
          <md-icon>email</md-icon>
          <label>Email</label>
          <md-input placeholder="Enter email" ></md-input>
        </md-input-container>
      </md-dialog-content>
      
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('dialog2')">Cancel</md-button>
        <md-button class="md-primary" @click.native="closeDialog('dialog2')">Submit</md-button>
      </md-dialog-actions>
    </md-dialog>
    
    <md-bottom-bar>
      <md-bottom-bar-item md-icon="input" @click.native="openDialog('dialog1')">Sign In</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="account_circle" @click.native="openDialog('dialog2')">Register</md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>
<script>
export default {
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
    }
  }
};
</script>
<style>
  .bb{
    z-index: 2;
  }
</style>