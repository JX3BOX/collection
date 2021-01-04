<template>
  <div class="c-home">
    <Search/>
    <div class="m-module no-border">
      <div class="m-head">
        <h4 class="u-title">
          <i class="el-icon-location-information"></i>
          <span> 最新小册</span>
        </h4>
        <div class="u-other">
          <router-link class="u-other-item u-more" target="_blank" :to="{name: 'normal'}">查看更多 &raquo;</router-link>
          <span class="u-other-item">|</span>
          <a class="u-other-item u-feedback" target="_blank" :href="feedback">反馈建议 &raquo;</a>
        </div>
      </div>
      <div class="m-body">
        <div class="c-collections">
          <CollectionSingle v-for="(collection,key) in collections" :key="key" :collection="collection"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from "../components/Search.vue";
  import CollectionSingle from "../components/CollectionSingle";
  const { JX3BOX } = require("@jx3box/jx3box-common");
  import {get_collections} from "../service/collection";

  export default {
    name: "Home",
    props: [],
    data: function () {
      return {
        feedback: JX3BOX.feedback,
        collections: null,
      };
    },
    mounted() {
      // 获取剑三小册列表
      get_collections({limit: 20}).then(
        (data) => {
          data = data.data;
          if (data.code === 200) {
            this.collections = data.data.data;
          }
        }
      );
    },
    components: {
      CollectionSingle,
      Search,
    },
  };
</script>

<style lang="less">
  @import "../assets/css/home.less";
</style>
