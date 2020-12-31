<template>
  <div class="c-collection">
    <div class="m-image">
      <img class="u-image" :src="collection.image">
    </div>
    <div class="m-content">
      <a :href="collection.user_id | author_url" class="m-user">
        <img class="u-avatar" :src="get_thumbnail(collection.user_avatar, 20)">
        <span class="u-nickname" v-text="collection.user_nickname"></span>
      </a>
      <div class="u-updated" v-text="'最后更新于 ' + date_format(collection.updated)"></div>
      <h3 class="u-title" v-text="collection.title"></h3>
      <ul class="u-tags m-list-style">
        <li v-for="(tag, key) in collection.tags" :key="key" v-text="tag" class="u-tag"></li>
      </ul>
      <p class="u-excerpt" v-html="collection.excerpt"></p>
      <div class="c-posts">
        <i class="el-icon-notebook-2"></i>
        <span class="u-posts-title">小册文章：</span>
        <div class="m-posts">
          <a :href="post.type === 'custom' ? post.url : get_link(post.type, post.id)"
             v-for="(post, key) in collection.content" :key="key" v-text="post.title" class="m-post"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import date_format from '../filters/DateFormat';
  import {getThumbnail, getLink} from "@jx3box/jx3box-common/js/utils";

  export default {
    name: "CollectionSingle",
    props: ['collection', 'collectionId'],
    methods: {
      date_format,
      get_thumbnail: getThumbnail,
      get_link: getLink,
    },
  };
</script>

<style lang="less">
  @import "../assets/css/components/collection.less";
</style>
