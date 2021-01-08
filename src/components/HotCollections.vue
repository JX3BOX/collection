<template>
  <div class="c-hot-items">
    <h3 class="c-sidebar-right-title">
      <img class="u-icon" svg-inline src="../assets/img/rank.svg"/>
      <span>热门小册</span>
    </h3>
    <div class="m-hot-items">
      <router-link class="m-hot-item" v-for="(item, key) in hot_collections" :key="key"
                   :to="{ name: 'view', params: { collection_id: item.id } }">
        <div class="m-image">
          <img :src="item.image">
        </div>
        <div class="m-content">
          <div class="u-title">
            <i class="el-icon-notebook-2"></i>
            <span v-text="` ${item.title}`"></span>
          </div>
          <div class="u-excerpt" v-text="` ${item.excerpt}`"></div>
          <div class="u-rank" v-if="item.rank">
            <i class="el-icon-grape"></i>
            <span v-text="`七天 - ${item.rank['7days']}`"></span>
            <i class="el-icon-pear"></i>
            <span v-text="`三十天 - ${item.rank['30days']}`"></span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {get_collections} from "../service/collection";
  import {getRank} from "../service/stat";

  export default {
    name: "MyCollections",
    data() {
      return {
        hot_collections: null,
      }
    },
    mounted() {
      // 获取热门小册
      getRank().then((data) => {
        data = data.data;

        // 整理排名数据
        let ranks = [],
          item_ids = [];
        for (let i in data) {
          let item_id = this.$_.get(data, `${i}.name`);
          if (item_id) {
            item_ids.push(item_id);
            ranks[item_id] = this.$_.get(data, `${i}.value`, {});
          }
        }
        item_ids = item_ids.slice(0, 15);

        // 获取对应小册列表
        get_collections({ids: item_ids, limit: item_ids.length}).then(
          (data) => {
            data = data.data;
            if (data.code === 200) {
              let collections = data.data.data;
              let output = [];
              for (let i in collections) {
                let collection_id = this.$_.get(collections, `${i}.id`);
                if(!collections[i]) continue;
                collections[i].rank = collection_id ? this.$_.get(ranks, collection_id, null) : null;
                output.push(collections[i]);
              }
              this.hot_collections = output;
            }
          }
        );
      });
    }
  }
</script>

<style lang="less">
  @import "../assets/css/components/hot_collections.less";
</style>