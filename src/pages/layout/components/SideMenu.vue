<template>
    <div class="side-wrap">
        <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :collapse="isCollapse"
                background-color="#304156"
                :router="true"
                text-color="#fff">
            <el-menu-item :index="item.path" v-for="item in routes" v-if="!item.hidden">
                <i :class="'el-icon-' + item.meta.icon"></i>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import store from '@/store/store.js'

    export default {
        data() {
            return {

            };
        },
        computed: {
            routes() {
                return store.getters.routers;
            },
            isCollapse() {
                return !this.$store.getters.sidebar.opened
            },
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(store.getters.routers);
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
    }
</script>
<style scoped lang="less">
    .side-wrap {
        transition: width .28s;
        height: 100%;
        position: fixed;
        font-size: 0;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
    }
</style>
<style lang="less">
    .side-wrap {
        .el-menu:not(.el-menu--collapse) {
            width: 200px;
            height: 100%;
        }
        .el-menu {
            height: 100%;
        }
    }

</style>