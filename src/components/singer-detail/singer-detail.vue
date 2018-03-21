<template>
    <transition name="slide">
        <music-list></music-list>
    </transition>
</template>

<script>
    import MusicList from '../music-list/music-list'
    import {getSingerDetail} from '@/api/singer'
    import {mapGetters} from 'vuex'
    export default {
        components:{
            MusicList
        },
        computed:{
             ...mapGetters([
                 'singer'
             ])
        },
        mounted(){
            this._getSingerDetail()
        },
        methods:{
            async _getSingerDetail(){
                if(!this.singer.id){
                    this.$router.push({
                        path:'/singer'
                    })
                }
                const data = await getSingerDetail(this.singer.id)
                console.log(data)
            }
        }
    }
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
