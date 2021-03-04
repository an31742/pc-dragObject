<template>
  <div class="pc-widget">
    <p class="pc-widget-label">{{payload.notes}}</p>
     <el-radio-group v-model="payload.defaultValue" @change='toggle'>
        <el-radio v-for="(item, index) in payload.list" :key="index" :label="item.name" :value='item.name'></el-radio>
      </el-radio-group>
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
      radio: this.payload.defaultValue || ''
    }
  },
  methods: {
    toggle (data) {
      console.log(data)
      // this.radio = name
    }
  }
}
</script>

<style>
</style>
