<template>
  <div class="c-normal">
    <Collection v-for="(collection,key) in collections" :key="key" :collection="collection"/>
    <el-pagination
        background
        :total="collections_total"
        hide-on-single-page
        layout="prev, pager, next"
        :current-page="page"
        :page-size="length"
        prev-html="&laquo;"
        next-html="&raquo;"
        @current-change="page_change_handle"
    ></el-pagination>
  </div>
</template>

<script>
  import Collection from "../components/Collection";
  import {get_collections} from '../service/collection';

  export default {
    name: "Normal",
    data: function () {
      return {
        collections: null,
        collections_total: 0,
        page: 1,
        length: 20,
      };
    },
    methods: {
      page_change_handle(page) {
        this.$router.push({
          name: "normal",
          params: {tag: this.$route.params.tag},
          query: {page: page},
        });
      },
    },
    components: {
      Collection,
    },
    watch: {
      $route: {
        immediate: true,
        handler() {
          let tag = this.$route.params.tag;
          this.page = parseInt(this.$route.query.page);
          // 获取剑三小册列表
          get_collections({
            tag: tag,
            page: this.page,
            limit: this.length,
          }).then(
            (data) => {
              data = data.data;
              if (data.code === 200) {
                this.collections = data.data.data;
                this.collections_total = data.data.total;
              }
            },
            () => {
              this.collections = false;
            }
          );
        },
      },
    },
  };
</script>

<style lang="less">
  @import "../assets/css/normal.less";
</style>
