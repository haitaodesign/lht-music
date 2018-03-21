<template>
    <div class="singer" ref="singer">
        <list-view :data="singers" @select="handleSelectSinger"></list-view>
        <router-view></router-view>
    </div>
</template>

<script>
    import {getSingerList} from 'api/singer.js'
    import {ERR_OK} from 'api/config.js'
    import Singer from 'common/js/singer.js'
    import ListView from '@/base/listview/listview.vue'
    import SingerList from '../music-list/music-list'
    import { mapMutations } from "vuex";
    const HOT_NAME = '热门'
    const HOT_SINGER_LEN = 10
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
                if(ERR_OK==0){
                    this.singers=this._normalzieSinger(res.data.list)
                }
            },
            _normalzieSinger(list){
                let map = {
                    hot:{
                        title:HOT_NAME,
                        items:[]
                    }
                }
                list.forEach((item,index) => {
                    if(index<HOT_SINGER_LEN){
                        map.hot.items.push(new Singer({
                            id:item.Fsinger_mid,
                            name:item.Fsinger_name
                        }))}
                    const key = item.Findex
                    if(!map[key]){
                        map[key]={
                            title:key,
                            items:[]
                      }
                    }
                    map[key].items.push(new Singer({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name
                    }))
                })
                let ret = []
                let hot = []
                for (let key in map) {
                   let val = map[key]
                   if(val.title.match(/[a-zA-Z]/)){
                       ret.push(val)
                   }else if(val.title===HOT_NAME){
                       hot.push(val)
                   }
                }
                ret.sort((a,b)=>{
                    return a.title.charCodeAt(0) -b.title.charCodeAt(0)
                })
                return hot.concat(ret)
            },
            handleSelectSinger(singer) {
                this.$router.push({
                    path:`/singer/${singer.id}`
                })
                this.set_Singer(singer)
            },
            ...mapMutations({
               set_Singer :'SET_SINGER'
            })
        },
        components:{
            ListView,
            SingerList
        }
    }
</script>

<style lang="stylus" scoped>
.singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
