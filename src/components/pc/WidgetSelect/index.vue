<template>
  <div class="pc-widget">
    <p class="pc-widget-label">{{payload.notes}}</p>
     <el-select v-model="payload.defaultValue" placeholder="请选择" style="width:100%">
        <el-option
          v-for="item in payload.list"
          :key="item.name"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
  </div>
</template>

<script>
export default {
  props: {
    payload: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      result: []
    }
  }
}
</script>

<style>
</style>
