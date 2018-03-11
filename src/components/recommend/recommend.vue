<template>
    <div>
        推荐
    </div>
</template>

<script>
import { getRecommend } from "../..//api/recommend";
export default {
  created() {
    this._getRecommend();
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped>

</style>