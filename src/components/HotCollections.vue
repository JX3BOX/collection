<template>
    <div class="c-hot-items">
        <h3 class="c-sidebar-right-title">
            <i class="u-icon u-icon-mycollection"
                ><img svg-inline src="../assets/img/rank2.svg"
            /></i>
            <span>热门小册</span>
        </h3>
        <div class="m-hot-items">
            <router-link
                class="m-hot-item"
                v-for="(item, key) in hot_collections"
                :key="key"
                :to="{ name: 'view', params: { collection_id: item.id } }"
            >
                <!-- <div class="m-image">
                    <img :src="$options.filters.cover_url(item.image)" />
                </div> -->
                <div class="m-content">
                    <div class="u-title">
                        <i class="el-icon-notebook-2"></i>
                        <span v-text="` ${item.title}`"></span>
                    </div>
                    <!-- <div class="u-excerpt" v-text="` ${item.excerpt}`"></div> -->
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
import { get_collections } from "../service/collection";
import { getStatRank } from "@jx3box/jx3box-common/js/stat";

export default {
    name: "MyCollections",
    data() {
        return {
            hot_collections: [],
        };
    },
    mounted() {
        // 获取热门小册
        getStatRank('collection').then((res) => {
            let list = res.data;
            let ranks = []
            let item_ids = []
            list.forEach((item) => {
                if(item.name.includes('collection')){
                    ranks.push(item.value)
                    item_ids.push(item.name.slice('collection'.length + 1,item.name.length))
                }
            })

            // 获取对应小册列表
            get_collections({ ids: item_ids, limit: item_ids.length }).then(
                (data) => {
                    data = data.data;
                    if (data.code === 200) {
                        let collections = data.data.data;
                        let output = [];
                        for (let i in collections) {
                            let collection_id = this.$_.get(
                                collections,
                                `${i}.id`
                            );
                            if (!collections[i]) continue;
                            collections[i].rank = collection_id
                                ? ranks[i]
                                : null;
                            output.push(collections[i]);
                        }
                        this.hot_collections = output;
                    }
                }
            );
        });
    },
};
</script>

<style lang="less">
@import "../assets/css/components/hot_collections.less";
</style>
