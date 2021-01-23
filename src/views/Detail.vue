<template>
    <div class="m-collection-detail">
        <Search />

        <div v-if="JSON.stringify(collection) === '{}'">
            <el-alert
                title="该剑三小册不存在或已被删除"
                type="info"
                center
                show-icon
                :closable="false"
            ></el-alert>
        </div>

        <div
            class="m-collection-detail-content"
            v-if="collection && JSON.stringify(collection) !== '{}'"
        >
            <header class="m-single-header">
                <!-- 标题 -->
                <div class="m-single-title">
                    <a
                        class="u-title u-sub-block"
                        :href="url"
                        :title="collection.title"
                    >
                        <img
                            v-if="!collection.public"
                            class="u-private"
                            svg-inline
                            src="../assets/img/lock.svg"
                            title="仅自己可见"
                        />
                        <span class="u-title-text">{{ collection.title }}</span>
                    </a>
                </div>

                <!-- 信息 -->
                <div class="m-single-info">
                    <!-- 用户名 -->
                    <div class="u-author u-sub-block">
                        <i class="u-author-icon"
                            ><img svg-inline src="../assets/img/author.svg"
                        /></i>
                        <a
                            class="u-name"
                            :href="collection.user_id | authorLink"
                            >{{ collection.user_nickname }}</a
                        >
                    </div>

                    <!-- 发布日期 -->
                    <span class="u-podate u-sub-block" title="发布日期">
                        <i class="u-icon-podate"
                            ><img svg-inline src="../assets/img/podate.svg"
                        /></i>
                        <time>{{ date_format(collection.created) }}</time>
                    </span>

                    <!-- 最后更新 -->
                    <span class="u-modate u-sub-block" title="最后更新">
                        <i class="u-icon-modate"
                            ><img svg-inline src="../assets/img/modate.svg"
                        /></i>
                        <time>{{ date_format(collection.updated) }}</time>
                    </span>

                    <!-- 查看次数 -->
                    <span class="u-views u-sub-block">
                        <i class="el-icon-view"></i>
                        {{ views }}
                    </span>

                    <!-- 编辑 -->
                    <a
                        class="u-edit u-sub-block"
                        :href="edit_link"
                        v-if="canEdit"
                    >
                        <i class="u-icon-edit el-icon-edit-outline"></i>
                        <span>编辑</span>
                    </a>
                </div>
            </header>

            <template v-if="collection.description">
                <el-divider content-position="left">
                    <i class="el-icon-collection"></i>
                    小册简介
                </el-divider>
                <div class="u-description">
                    <p v-html="collection.description"></p>
                </div>
            </template>

            <template v-if="collection.posts && collection.posts.length">
                <el-divider content-position="left">
                    <i class="el-icon-folder"></i>
                    小册文章
                </el-divider>
                <ul class="u-list">
                    <li
                        class="u-item"
                        v-for="(post, key) in collection.posts"
                        :key="key"
                    >
                        <span class="u-item-order">{{ key + 1 }}. </span>
                        <span class="u-item-link" v-if="post.type === 'custom'">
                            <i class="el-icon-link"></i>站外链接
                        </span>
                        <a
                            class="u-item-author"
                            v-if="post.type !== 'custom' && post.user_id"
                            target="_blank"
                            :href="post.user_id | author_url"
                        >
                            <img
                                class="u-avatar"
                                :src="get_thumbnail(post.user_avatar, 20, true)"
                            />
                            <span
                                class="u-nickname"
                                v-text="post.user_nickname"
                            ></span>
                            <span class="u-div">/</span>
                        </a>
                        <a
                            class="u-item-title"
                            target="_blank"
                            :href="
                                post.type === 'custom'
                                    ? post.url
                                    : get_link(post.type, post.id)
                            "
                        >
                            {{ post.title }}
                        </a>
                        <time
                            class="u-updated"
                            v-if="post.updated"
                            v-text="'最后更新于 ' + date_format(post.updated)"
                        ></time>
                    </li>
                </ul>
            </template>
        </div>

        <div
            class="m-comments"
            v-if="collection && JSON.stringify(collection) !== '{}'"
        >
            <el-divider content-position="left">
                <span style="color:#999999">
                    <i class="el-icon-chat-line-square"></i> 讨论
                </span>
            </el-divider>
            <jx3-comment :id="collection.id" category="collection" />
        </div>
    </div>
</template>

<script>
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import CollectionPublish from "@jx3box/jx3box-editor/service/enum/CollectionPublic";
import Search from "@/components/Search.vue";
import { get_collection } from "../service/collection";
import date_format from "../filters/DateFormat";
import {
    getThumbnail,
    getLink,
    getTypeLabel,
    authorLink,
    editLink,
} from "@jx3box/jx3box-common/js/utils";
import User from "@jx3box/jx3box-common/js/user.js";
import { post_collection_stat } from "../service/stat.js";
import { getStat } from "@jx3box/jx3box-common/js/stat";

export default {
    name: "Detail",
    props: [],
    data: function() {
        return {
            publish: CollectionPublish,
            collection: null,
            url: location.href,
            views: 0,
        };
    },
    computed: {
        edit_link: function() {
            return editLink("collection", this.collection.id);
        },
    },
    components: {
        Search,
        "jx3-comment": Comment,
    },
    methods: {
        date_format,
        get_thumbnail: getThumbnail,
        get_link: getLink,
        get_type_label: getTypeLabel,
        canEdit: function() {
            return (
                this.collection.user_id == User.getInfo().uid ||
                User.getInfo().group > 60
            );
        },
    },
    filters: {
        authorLink,
    },
    mounted() {
        post_collection_stat(this.$route.params.collection_id);
        getStat("collection", this.$route.params.collection_id).then((res) => {
            this.views = res.data.views;
        });
    },
    watch: {
        "$route.params.collection_id": {
            immediate: true,
            handler() {
                if (this.$route.params.collection_id) {
                    get_collection(this.$route.params.collection_id, {
                        post_extra: 1,
                    }).then((res) => {
                        res = res.data;
                        if (res.code === 200)
                            this.collection = res.data.collection
                                ? res.data.collection
                                : {};
                    });
                }
            },
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/components/single-header.less";
@import "../assets/css/views/detail.less";
</style>
