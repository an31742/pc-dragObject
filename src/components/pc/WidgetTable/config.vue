<template>
  <div class="config">
    <el-form-item label="表格行数">
      <el-input type="number" style='width:100px' readonly v-model="formData.rows" placeholder="请输入选项数量"></el-input>
       <el-button style="margin-left:20px;" type="primary" @click='add("rows")'>增加+1</el-button > <el-button :disabled='formData.combine.length === 0?false:true' @click='del("rows")' type="primary">减少-1</el-button>
    </el-form-item>
    <el-form-item label="表格列数">
      <el-input type="number" style='width:100px' readonly v-model="formData.columns" placeholder="请输入选项数量"></el-input>
      <el-button style="margin-left:20px;" type="primary" @click='add("columns")'>增加+1</el-button > <el-button :disabled='formData.combine.length === 0?false:true' type="primary" @click='del("columns")'>减少-1</el-button>
    </el-form-item>
    <el-form-item label="合并单元格">
      <el-input  style='width:80px;margin-right:20px' v-model="combineObj.firstId" placeholder="firstId"></el-input>
      <el-input  style='width:80px;margin-right:20px' v-model="combineObj.secondId" placeholder="secondId"></el-input>
      <el-button  type="primary" @click='combine'>确定</el-button>
    </el-form-item>
  </div>
</template>

<script>
import { deepCompare, resetObj, cloneObjectFn } from '@/utils'

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
      combineObj: {
        firstId: '1|0',
        secondId: '3|0'
      }
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
        this.$emit('layoutConfig', payload)
      },
      deep: true
    }
  },
  methods: {
  // 增加单元格
    add (type) {
      this.formData[type]++
    },
    // 删除单元格
    del (type) {
      let typeObj = {
        rows: '行',
        columns: '列'
      }
      if (this.formData[type] > 1) {
        this.formData[type]--
      } else {
        this.$message.warning(`${typeObj[type]}数不能为0`)
      }
    },
    // 合并单元格
    combine () {
      // 先判断格式与必填
      let reg = /^\d+\|\d+$/
      let count = -1
      for (var key in this.combineObj) {
        if (reg.test(this.combineObj[key])) {
          count++
          if (count) {
            this.formData.combine.push(cloneObjectFn(this.combineObj))
            resetObj(this.combineObj)
          }
        } else {
          this.$message.error(`${key}填写错误`)
          break
        }
      }
    }
  }
}
</script>

<style>
</style>
