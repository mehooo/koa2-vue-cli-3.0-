<template>
    <div class="dashboard-wrap">
        <h1>{{this.title}}</h1>
    </div>

</template>

<script>
    import {getDashboardInfo} from '@/assets/api/dashboard';

    export default {
        name: "Index",
        data: function () {
            return {
                title: ''
            }
        },
        mounted: function () {
            this.getDashboardInfo();
        },
        methods: {
            getDashboardInfo() {
                getDashboardInfo().then(response => {
                    this.title = response.data.title;
                }).catch(error => {
                    console.info(error);
                })
            }
        }
    }
</script>

<style scoped>

</style>