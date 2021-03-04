<template>
  <div class="config">
    <el-form-item label="是否单行展示">
      <el-switch v-model="formData.isBlock" :active-value="`1`" :inactive-value="`0`"></el-switch>
    </el-form-item>
    <el-form-item label="选项数量">
      <el-input v-model="formData.acount" placeholder="请输入选项数量"></el-input>
    </el-form-item>
    <el-form-item label="默认选中">
       <el-select style="width:100%" v-model="formData.defaultValue" placeholder="请选择">
        <el-option v-for="item in formData.list" :key="item.name" :label="item.name" :value="item.name">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-for="(item, key) in formData.list" :key="key" label="选项名称">
      <el-input style="width:200px;margin-right:15px" v-model="formData.list[key].name" placeholder="请输入选项名称"></el-input>
      <el-button type="danger" size="mini" @click="delItem(item,key)">删除</el-button>
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
      formData: this.object || {}
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
        if (payload.acount !== payload.list.length) {
          var oldLen = payload.list.length
          // 增加
          if (payload.acount > oldLen) {
            for (let index = 0; index < (payload.acount - oldLen); index++) {
              payload.list.push(
                {
                  name: '选项名称' + (index + oldLen + 1)
                })
            }
          }
          // 删除
          if (payload.acount < oldLen) {
            payload.list.splice((oldLen - 1), oldLen - payload.acount)
          }
        }
        this.$emit('config', payload)
      },
      deep: true
    }
  },
  methods: {
    delItem (item, index) {
      this.formData.list.splice(index, 1)
      this.formData.acount--
    }
  }
}
</script>

<style>
</style>
