<template>
    <div>
        歌手
    </div>
</template>

<script>
    import {getSingerList} from 'api/singer.js'
    export default {
        data(){
            return{
                singers:[]
            }
        },
        mounted(){
            this._getSingerList()
        },
        methods:{
            async _getSingerList(){
                const res = await getSingerList()
                this.singers=res.data.list
            }
        }
    }
</script>

<style scoped>

</style>