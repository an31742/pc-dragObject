<template>
<div>
    <table border="1" cellpadding='0' cellspacing='0' style="width:100%">
        <tr v-for="(tr,trIndex) in payload" :key="trIndex">
            <td v-for='(td,tdIndex) in tr.rowCells' :key='tdIndex' :colspan="td.colspan" :rowspan='td.rowspan'>
              <slot v-bind:data="tr.rowIndex+'|'+ td.colIndex"></slot>
            </td>
        </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    payload: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      widgetList: []
    }
  }
}
</script>
<style lang="scss" scoped>
td {
  height: 50px;
  width:530px;
}
</style>
