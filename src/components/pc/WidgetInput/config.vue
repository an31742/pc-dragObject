<template>
  <div class="config">
    <el-form-item label="是否单行展示">
      <el-switch v-model="formData.isBlock" :active-value="`1`" :inactive-value="`0`"></el-switch>
    </el-form-item>
    <el-form-item label="输入类型">
      <el-select v-model="formData.inputType" style="width:100%" placeholder="请选择">
        <el-option label="文本" value="text" />
        <!-- <el-option label="数字" value="number" /> -->
        <el-option label="密码" value="password" />
      </el-select>
    </el-form-item>
    <el-form-item v-if='formData.isWrite === "1"' label="验证规则">
      <el-select v-model="formData.rule" style="width:100%" placeholder="请选择">
         <el-option v-for='(item,index) in ruleList' :key='index' :label="item.ukey" :value="item.uvalue" />
      </el-select>
    </el-form-item>
    <el-form-item label="默认值">
      <el-radio-group v-model="formData.defaultValueRadio" @change="handleChange">
        <el-radio label="none">无</el-radio>
        <el-radio label="dynamic">动态值</el-radio>
        <el-radio label="static">静态值</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if='formData.defaultValueRadio === "dynamic"' label="默认动态值">
       <el-select style="width:100%" v-model="formData.defaultValue" placeholder="请选择">
        <el-option label="aaa" value="aaaa" />
        <el-option label="bbb" value="bbbb" />
        <el-option label="vvv" value="vvvv" />
      </el-select>
    </el-form-item>
    <el-form-item v-if='formData.defaultValueRadio === "static"' label="默认静态值">
      <el-input type="text" v-model='formData.defaultValue' clearable placeholder="请输入静态默认值"></el-input>
    </el-form-item>
  </div>
</template>

<script>
import api from '@/api/pcFromList'
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
      defaultValue: {},
      defaultValueList: [
        {}
      ],
      ruleList: [],
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
        // 当formData为空时不触发渲染父组件
        // if (JSON.stringify(payload) === '{}' || JSON.stringify(this.object) === '{}') return
        this.$emit('config', payload)
      },
      deep: true
    }
  },
  mounted () {
    // this.getDictData()
  },
  methods: {
    // 获取字典值
    getDictData () {
      api.getDicByKinds({ kinds: 'DYNAMIC_VALUE', kindsName: '默认动态值' }).then(res => {
        console.log(this.defaultValueList)
        this.defaultValueList = res.data
      })
      api.getDicByKinds({ kinds: 'VALIDATION_RULES ', kindsName: '验证规则' }).then(res => {
        this.ruleList = res.data
      })
    },
    handleChange () {
      this.formData.defaultValue = ''
    }
  }
}
</script>

<style>
.el-radio__inner{
    margin:0;
  }
</style>
