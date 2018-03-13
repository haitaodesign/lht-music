<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { addClass } from '@/common/js/dom.js'
// import BScroll from 'better-scroll'
export default {
  name: "slider",
  props:{
      loop:{
          type:Boolean,
          default:true
      },
      autoPlay:{
          type:Boolean,
          default:true
      },
      interval:{
          type:Number,
          default:400
      }
  },
  mounted(){
      setTimeout(() => {
          this._setSliderWidth()
      }, 20);
  },
  data(){
      return{
      }
  },
  methods:{
      _setSliderWidth(){
          this.children = this.$refs.sliderGroup.children

          let width=0
          let sliderWidth = this.$refs.slider.clientWidth
          for(let i=0;i<this.children.length;i++){
              let child = this.children[i]
              addClass(child,'slider-item')
              child.style.width=sliderWidth+'px'
              width+=sliderWidth
          }
          if(this.loop){
              width += 2 * sliderWidth
          }
          this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider(){

      }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable'
.slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
</style>
