<template>
  <div>
  <md-list>
    <md-list-item v-for="food in foods">
      <span>{{food.name}}</span>
      <md-list-expand>
        <span>{{food.description}}</span><br><span> Rp {{food.price}} 000</span>
      </md-list-expand>
    </md-list-item>

  </md-list>
</div>
</template>
<script>
  export default{
    props: ['main'],
    created: function(){
      for(let i=0;i<this.main.length;i++){
        if(this.main[i].category === "Main Course"){
          this.foods.push(this.main[i])
        }
        console.log(this.foods)
      }
    },
    data(){
      return {
        foods: []
      }
    }
  }
</script>
<style scoped>
</style>