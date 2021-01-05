<template>
  <div class="c-detail">
    <Search/>
    <div class="m-content" v-if="collection">
      <div class="m-title">
        <h3 class="u-title" v-text="collection.title"></h3>
        <span class="u-private" v-if="collection.public != publish.PRIVATE">私有</span>
      </div>

      <el-divider content-position="left">
        <i class="el-icon-notebook-2"></i>
        小册描述
      </el-divider>
      <div class="m-description">
        <p v-html="collection.description"></p>
      </div>

      <el-divider content-position="left">
        <i class="el-icon-collection"></i>
        小册文章
      </el-divider>
      <div class="m-posts">
        <a class="m-post" v-for="(post,key) in collection.posts" :key="key" target="_blank"
           :href="post.type === 'custom' ? post.url : get_link(post.type, post.id)">
          <a class="m-post-user" v-if="post.type !== 'custom' && post.user_id" target="_blank" :href="post.user_id | author_url">
            <img class="u-avatar" :src="get_thumbnail(post.user_avatar, 20)">
            <span class="u-nickname" v-text="post.user_nickname"></span>
          </a>
          <div class="m-post-title">
            <i v-if="post.type === 'custom'" class='el-icon-link'></i>
            <span v-text="post.title"></span>
          </div>
          <div class="m-post-type" v-text="post.type === 'custom' ? '自定义' : get_type_label(post.type)"></div>
          <div class="m-post-updated" v-if="post.updated" v-text="'最后更新于 ' + date_format(post.updated)"></div>
          <div class="u-post-custom" v-if="post.type === 'custom'">此文章为网站外链</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import CollectionPublish from '@jx3box/jx3box-editor/service/enum/CollectionPublic';
  import Search from '@/components/Search.vue';
  import {get_collection} from '../service/collection';
  import date_format from '../filters/DateFormat';
  import {getThumbnail, getLink, getTypeLabel} from "@jx3box/jx3box-common/js/utils";
  import { post_collection_stat } from "../service/stat.js";

  export default {
    name: "Detail",
    props: [],
    data: function () {
      return {
        publish: CollectionPublish,
        collection: null,
      };
    },
    components: {
      Search,
    },
    methods: {
      date_format,
      get_thumbnail: getThumbnail,
      get_link: getLink,
      get_type_label: getTypeLabel,
    },
    mounted() {
      post_collection_stat(this.$route.params.collection_id);
    },
    watch: {
      "$route.params.collection_id": {
        immediate: true,
        handler() {
          if (this.$route.params.collection_id) {
            get_collection(this.$route.params.collection_id, {post_extra: 1}).then(
              (res) => {
                res = res.data;
                if (res.code === 200) this.collection = res.data.collection;
              }
            )
          }
        },
      },
    },
  };
</script>

<style lang="less">
  @import "../assets/css/views/detail.less";
</style>
