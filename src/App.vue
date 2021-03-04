<template>
  <div class="app">
    <el-container class="app-body">
      <el-header style="height:80px">
        <span>{{title}}</span>
        <el-button
          v-if="$route.path === '/PcDrag'||$route.path === '/OneKeyRelease'|| $route.path === '/LookPc'"
          style="float: right;font-size:16px;height:59px;"
          size="small"
          type="primary"
          @click="$router.go(-1)"
        >返回</el-button>
      </el-header>
      <el-container>
        <el-main>
          <keep-alive include="Home">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '页面管理',
      id: 'UNI'
    }
  },
  watch: {
    '$route.path' (newV, oldV) {
      let option = {
        '/': '页面管理',
        '/PcDrag': '云表单设计器',
        '/OneKeyRelease': '一键发布',
        '/LookPc': '查看'
      }
      for (let path in option) {
        if (this.$route.path === path) {
          this.title = option[path]
        }
      }
    }
  }
}
</script>

<style lang="scss">
//固定页面
$header-height: 81px;
.app {
  width: 100%;
  height: 100%;
  min-width: 980px;
  overflow-x: hidden;
  overflow-y: hidden;
  .app-body {
    width: 100%;
    height: 100%;
    .el-header {
      width: 100%;
      position: fixed;
      box-sizing: border-box;
      background-color: #fb4d4d;
      border-bottom: 2px solid #fff;
      z-index: 1000;
      span {
        display: inline-block;
        font-size: 20px;
        font-weight: bold;
        color: #fff;
        line-height: 60px;
      }
    }
    .el-main {
      padding-left: 0;
      padding-right:0;
      padding-top: $header-height;
      min-height: 100vh;
      & > div {
        min-height: calc(100vh - #{$header-height});
      }
    }
  }
}
</style>
