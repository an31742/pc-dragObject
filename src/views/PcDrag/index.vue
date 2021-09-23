<template>
  <div class="drag">
    <!-- 左侧组件区域 -->
    <div class="drag-left">
      1111444
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item title="基础控件" name="1">
          <base-drag-tools />
        </el-collapse-item>
        <el-collapse-item title="业务控件" name="2">
          <business-drag-tools />
        </el-collapse-item>
        <el-collapse-item title="布局控件" name="3">
          <layout-drag-tools />
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 中间设计区域 -->
    <div class="drag-center">
      <div class="pc">
        <!-- <widget-draggable :widgetList="widgetTree" :group="'layout'"></widget-draggable> -->
        <draggable class="drag-area list-group" :list="widgetList" group="layout" @choose='handleLayoutChoose' @change='handleLayoutChange'>
          <div :class="['list-layout-item',{ 'is-layout-actived': activeLayoutIndex === index } ]" v-for="(item,index) in widgetList" :key="index" @click="getTableIndex(item,index)" >
            <p v-if='index'>关联表单索引:{{index}}</p>
            <p v-if='index===0'>主表单</p>
            <component v-bind:is="item.type" :payload="item.children" >
              <!-- 控件(插槽中的内容) -->
              <template v-slot="props" v-if="item.children">
                <strong style='color:red'>id:{{ props.data }}</strong>
                <div v-for="(tr,trIndex) in item.children" :key="trIndex">
                  <div v-for="(td,tdIndex) in tr.rowCells" :key='tdIndex'>
                    <div v-if="tr.rowIndex + '|' + td.colIndex === props.data" @click="getActiveIndex(tr,td,index)">
                      <draggable
                      style="height:60px;"
                      :list="td.component"
                        :group="td.component.length === 0 ?'widget':'no'"
                        @change="handleChange(tr.rowIndex,td.colIndex,index)"
                        :draggable="false">
                        <div :class="['list-group-item', { 'is-actived': activeLayoutIndex === index &&activeIndex === props.data } ]"
                          v-for="(e, i) in td.component" :key="i">
                          <component  style="width:100%" v-bind:is="e.type" :ref="'widget' + i" :payload="e.payload" ></component>
                        </div>
                      </draggable>
                    </div>
                   </div>
                </div>
              </template>
            </component>
          </div>
        </draggable>
      </div>
      <rawDisplayer :value="widgetList" :title="`json`" />
    </div>
    <!-- 右侧配置区域 -->
    <div class="drag-right">
      <el-form :model="ruleForm" ref="form" label-width="130px" label-position="left" :rules="rules" >
        <!-- 页面属性 -->
        <div>
          <h3>页面属性</h3>
          <el-form-item label="页面名称" prop="formTitle">
            <el-input v-model="ruleForm.formTitle"></el-input>
          </el-form-item>
          <el-form-item label="是否包含改派">
            <el-switch
              v-model="ruleForm.reassignFlag"
              :active-value="`1`"
              :inactive-value="`0`"
            ></el-switch>
          </el-form-item>
          <el-form-item label="是否包含子流程">
            <el-switch
              v-model="ruleForm.subProcessFlag"
              :active-value="`1`"
              :inactive-value="`0`"
            ></el-switch>
          </el-form-item>
          <el-form-item label="绑定子流程" v-if="ruleForm.subProcessFlag === '1'">
            <el-select v-model="ruleForm.subProcessId" placeholder="请选择流程" style="width: 100%;">
              <el-option
                v-for="(item,index) in subProcessList"
                :key="index"
                :label="item.processChName"
                :value="item.processDefID"
              />
            </el-select>
          </el-form-item>
        </div>
        <!-- 布局属性（需要根据widgetList的长度来判断） -->
        <div v-if="widgetList.length">
          <h3>布局属性</h3>
          <p style="color:red;text-align:center">*操作请保证当前行有单元格</p>
          <component ref="layoutTools" v-bind:is="activeWidgetLayoutConfigType" :object="activeWidgetLayoutPayload" @layoutConfig="handelWidgetLayoutConfig"></component>
          <div class="delete-btn">
            <el-button size="small" @click="handleDeleteWidgetLayout" type="danger" >删除布局控件</el-button>
          </div>
        </div>
        <div v-if="widgetList.length && widgetList[activeLayoutIndex].children[rowIndex].rowCells[colIndex].component.length">
          <h3>控件属性</h3>
          <el-form-item label="控件名">
            {{widgetList[activeLayoutIndex].children[rowIndex].rowCells[colIndex].component[0].title}}
          </el-form-item>
         <el-form-item label="控件标签名" prop='formLabel'>
            <el-input v-model="widgetList[activeLayoutIndex].children[rowIndex].rowCells[colIndex].component[0].payload.notes" placeholder="请输入控件label"></el-input>
            </el-form-item>
           <component ref="widgetTools" v-bind:is="activeWidgetConfigType" :object="activeWidgetPayload" @config="handelWidgetConfig"></component>
          <div class="delete-btn">
            <el-button size="small" @click="handleDeleteWidget" type="danger" >删除当前控件</el-button>
          </div>
        </div>

        <!-- 填写完配置信息之后完成配置 -->
        <div class="finish-config-style">
          <el-button type="success" @click="finishConfig()">保存配置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// 问题：当焦点在被合并的单元格上面，合并后找不到索引，报错---》解决
