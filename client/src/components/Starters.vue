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
    props: ['start'],
    created: function(){
      for(let i=0;i<this.start.length;i++){
        if(this.start[i].category === "Starters"){
          this.foods.push(this.start[i])
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