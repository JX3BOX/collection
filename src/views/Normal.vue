<template>
    <div class="c-normal" v-loading="loading">
        <Search />

        <div v-if="JSON.stringify(collections) === '[]'">
            <el-alert title="暂无剑三小册记录" type="info" center show-icon :closable="false"></el-alert>
        </div>

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
</template>

<script>
import CollectionSingle from "../components/CollectionSingle";
import Search from "../components/Search.vue";
import { get_collections } from "../service/collection";

export default {
    name: "Normal",
    data: function () {
        return {
            collections: null,
            collections_total: 0,
            page: 1,
            length: 20,
            loading: false,
        };
    },
    methods: {
        page_change_handle(page) {
            this.$router.push({
                name: "normal",
                params: { tag: this.$route.params.tag },
                query: { page: page },
            });
        },
    },
    components: {
        CollectionSingle,
        Search,
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                let tag = this.$route.params.tag;
                let keyword = this.$route.query.keyword;
                this.page = parseInt(this.$route.query.page);
                let params = { page: this.page, limit: this.length };
                if (tag) params.tag = tag;
                if (keyword) params.keyword = keyword;

                // 获取剑三小册列表
                this.loading = true;
                get_collections(params)
                    .then(
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
                    )
                    .finally(() => {
                        this.loading = false;
                    });
            },
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/normal.less";
</style>
