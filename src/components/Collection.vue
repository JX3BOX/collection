<template>
  <div class="c-collection">
    <el-row :gutter="15">
      <el-col :span="4">
        <img class="u-image" :src="collection.image">
      </el-col>
      <el-col :span="20">
        <h3 class="u-title" v-text="collection.title"></h3>
        <ul class="u-tags m-list-style">
          <li v-for="(tag, key) in collection.tags" :key="key" v-text="tag" class="u-tag"></li>
        </ul>
        <p class="u-excerpt" v-html="collection.excerpt"></p>
        <ul class="m-posts m-list-style">
          <li v-for="(post, key) in collection.content" :key="key" v-text="post.title" class="m-post"></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Collection",
    props: ['collection', 'collectionId'],
    data: function () {
      return {};
    },
  };
</script>

<style lang="less">
  @import "../assets/css/components/collection.less";
</style>
