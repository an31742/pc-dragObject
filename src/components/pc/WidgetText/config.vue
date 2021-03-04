<template>
  <div class="config">
    <el-form-item label="文本内容">
      <el-input v-model="formData.text" placeholder="请输入文本内容"></el-input>
    </el-form-item>
    <el-form-item label="文本级别">
      <el-select style="width:100%" v-model="formData.level" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
import { deepCompare } from '@/utils'

export default {
  props: {
    object: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      formData: this.object || {},
      options: [
        { label: 'h1', value: 'h1' },
        { label: 'h2', value: 'h2' },
        { label: 'h3', value: 'h3' },
        { label: 'h4', value: 'h4' },
        { label: 'h5', value: 'h5' }
      ]
    }
  },
  watch: {
    object (obj) {
      if (!deepCompare(obj, this.formData)) {
        this.formData = obj || {}
      }
    },
    formData: {
      handler (payload) {
        // 当formData为空时不触发渲染父组件
        // if (JSON.stringify(payload) === '{}' || JSON.stringify(this.object) === '{}') return
        this.$emit('config', payload)
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
