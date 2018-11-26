<template>
  <div id="app">
    <el-container>
      <!-- 左边菜单 -->
      <el-aside width="200px">
        <el-menu :default-active="openMeuns" class="el-menu-vertical-demo" @select="selectd" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>多页面</span>
            </template>
            <el-menu-item index="china">国家</el-menu-item>
            <el-menu-item index="china-taiwan">省</el-menu-item>
            <el-menu-item index="china-taiwan-tainan">市</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边内容 -->
      <el-main>
        <el-header>
          <a :href="mainDom+getPagePath"  class="showLink" target="_blank">当前页面的真实地址:{{mainDom}}{{getPagePath}}</a>
        </el-header>
        <!-- iframe用来展示页面内容 -->
        <iframe v-bind:src="getPagePath" width="100%" height="100%" frameborder="0" id="external-frame" class="concentIframe">这里是iframe区域</iframe>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'app',
  //  页面加载之前
  created() {},
  //  页面加载后
  mounted() {
    //读取用户选择的菜单，可能是刷新事件
    let temp = localStorage.getItem('choseMeun')
    this.openMeuns = temp === '' ? 'china' : temp
    this.baseSelect(temp) //确认iframe的地址

    // 拼装当前iframe的真实链接地址，可直接访问
    let thost = window.location.href
    this.mainDom = thost.substring(0, thost.length - 1)
  },
  data() {
    return {
      mainDom: '', //页面的域名
      openMeuns: 'china', //菜单默认打开的页面
      getPagePath: '/china.html', //控制iframe的地址,默认国家页面
    }
  },
  methods: {
    selectd(key, keyPath) { //菜单选中事件
      // 将选择的菜单存到localStorage
      localStorage.setItem('choseMeun', key)
      this.baseSelect(key)

    },
    baseSelect(key) { //根据菜单的选择决定iframe的地址
      let setUrl = "/" + key.split("-").join('/') + '.html'
      this.getPagePath = setUrl
    }
  }
}

</script>
<style scoped>
.el-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.concentIframe {}

.el-menu-vertical-demo {
  width: 100%;
  height: 100%;
}

.showLink {
  color: #d814d6;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
  line-height: 60px;
}

</style>
