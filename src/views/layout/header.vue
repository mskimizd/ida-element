<template>
    <div class="page-header">
        <breadcrumb class="breadcrumb-container"/>
        <div class="configuration" v-on:click="collapseGadget">
            <i class="el-icon-fa-cogs"></i>
        </div>
    </div>
</template>

<script>

  import breadcrumb from '~/components/breadcrumb';

  export default {
    data() {
      return {

      };
    },
    methods: {
        collapseGadget(){
            var gadgetShow = this.$store.state.gadgetShow;
            gadgetShow = !gadgetShow;
            this.$store.commit('collapseGadget', gadgetShow);
        }
    },
    components: {
        'breadcrumb': breadcrumb
    },    
  }
</script>

<style lang="less">

  .page-header{
    display: flex;
    justify-content: space-between;
    background: #fff;
    //border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
    height: 34px;
    margin: 0 -20px;
    padding-left:20px;
    height: 60px;
    .configuration{
        height:60px;
        line-height: 60px;
        width:60px;
        text-align: center;
        transition: all 0.3s ease-in-out;
        i{
            font: normal normal normal 18px/1 FontAwesome !important
        }
        &:hover,
        &:focus{
            background: #425375;
            color: #fff;
            cursor: pointer;
        }
    }
  }

</style>