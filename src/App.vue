<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="文集小册"
            slug="collection"
            root="/collection"
            :publishEnable="true"
            :feedbackEnable="true"
            :adminEnable="false"
        >
            <img slot="logo" svg-inline :src="getAppIcon('collection')" />
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
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
import lodash from 'lodash'
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
    methods : {
        getAppIcon
    }
};
</script>
