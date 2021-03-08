<template>
    <div class="c-home">
        <Search />
        <div class="m-module no-border">
            <div class="m-head">
                <h4 class="u-title">
                    <i class="el-icon-location-information"></i>
                    <span> 最新小册</span>
                </h4>
                <div class="u-other">
                    <!-- <router-link class="u-other-item u-more" target="_blank" :to="{name: 'normal'}">查看更多 &raquo;</router-link> -->
                    <!-- <span class="u-other-item">|</span> -->
                    <a
                        class="u-other-item u-feedback"
                        target="_blank"
                        :href="feedback"
                        >反馈建议 &raquo;</a
                    >
                </div>
            </div>
            <div class="m-body">
                <div class="c-collections">
                    <CollectionSingle
                        v-for="(collection, key) in collections"
                        :key="key"
                        :collection="collection"
                    />
                </div>
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
        </div>
    </div>
</template>

<script>
import Search from "../components/Search.vue";
import CollectionSingle from "../components/CollectionSingle";
const { JX3BOX } = require("@jx3box/jx3box-common");
import { get_collections } from "../service/collection";

export default {
    name: "Home",
    props: [],
    data: function() {
        return {
            feedback: JX3BOX.feedback,
            collections: [],
            collections_total: 0,
            page: 1,
            length: 10,
        };
    },
    methods: {
        page_change_handle(page) {
            this.$router.push({
                params: { tag: this.$route.params.tag },
                query: { page: page },
            });
        },
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                let tag = this.$route.params.tag;
                let keyword = this.$route.query.keyword;
                this.page = parseInt(this.$route.query.page) || 1;
                let params = { page: this.page, limit: this.length };
                if (tag) params.tag = tag;
                if (keyword) params.keyword = keyword;

                // 获取剑三小册列表
                get_collections(params).then(
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
    components: {
        CollectionSingle,
        Search,
    },
};
</script>

<style lang="less">
@import "../assets/css/home.less";
</style>
