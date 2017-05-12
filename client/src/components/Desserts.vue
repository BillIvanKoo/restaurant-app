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
    props: ['dessert'],
    created: function(){
      for(let i=0;i<this.dessert.length;i++){
        if(this.dessert[i].category === "Desserts"){
          this.foods.push(this.dessert[i])
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