<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
                v-for="(item, index) in levelList"
                :key="item.path"
                v-if="item.meta.title">
            <span v-if="index === levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
            <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        name: "breadcrumb",
        created() {
            this.getBreadcrumb()
        },
        data() {
            return {
                levelList: null
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb()
            }
        },
        methods: {
            getBreadcrumb() {
                let matched = this.$route.matched.filter(item => item.name);
                console.log('matched--', matched);
                // const first = matched[0];
                // if (first && first.name !== 'dashboard') {
                //     matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
                // }
                console.log(matched);
                this.levelList = matched
            }
        }
    }
</script>

<style scoped>
    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
</style>