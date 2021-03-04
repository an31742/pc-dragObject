<template>
  <div class="pc-widget" style="height:50px">
    <!-- <p>{{payload.text}}</p> -->
    <h1 v-if="payload.level === 'h1'">{{payload.text}}</h1>
    <h2 v-else-if="payload.level === 'h2'">{{payload.text}}</h2>
    <h3 v-else-if="payload.level === 'h3'">{{payload.text}}</h3>
    <h4 v-else-if="payload.level === 'h4'">{{payload.text}}</h4>
    <h5 v-else-if="payload.level === 'h5'">{{payload.text}}</h5>
  </div>
</template>

<script>
export default {
  props: {
    payload: {
      type: Object,
      default: () => { return {} }
    }
  }

}
</script>

<style>
h1,h2,h3,h4,h5{
  text-align: center;
}
</style>
