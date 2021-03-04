<template>
  <div class="drag-tools">
    <!-- <h4>组件库</h4> -->
    <draggable class="list-group" :list="toolsList" :group="{ name: 'widget', pull: 'clone', put: false }" :sort="false" :clone="handleClone" @change="log">
      <div class="list-group-item" v-for="(el, i) in toolsList" :key="i">
          {{el.title}}
      </div>
    </draggable>
  </div>
</template>

<script>
let idGlobal = 0

class Payload {
  constructor () {
    this.notes = '名称'
    this.key = 'key' + (new Date().getTime())
    this.type = 'varchar'
    this.isWrite = '0'
    this.isRead = '0'
  }
}

export default {
  data () {
    return {
      active: 'WidgetText',
      toolsList: [
        {
          title: '标签',
          type: 'widget-text',
          payload: {
            name: '',
            notes: '标签',
            text: 'text',
            level: 'h3',
            isBlock: '1'
          }
        },
        {
          title: '输入框',
          type: 'widget-input',
          payload: {
            name: 'widget-input',
            inputType: 'text',
            rule: '',
            defaultValueRadio: 'none',
            defaultValue: '',
            orderFilter: '0',
            listShow: '0'
          }
        },
        {
          title: '单选框',
          type: 'widget-radio',
          payload: {
            name: 'widget-radio',
            acount: 2,
            defaultValue: '',
            orderFilter: '0',
            listShow: '0',
            list: [{ name: '选项名称1' }, { name: '选项名称2' }]
          }
        },
        {
          title: '下拉框',
          type: 'widget-select',
          payload: {
            name: 'widget-select',
            acount: 2,
            defaultValue: '',
            orderFilter: '0',
            listShow: '0',
            isAssociateForm: '0',
            list: [{ name: '选项名称1' }, { name: '选项名称2' }]
          }
        }
      ]
    }
  },
  methods: {
    log (evt) {
      // console.log(evt)
    },
    handleClone ({ title, type, payload }) {
      let obj = {
        title,
        type,
        payload: Object.assign(new Payload(), payload),
        id: idGlobal++
      }
      return obj
    }
  }
}
</script>

<style lang="scss" scoped>
h4{
  margin-left: 30px;
  }
.list-group {
  overflow: hidden;
  padding: 0 5px;
  &-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100px;
    height:50px;
    background-color: #fb4d4d;
    padding: 3px;
    color: #333;
    font-weight: 600;
    border-radius: 6px;
    margin-bottom: 5px;
  }
}
</style>
