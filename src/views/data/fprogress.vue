<template>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="percentage" status="success"></el-progress>
</template>

<script>
export default {
  data() {
    return {
      percentage: Math.max(10,parseInt(this.progress)),
      timerTmp:null,
    };
  },
  props: ["fid", "progress"],
  watch: {
    // status: () => {
    //   //   alert(1);
    // }
  },
  mounted: function() {
      this.timerTmp = setInterval(()=>{
        //   this.getProgress();
      },1000);
  },
  beforeDestroy:function(){
      clearInterval(this.timerTmp);
  },
  methods: {
    getProgress() {
      this.$http
        .post("http://localhost:3000/files/getImportProgress", {
          fid: this.fid
        })
        .then(
          response => {
            response.json().then(res => {
              if (res.code == 200) {
                this.percentage = parseInt(res.data);
                this.percentage = Math.max(10,this.percentage);
                if (this.percentage == 100){
                    clearInterval(this.timerTmp);
                }
              }else{
                  clearInterval(this.timerTmp);
              }
            });
          },
          response => {
              console.log(this);
            clearInterval(this.timerTmp);
            this.$notify.error({
              title: "错误",
              message: "服务器错误"
            });
          }
        );
    }
  },
  components: {}
};
</script>

<style lang="less">
</style>