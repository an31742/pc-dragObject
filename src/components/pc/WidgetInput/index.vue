<template>
  <div class="pc-widget">
    <p class="pc-widget-label">{{payload.notes}}</p>
    <el-input v-model="value" :type="payload.inputType" clearable placeholder="请输入"></el-input>
  </div>
</template>

<script>
export default {
  props: {
    payload: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style>
</style>
