<template>
    <div class="app-warp">
        <side-menu></side-menu>
        <div class="app-main" :class="{ hideSidebar: isActive }">
            <navbar></navbar>
            <tags-view></tags-view>
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
    import Navbar from './components/Navbar';
    import TagsView from './components/TagsView';
    import SideMenu from './components/SideMenu';
    import AppMain from './components/AppMain';
    export default {
        name: "layout",
        components: {
            Navbar,
            TagsView,
            SideMenu,
            AppMain
        },
        computed:{
            isActive(){
                return !this.$store.getters.sidebar.opened
            }
        }
    }
</script>

<style lang="less" scoped>
    .app-warp{
        position: relative;
        width: 100%;
        height: 100%;

        .app-main {
            min-height: 100%;
            transition: margin-left .28s;
            margin-left: 201px;
            position: relative;
        }
        .hideSidebar {
            margin-left: 65px !important;
        }
    }


</style>