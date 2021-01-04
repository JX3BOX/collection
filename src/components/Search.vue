<template>
  <div
      class="m-search-bar"
      :class="$route.name == 'view' ? 'can-return' : ''"
  >
    <div class="m-return">
      <el-button class="u-return-btn" @click="return_handle"
      >返回
      </el-button
      >
    </div>
    <div class="m-search">
      <el-input
          class="u-search-input"
          v-model="keyword"
          @keydown.enter.native="search_handle"
          placeholder="输入剑三小册标题「回车」进行搜索"
      >
        <span slot="prepend">关键词</span>
      </el-input>
      <el-button
          class="u-search-btn"
          type="primary"
          plain
          @click="search_handle"
      >搜索
      </el-button
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: "Search",
    data() {
      return {
        keyword: "",
      };
    },
    methods: {
      return_handle() {
        history.back();
      },
      search_handle() {
        let params = {};
        // 标签筛选
        if (this.$store.state.sidebar.tag) params.tag = this.$store.state.sidebar.tag;

        this.$router.push({
          name: "normal",
          params: params,
          query: {keyword: this.keyword, page: 1},
        });
      },
    },
  };
</script>

<style lang="less">
  @import "../assets/css/components/search.less";
</style>
