<template>
  <draggable :list="widgetList" :group="group" @change="handleChange" @choose="handleChoose">
    <div :class="['list-group-item',{'is-actived': activeIndex === idx}]"
      v-for="(e, idx) in widgetList" :key="idx"  >
      <component style="width:100%" v-bind:is="e.type" :payload="e.payload">
        <template v-slot:default="slotProps">
          <div v-for="(row,rowIndex) in 2" :key="rowIndex">
            <div v-for="(col,colIndex) in 2" :key="colIndex">
              <widget-draggable
                v-if="slotProps.data ===rowIndex + '|' +colIndex"
                :rowCol="slotProps.data"
                :group="e.group"
                :widgetList="e.children"
              ></widget-draggable>
            </div>
          </div>
        </template>
      </component>
    </div>
  </draggable>
</template>

<script>
// 布局控件
import WidgetTable from '@/components/pc/WidgetTable'
import WidgetTableConfig from '@/components/pc/WidgetTable/config'
// 其他
import WidgetText from '@/components/pc/WidgetText'
import WidgetTextConfig from '@/components/pc/WidgetText/config'
import WidgetInput from '@/components/pc/WidgetInput'
import WidgetInputConfig from '@/components/pc/WidgetInput/config'
import WidgetRadio from '@/components/pc/WidgetRadio'
import WidgetRadioConfig from '@/components/pc/WidgetRadio/config'
import WidgetSelect from '@/components/pc/WidgetSelect'
import WidgetSelectConfig from '@/components/pc/WidgetSelect/config'
export default {
  name: 'widget-draggable',
  components: {
    WidgetText,
    WidgetTextConfig,
    WidgetInput,
    WidgetInputConfig,
    WidgetRadio,
    WidgetRadioConfig,
    WidgetSelect,
    WidgetSelectConfig,
    WidgetTable,
    WidgetTableConfig
  },
  props: ['group', 'widgetList', 'rowCol'],
  data () {
    return {
      activeIndex: 0
    }
  },
  methods: {
    handleChange (...args) {
      console.log(this.rowCol)
      console.log('handleChange', args)
    },
    handleChoose () {}
  }
}
</script>
