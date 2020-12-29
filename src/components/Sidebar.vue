<template>
  <div class="m-menus">
    <el-tree
        class="filter-tree"
        :data="menus"
        node-key="id"
        ref="tree"
        @node-click="()=>{}"
    >
      <router-link
          class="el-tree-node__label"
          slot-scope="{ node, data }"
          :to="{name:'normal', params: {tag: data.key}}"
      >
        <span class="u-name" v-text="data.label"></span>
        <em
            v-if="data.items_total"
            class="u-count"
            v-text="`(${data.items_total})`"
        ></em>
      </router-link>
    </el-tree>
  </div>
</template>

<script>
  const {JX3BOX} = require("@jx3box/jx3box-common");
  import {get_collection_menus} from '../service/collection';

  export default {
    name: "Sidebar",
    data: function () {
      return {
        menus: null,
      };
    },
    mounted() {
      // 异步加载侧边栏数据
      get_collection_menus().then(
        (data) => {
          data = data.data;
          if (data.code === 200) {
            this.menus = data.data.menus;
            // 展开菜单
            this.expand_menu();
          }
        }
      );
    },
    watch: {
      sidebar: {
        immediate: true,
        deep: true,
        handler() {
          // 展开菜单
          this.expand_menu();
        },
      },
    },
    methods: {
      expand_menu() {
        // this.$nextTick(() => {
        //   let AucGenre = this.sidebar.AucGenre;
        //   let AucSubTypeID = this.sidebar.AucSubTypeID;
        //   let key = AucGenre + (AucSubTypeID ? `-${AucSubTypeID}` : "");
//
        //   if (key) {
        //     let node = this.$refs.tree.store.getNode(key);
        //     if (node) {
        //       node.expanded = true;
        //       if (node.parent) node.parent.expanded = true;
        //       this.$refs.tree.store.setCurrentNode(node);
        //     }
        //   }
        // });
      },
    },
  };
</script>

<style lang="less">
  @import "../assets/css/components/sidebar.less";
</style>
