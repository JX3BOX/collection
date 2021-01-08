<template>
  <div class="c-extend">
    <RightSideMsg>
      <em>官方反馈交流Q群</em> :
      <strong>
        <a href="https://jq.qq.com/?_wv=1027&k=5S50j08">614370825</a>
      </strong>
    </RightSideMsg>

    <MyCollections />
    <HotCollections />
  </div>
</template>

<script>
  import MyCollections from "../components/MyCollections";
  import HotCollections from "../components/HotCollections";

  export default {
    name: "Extend",
    components: {
      MyCollections,
      HotCollections,
    },
  };
</script>

<style lang="less">
  @import "../assets/css/components/extend.less";
</style>
