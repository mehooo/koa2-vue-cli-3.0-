<template>
    <div class="navbar clear">
        <div class="menu-collapse">
            <i class="el-icon-sort" @click="handleCollapse"></i>
        </div>
        <breadcrumb class="breadcrumb"></breadcrumb>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/breadcrumb/breadcrumb';

    export default {
        name: "Navigation",
        components:{
            Breadcrumb
        },
        methods:{
            handleCollapse(){
                this.$store.dispatch('ToggleSideBar')
            }
        }
    }
</script>

<style scoped lang="less">
.navbar {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #fff;
    .menu-collapse {
        line-height: 50px;
        height: 50px;
        float: left;
        padding: 0 10px;
        .el-icon-sort {
            transform:rotate(90deg);
        }
    }
    .breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 10px;
        float: left;
    }
}
</style>