// 问题：当合并单元格后，先进行行列的减少再进行增加，表格出现混乱（解决起来比较麻烦,先试试，实在麻烦，可以禁止合并单元格后删除行列
// 问题：输入的id没有限制范围，需要在行列范围中
import { mapGetters } from 'vuex'
import BaseDragTools from './BaseDragTools'
import LayoutDragTools from './LayoutDragTools'

import WidgetText from '@/components/pc/WidgetText'
import WidgetTextConfig from '@/components/pc/WidgetText/config'
import WidgetInput from '@/components/pc/WidgetInput'
import WidgetInputConfig from '@/components/pc/WidgetInput/config'
import WidgetRadio from '@/components/pc/WidgetRadio'
import WidgetRadioConfig from '@/components/pc/WidgetRadio/config'
import WidgetSelect from '@/components/pc/WidgetSelect'
import WidgetSelectConfig from '@/components/pc/WidgetSelect/config'
import WidgetTable from '@/components/pc/WidgetTable'

import WidgetTableConfig from '@/components/pc/WidgetTable/config'

import WidgetDraggable from '@/components/pc/WidgetDraggable'
// 业务控件
import { cloneObjectFn } from '@/utils'
export default {
  components: {
    BaseDragTools,
    LayoutDragTools,
    WidgetText,
    WidgetTextConfig,
    WidgetInput,
    WidgetInputConfig,
    WidgetRadio,
    WidgetRadioConfig,
    WidgetSelect,
    WidgetSelectConfig,
    WidgetTable,
    WidgetTableConfig,
    WidgetDraggable
  },
  data () {
    return {
      activeNames: ['3'], // 折叠面板的操作
      activeLayoutIndex: 0, // 当前选中布局控件的索引
      activeIndex: '0|0', // 当前选中控件的索引
      rowIndex: 0, // 当前选中控件的行索引(数据结构真实位置)
      colIndex: 0, // 当前选中控件的列索引(数据结构真实位置)
      widgetList: [], // pageinfo,
      subProcessList: [],
      editData: [],
      formId: this.$route.query.formId || '',
      // form info
      ruleForm: {
        formTitle: '', // 页面名称
        subProcessId: '',
        reassignFlag: '',
        subProcessFlag: ''
      },
      // formType: '1', // 页面类型
      rules: {
        formTitle: [{ required: true, message: '请输入活动名称' }]
      }
    }
  },
  computed: {
    ...mapGetters(['tenantId']),
    // ---------------------------------------------------布局控件
    // 当前选中布局控件的目标对象
    activeWidgetLayoutObj () {
      if (!this.widgetList.length) return {}
      let obj = cloneObjectFn(this.widgetList[this.activeLayoutIndex] || null)
      return obj
    },
    // 当前选中布局控件的目标的payload对象
    activeWidgetLayoutPayload () {
      if (!this.activeWidgetLayoutObj) return {}
      let obj = cloneObjectFn(this.activeWidgetLayoutObj.payload || null)
      return obj
    },
    // 当前选中布局控件的目标类型
    activeWidgetLayoutConfigType () {
      if (!this.activeWidgetLayoutObj) return null
      return this.activeWidgetLayoutObj.type + '-config'
    },
    // ---------------------------------------------------控件
    // 当前选中控件的目标对象
    activeWidgetObj () {
      if (!this.widgetList.length) return {}
      let obj = cloneObjectFn(this.widgetList[this.activeLayoutIndex].children[this.rowIndex].rowCells[this.colIndex].component[0] || null)
      return obj
    },
    // 控件payload对象
    activeWidgetPayload () {
      if (!this.activeWidgetObj) return {}
      let obj = cloneObjectFn(this.activeWidgetObj.payload || null)
      return obj
    },
    // 选中控件的目标类型
    activeWidgetConfigType () {
      if (!this.activeWidgetObj) return null
      return this.activeWidgetObj.type + '-config'
    }
  },
  mounted () {
    this.finishConfig()
  },
  methods: {
    // 获取布局控件的索引
    getTableIndex (item, index) {
      this.activeLayoutIndex = index
    },
    // 拖拽获取当前数组中的索引
    handleChange (rowIndex, colIndex, layoutIndex) {
      this.activeLayoutIndex = layoutIndex
      this.activeIndex = rowIndex + '|' + colIndex
      let trueRowIndex = this.widgetList[this.activeLayoutIndex].children.findIndex(item => {
        return item.rowIndex === rowIndex
      })
      let trueColIndex = this.widgetList[this.activeLayoutIndex].children[trueRowIndex].rowCells.findIndex(item => {
        return item.colIndex === colIndex
      })
      this.rowIndex = trueRowIndex
      this.colIndex = trueColIndex
    },
    // 获取内嵌组件的位置
    getActiveIndex (tr, td, layoutIndex) {
      this.activeLayoutIndex = layoutIndex
      if (td.component.length) {
        // 拖拽的真实的索引
        let trueRowIndex = this.widgetList[this.activeLayoutIndex].children.findIndex(item => {
          return item.rowIndex === tr.rowIndex
        })
        let trueColIndex = this.widgetList[this.activeLayoutIndex].children[trueRowIndex].rowCells.findIndex(item => {
          return item.colIndex === td.colIndex
        })
        this.rowIndex = trueRowIndex
        this.colIndex = trueColIndex
        this.activeIndex = tr.rowIndex + '|' + td.colIndex
      }
    },
    // 布局组件配置事件
    handelWidgetLayoutConfig (payload) {
      // 表格行列变化操作数据结构
      this.changeRowsOrCols(payload)
      // 合并单元格操作数据结构
      this.combineCell(payload)
      this.widgetList[this.activeLayoutIndex].payload = cloneObjectFn(payload)
    },
    // 控件配置事件
    handelWidgetConfig (payload) {
      this.widgetList[this.activeLayoutIndex].children[this.rowIndex].rowCells[this.colIndex].component[0].payload = cloneObjectFn(payload)
    },
    // 删除布局控件
    handleDeleteWidgetLayout () {
      this.widgetList.splice(this.activeLayoutIndex, 1)
      console.log(this.activeLayoutIndex ? this.activeLayoutIndex-- : 0)
    },
    // 删除选中控件
    handleDeleteWidget () {
      this.widgetList[this.activeLayoutIndex].children[this.rowIndex].rowCells[this.colIndex].component.splice(0)
    },
    handleLayoutChoose (cEvt) {
      this.activeLayoutIndex = cEvt.oldIndex
    },
    // 拖拽布局控件
    handleLayoutChange (evt) {
      if (evt.moved) {
        this.activeLayoutIndex = evt.moved.newIndex
      }
      if (evt.added) {
        this.activeLayoutIndex = evt.added.newIndex
        // 再次拖拽表单的时候，需要把行列焦点重新设置，因为上个焦点的位置可能大于当前拖拽的
        this.rowIndex = 0
        this.colIndex = 0
      }
    },
    // 表格添加行和列
    changeRowsOrCols (payload) {
      let oldRows = this.widgetList[this.activeLayoutIndex].payload.rows
      let newRows = payload.rows
      let oldColumns = this.widgetList[this.activeLayoutIndex].payload.columns
      let newColumns = payload.columns
      // 表格行的变化
      if (newRows > oldRows) {
        let obj = {
          rowIndex: newRows - 1,
          rowCells: []
        }
        for (let i = 0; i < oldColumns; i++) {
          obj.rowCells.push(
            {
              colIndex: i,
              colspan: 1,
              rowspan: 1,
              component: []
            }
          )
        }
        this.widgetList[this.activeLayoutIndex].children.push(obj)
      } else if (newRows < oldRows) {
        this.widgetList[this.activeLayoutIndex].children.pop()
        // 处理有合并单元格的行********************修改的数据太多，合并情况复杂，先搁置
        // this.handleDeleteRow(payload, newRows)
      }
      // 表格列的变化
      if (newColumns > oldColumns) {
        this.widgetList[this.activeLayoutIndex].children.forEach(item => {
          item.rowCells.push(
            { colIndex: newColumns - 1, colspan: 1, rowspan: 1, component: [] }
          )
        })
      } else if (newColumns < oldColumns) {
        // 当前列是否有被合并的单元格，如果有被合并的单元格，需要找到合并后的单元格

        this.widgetList[this.activeLayoutIndex].children.forEach(item => {
          item.rowCells.pop()
        })
      }
    },
    // 合并单元格对数据结构进行操作
    combineCell (payload) {
      // 既有行合并又有列合并
      if (payload.combine.length > this.widgetList[this.activeLayoutIndex].payload.combine.length) {
        let obj = payload.combine[payload.combine.length - 1]
        // 防止用户合并方向不是左上->右下,需要对输入的id进行容错处理
        // 保证r1,c1是id较小的单元格，r2,c2是id较大的单元格
        let firstArr = obj.firstId.split('|').map(item => Number(item))
        let secondArr = obj.secondId.split('|').map(item => Number(item))
        let [rowIndex1, colIndex1] = firstArr
        let [rowIndex2, colIndex2] = secondArr
        // if (colIndex1 > colIndex2 || rowIndex1 > rowIndex2) {
        //   [rowIndex1, colIndex1] = secondArr;
        //   [rowIndex2, colIndex2] = firstArr
        // }
        for (let i = rowIndex1; i < rowIndex2 + 1; i++) { // 每行的操作
        // 每次循环都去找对应每一行应该删除对应的索引位置（索引位置可能不一样，因为前面可能有合并的单元格）
        // 找到第一个单元格设置colspan和rowspan（如果行数大于1，第一行单元格删除的个数要比其他行少一个
          let trueColIndex = this.widgetList[this.activeLayoutIndex].children[i].rowCells.findIndex(item => {
            return item.colIndex === colIndex1
          })
          if (i === rowIndex1) {
            this.widgetList[this.activeLayoutIndex].children[i].rowCells[trueColIndex].colspan = colIndex2 - colIndex1 + 1
            this.widgetList[this.activeLayoutIndex].children[i].rowCells[trueColIndex].rowspan = rowIndex2 - rowIndex1 + 1
            this.widgetList[this.activeLayoutIndex].children[i].rowCells[trueColIndex].colspan = colIndex2 - colIndex1 + 1
            this.widgetList[this.activeLayoutIndex].children[i].rowCells.splice(trueColIndex + 1, colIndex2 - colIndex1)
          } else {
            this.widgetList[this.activeLayoutIndex].children[i].rowCells.splice(trueColIndex, colIndex2 - colIndex1 + 1)
          }
        }
        // 处理合并单元格时，当焦点在被合并的单元格里面，对应的的配置信息报错问题,所以要把焦点放到最终合并的单元格上
        // 还有合并单元格后，里面没有组件
        // console.log(firstArr)
        // 复制要考虑真实的索引位置
        let trueRowIndex = this.widgetList[this.activeLayoutIndex].children.findIndex(item => {
          return item.rowIndex === rowIndex1
        })
        let trueColIndex = this.widgetList[this.activeLayoutIndex].children[trueRowIndex].rowCells.findIndex(item => {
          return item.colIndex === colIndex1
        })
        this.rowIndex = trueRowIndex
        this.colIndex = trueColIndex
        console.log('合并生成的单元格', trueRowIndex, trueColIndex)
        if (this.widgetList[this.activeLayoutIndex].children[this.rowIndex].rowCells[this.colIndex].component.length) {
          this.activeIndex = this.rowIndex + '|' + this.colIndex
        }
      }
    },
    // 处理删除当前行,包含合并单元格（还是有bug）
    handleDeleteRow (payload, newRows) {
      // 行删除，需要修改合并后的单元格的配置信息************************
      // 1.判断当前行是否有被合并的单元格，
      // 2.如果有被合并的单元格，需要找到合并后的单元格
      // 3.修改rowspan,还要修改combine(如果只有一列两行，要删除当前的合并信息,)
      // 删除的合并单元格都是当前行
      if (payload.combine.length) {
        payload.combine.forEach(item => {
          let firstArr = item.firstId.split('|').map(e => Number(e))
          let secondArr = item.secondId.split('|').map(e => Number(e))
          let [rowIndex1, colIndex1] = firstArr
          let [rowIndex2, colIndex2] = secondArr
          if (rowIndex2 === newRows) { // 当前删除的行中包含合并单元格
            if (rowIndex1 === newRows) {
              // 处理一下，删除的合并单元格都是当前行
            }
            item.secondId = rowIndex2 - 1 + '|' + colIndex2
            this.widgetList[this.activeLayoutIndex].children[rowIndex1].rowCells.forEach(el => { // 找到合并的单元格，修改信息
              if (el.colIndex === colIndex1) {
                console.log(el)
                el.rowspan--
              }
            })
          }
          payload.combine = payload.combine.filter(k => {
            return k.firstId !== k.secondId
          })
        })
      }
    },
    finishConfig () {
    }
  }
}
</script>

