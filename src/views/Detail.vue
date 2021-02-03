<template>
    <div class="m-collection-detail" v-loading="loading">
        <Search />

        <el-alert
            v-if="!collection"
            title="该剑三小册不存在或已被删除"
            type="info"
            center
            show-icon
            :closable="false"
        ></el-alert>

        <template v-else>
            <div class="m-collection-detail-content">
                <div class="m-collection-detail-header">
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
                                <span class="u-title-text">{{
                                    collection.title
                                }}</span>
                            </a>
                        </div>

                        <!-- 信息 -->
                        <div class="m-single-info">
                            <!-- ID -->
                            <span class="u-id u-sub-block"
                                ><span class="u-id-label">小册ID</span
                                ><span class="u-id-value">{{
                                    collection.id
                                }}</span></span
                            >

                            <!-- 用户名 -->
                            <div class="u-author u-sub-block">
                                <i class="u-author-icon"
                                    ><img
                                        svg-inline
                                        src="../assets/img/author.svg"
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
                                    ><img
                                        svg-inline
                                        src="../assets/img/podate.svg"
                                /></i>
                                <time>{{
                                    date_format(collection.created)
                                }}</time>
                            </span>

                            <!-- 最后更新 -->
                            <span class="u-modate u-sub-block" title="最后更新">
                                <i class="u-icon-modate"
                                    ><img
                                        svg-inline
                                        src="../assets/img/modate.svg"
                                /></i>
                                <time>{{
                                    date_format(collection.updated)
                                }}</time>
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

                            <!-- 编辑 -->
                            <a
                                href="javascript:void(0)"
                                class="u-delete u-sub-block"
                                @click="delete_handle($event, collection.id)"
                                v-if="canEdit"
                            >
                                <i class="u-icon-remove el-icon-delete"></i>
                                <span>删除</span>
                            </a>
                        </div>
                    </header>

                    <div class="m-collection-detail-panel">
                        <Fav
                            class="u-fav"
                            post-type="collection"
                            :post-id="collection.id"
                        />
                        <Like
                            class="u-like"
                            post-type="collection"
                            :post-id="collection.id"
                        />
                    </div>
                </div>

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
                            <span
                                class="u-item-link"
                                v-if="post.type === 'custom'"
                            >
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
                                    :src="
                                        get_thumbnail(
                                            post.user_avatar,
                                            20,
                                            true
                                        )
                                    "
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
                                v-text="
                                    '最后更新于 ' + date_format(post.updated)
                                "
                            ></time>
                        </li>
                    </ul>
                </template>
            </div>

            <div
                class="m-tags"
                v-if="collection.tags && collection.tags.length"
            >
                <div class="u-tags-title">
                    <i class="el-icon-price-tag"></i>
                    <span>标签</span>
                </div>
                <ul class="u-tags">
                    <li
                        v-for="(tag, key) in collection.tags"
                        :key="key"
                        v-text="tag"
                        class="u-tag"
                    ></li>
                </ul>
            </div>

            <div class="m-comments">
                <el-divider content-position="left">
                    <span style="color:#999999">
                        <i class="el-icon-chat-line-square"></i> 讨论
                    </span>
                </el-divider>
                <jx3-comment :id="collection.id" category="collection" />
            </div>
        </template>
    </div>
</template>

<script>
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import CollectionPublish from "@jx3box/jx3box-editor/service/enum/CollectionPublic";
import Search from "@/components/Search.vue";
import {
    get_collection,
    get_my_collections,
    remove_collection,
} from "../service/collection";
import date_format from "../filters/DateFormat";
import {
    getThumbnail,
    getLink,
    getTypeLabel,
    authorLink,
    editLink,
} from "@jx3box/jx3box-common/js/utils";
import User from "@jx3box/jx3box-common/js/user.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat";

export default {
    name: "Detail",
    props: [],
    data: function() {
        return {
            publish: CollectionPublish,
            collection: "",
            url: location.href,
            views: 0,
            loading: false,
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
                        // 返回主页
                        this.$router.push({ name: "home" });
                    } else {
                        this.$message.error(data.message);
                    }
                });
            });
            return false;
        },
    },
    filters: {
        authorLink,
    },
    mounted() {},
    watch: {
        "$route.params.collection_id": {
            immediate: true,
            handler() {
                if (this.$route.params.collection_id) {
                    this.loading = true;
                    get_collection(this.$route.params.collection_id, {
                        post_extra: 1,
                    })
                        .then((res) => {
                            res = res.data;
                            if (res.code === 200)
                                this.collection = res.data.collection
                                    ? res.data.collection
                                    : {};
                        })
                        .finally(() => {
                            this.loading = false;
                        });

                    postStat("collection", this.$route.params.collection_id);
                    getStat(
                        "collection",
                        this.$route.params.collection_id
                    ).then((res) => {
                        this.views = res.data.views;
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
