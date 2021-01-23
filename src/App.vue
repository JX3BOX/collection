<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="剑三小册"
            slug="collection"
            root="/collection"
            :publishEnable="true"
            :feedbackEnable="true"
            :adminEnable="false"
        >
            <img slot="logo" svg-inline src="./assets/img/collection.svg" />
        </Breadcrumb>
        <LeftSidebar>
            <Sidebar />
        </LeftSidebar>
        <Main :withoutRight="false">
            <!-- 路由页面内容 -->
            <router-view />
            <!-- 右侧栏 -->
            <RightSidebar>
                <Extend />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Extend from "@/components/Extend.vue";

const lodash = require("lodash");

export default {
    name: "App",
    components: {
        Sidebar,
        Extend,
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.$store.state.sidebar.tag = lodash.get(
                    this.$route,
                    "params.tag",
                    null
                );
            },
        },
    },
};
</script>
