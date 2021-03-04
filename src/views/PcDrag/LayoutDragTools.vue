<template>
  <div class="drag-tools">
    <!-- <h4>组件库</h4> -->
    <draggable class="list-group" :list="toolsList" :group="{ name: 'layout', pull: 'clone', put: false }" :sort="false" :clone="handleClone" @change="log">
      <div class="list-group-item" v-for="(el, i) in toolsList" :key="i">
          {{el.title}}
      </div>
    </draggable>
  </div>
</template>

<script>
let idGlobal = 0

export default {
  data () {
    return {
      toolsList: [
        {
          title: '表格',
          type: 'widget-table',
          payload: {
            tableIndex: 0,
            name: 'widget-table',
            type: 'layout',
            rows: 2,
            columns: 2,
            combine: [] // 既有行合并又有列合并
          },
          children: [{
            // 行
            rowIndex: 0,
            rowCells: [ {
              colIndex: 0,
              colspan: 1,
              rowspan: 1,
              component: []
            },
            {
              colIndex: 1,
              colspan: 1,
              rowspan: 1,
              component: []
            }]
          },
          {
            // 行
            rowIndex: 1,
            rowCells: [ {
              colIndex: 0,
              colspan: 1,
              rowspan: 1,
              component: []
            },
            {
              colIndex: 1,
              colspan: 1,
              rowspan: 1,
              component: []
            }]
          }]
        }
      ]
    }
  },
  methods: {
    log (evt) {
      // console.log(evt)
    },
    handleClone ({ title, type, payload, children }) {
      let obj = {
        title,
        type,
        tableIndex: idGlobal++,
        payload: Object.assign({}, payload),
        children: JSON.parse(JSON.stringify(children))
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
    height: 70px;
    background-color: #fb4d4d;
    padding: 3px;
    color: #333;
    font-weight: 600;
    border-radius: 6px;
    margin-bottom: 5px;
    img{
      width: 25px;
      height: 25px;
      margin-bottom:5px;
    }
  }
}
</style>