<style lang="scss" scoped>
.drag {
  height: calc(100vh - 80px);
  width: 100%;
  display: flex;
  &-left {
    width: 125px;
    background-color: #f0f0f0;
    overflow: auto;
  }
  &-center {
    flex: 1;
    overflow:auto;
    border-left: 1px solid #333;
    border-right: 1px solid #333;
  }
  &-right {
    width: 450px;
    height: 100%;
    overflow: auto;
    background-color: #f0f0f0;
    padding: 0 10px 80px;
    position: relative;
    .finish-config-style {
      width: 450px;
      background-color: #fff;
      position: fixed;
      bottom: 0;
      right: 0;
      padding: 10px;
      text-align: right;
      box-shadow: 0 -5px 10px 0 rgba(0, 0, 0, 0.1);
    }
  }
}
.pc {
  display: block;
  margin: auto;
  background: url("~@/assets/images/pc-box.png") no-repeat;
  background-size: cover;
  height: 700px;
  width: 1470px;
  // border:1px solid red;
  padding: 50px 5px;
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  p{
    color: red;
  }
  .drag-area {
    margin: 0 auto;
    width: 1080px;
    height: 620px;
    overflow: auto;
    // flex: 1;
    .list-group-item {
      width: 100%;
    }
    .list-layout-item {
      margin-bottom:20px;
      width: 100%;
    }
  }
}

.is-actived {
  border: 1px solid red;
}
.is-layout-actived{
  background-color:rgb(252, 230, 230);
}
.is-block {
  display: block !important;
  margin: 5px auto;
}

.delete-btn {
  text-align: center;
  padding-bottom: 5px;
  margin-top: 10px;
}
</style>
