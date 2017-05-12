<template>
  <div>
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog1">
      <md-dialog-title>Add New Menu</md-dialog-title>
      
      <md-dialog-content>
        <md-input-container class="input">
          <label>Name</label>
          <md-input v-model="name"></md-input>
        </md-input-container>
        <md-input-container class="input">
          <label>Description</label>
          <md-textarea v-model="description"></md-textarea>
        </md-input-container>
        <md-input-container class="input">
          <label for="category">Category</label>
          <md-select name="category" v-model="category">
            <md-option value="Starters">Starters</md-option>
            <md-option value="Main Course">Main Course</md-option>
            <md-option value="Desserts">Desserts</md-option>
          </md-select>
        </md-input-container class="input">
        <md-input-container>
          <label>Price in Rp .000</label>
          <md-input v-model="price"></md-input>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('dialog1')">Cancel</md-button>
        <md-button class="md-primary" @click.native="createFood">Submit</md-button>
      </md-dialog-actions>
    </md-dialog>
    
    <md-list class="custom-list md-triple-line list">
      <md-button class="md-fab md-primary" @click.native="openDialog('dialog1')">
        <md-icon>add</md-icon>
        <md-tooltip md-direction="right">Add New Menu</md-tooltip>
      </md-button>
      <md-list-item v-for="food in foods">
        <md-input-container class="input">
          <label>name</label>
          <md-input placeholder="name" v-model="food.name" @keypress.enter.native="updateFood(food)"></md-input>
        </md-input-container>
        <md-input-container class="input">
          <label>description</label>
          <md-textarea v-model="food.description" @keyup.native="updateFood(food)"></md-textarea>
        </md-input-container>
        <md-input-container class="input">
          <label for="category">Category</label>
          <md-select name="category" v-model="food.category" @select="updateFood(food)">
            <md-option value="Starters" @select="updateFood(food)">Starters</md-option>
            <md-option value="Main Course" @select="updateFood(food)">Main Course</md-option>
            <md-option value="Desserts" @select="updateFood(food)">Desserts</md-option>
          </md-select>
        </md-input-container>
        <md-input-container class="input">
          <label>price in Rp .000</label>
          <md-input placeholder="price" v-model="food.price" @keypress.enter.native="updateFood(food)"></md-input>
        </md-input-container>
        <md-button class="md-icon-button md-raised md-accent" @click.native="deleteFood(food)">
          <md-icon>delete</md-icon>
        </md-button>
      </md-list-item>
    </md-list>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
  export default{
    props: ['foods'],
    data(){
      return{
        name: '',
        description: '',
        price: '',
        category: ''
      }
    },
    methods: {
      createFood: function(){
        let that=this
        Vue.axios.post('http://localhost:3000/foods', {
          name: this.name,
          description: this.description,
          price: this.price,
          category: this.category
        }).then(function(response){
          that.closeDialog('dialog1')
          that.$emit('createFood')
          console.log(response);
        })
      },
      deleteFood: function(food){
        let that = this;
        Vue.axios.delete('http://localhost:3000/foods/' + food._id)
        .then(function(response){
          console.log(response);
          that.$emit('deleteFood')
        }).catch((err)=>{
          console.log(err)
        })
      },
      updateFood: function(food){
        let that = this
        Vue.axios.put('http://localhost:3000/foods/' + food._id, {
          name: food.name,
          description: food.description,
          price: food.price,
          category: food.category
        }).then((response)=>{
          console.log(response);
        })
      },
      openDialog(ref) {
        this.$refs[ref].open();
      },
      closeDialog(ref) {
        this.$refs[ref].close();
      }
    },
    // created: function(){
    //   this.foods.map(f)
    // }
  }
</script>
<style scoped>
  .list{
    top: 50px
  }
  .input{
    margin-right: 50px;
  }
</style>