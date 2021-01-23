<template>
    <div class="c-my-collections">
        <h3 class="c-sidebar-right-title">
            <i class="u-icon u-icon-mycollection"
                ><img svg-inline src="../assets/img/my.svg"
            /></i>
            <span>我的小册</span>
            <a
                class="fr el-button el-button--success el-button--mini"
                :href="publish_url('collection')"
            >
                <i class="el-icon-document-add"></i>
                <span>创建</span>
            </a>
        </h3>
        <div class="m-my-collections">
            <template v-if="data && data.length">
                <router-link
                    class="m-my-collection"
                    v-for="(collection, key) in $store.state.my_collections"
                    :key="key"
                    :to="{
                        name: 'view',
                        params: { collection_id: collection.id },
                    }"
                >
                    <h5 class="u-title" v-text="collection.title"></h5>
                    <div class="u-misc">
                        <div @click="delete_handle($event, collection.id)">
                            <i class="el-icon-delete u-delete" title="删除"></i>
                        </div>
                        <div @click="edit_handle($event, collection.id)">
                            <i class="el-icon-edit u-edit" title="编辑"></i>
                        </div>
                        <span
                            class="u-updated"
                            v-text="
                                '编辑于 ' +
                                    $options.filters.date_format(
                                        collection.updated
                                    )
                            "
                        ></span>
                    </div>
                </router-link>
                <a
                    class="u-more"
                    href="/dashboard/#/other?type=collection"
                    target="_blank"
                    >查看更多 &raquo;</a
                >
            </template>
            <div class="u-tip" v-else-if="user.uid">
                <i class="el-icon-warning-outline"></i> 暂无剑三小册记录
            </div>
            <div class="u-tip" v-else>
                <i class="el-icon-warning-outline"></i> 请先进行登录
            </div>
        </div>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user.js";
import { get_my_collections, remove_collection } from "../service/collection";
import publish_url from "../filters/PublishUrl";

export default {
    name: "MyCollections",
    data() {
        return {
            user: User.getInfo(),
            limit: 5,
        };
    },
    computed: {
        data: function() {
            return this.$store.state.my_collections;
        },
    },
    methods: {
        publish_url,
        edit_handle($event, collection_id) {
            $event.preventDefault();
            location.href = this.publish_url(`collection/${collection_id}`);
            return false;
        },
        delete_handle($event, collection_id) {
            $event.preventDefault();
            this.$confirm("确认是否删除该剑三小册？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                remove_collection(collection_id).then((data) => {
                    data = data.data;
                    if (data.code === 200) {
                        this.$message.success(data.message);
                        // 获取我的小册
                        get_my_collections({ limit: this.limit });
                    } else {
                        this.$message.error(data.message);
                    }
                });
            });
            return false;
        },
    },
    mounted() {
        // 获取我的小册
        get_my_collections({ limit: this.limit });
    },
};
</script>

<style lang="less">
@import "../assets/css/components/my_collections.less";
</style>
