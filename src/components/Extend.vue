<template>
    <div class="c-extend">
        <RightSideMsg>
            <em>官方反馈交流Q群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=CAiizina" v-if="client == 'origin'">590349918</a>
                <a href="https://jq.qq.com/?_wv=1027&k=5umZoT3B" v-else>2471800</a>
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
    computed : {
        client: function () {
            return this.$store.state.client;
        },
    }
};
</script>

<style lang="less">
@import "../assets/css/components/extend.less";
</style>
