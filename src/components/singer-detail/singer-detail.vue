<template>
    <transition name="slide">
        <music-list></music-list>
    </transition>
</template>

<script>
    import MusicList from '../music-list/music-list'
    import {getSingerDetail} from '@/api/singer'
    import {createSong} from 'common/js/song'
    import {ERR_OK} from "@/api/config"
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
        data(){
            return{
                songs:[]
            }
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
                if(data.code==ERR_OK){
                    this.songs = this._normalizeSong(data.data.list)
                }
            },
            _normalizeSong(list){
                let ret = []
                list.forEach((item) => {
                    let {musicData} = item
                    if (musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
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
