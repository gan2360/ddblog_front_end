<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #eaeaea;
  min-height: 100vh;
  overflow: hidden;

}
*{
  margin: 0;
  box-sizing: border-box;
  padding: 0;
}
a{
  text-decoration: none;
  color: #2c3e50;
}
input{
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}
.w{
  width: 1200px;
  margin: 0 auto;
}
i{
  margin: 0 5px;
}
</style>
