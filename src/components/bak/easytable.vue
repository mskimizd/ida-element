<template>
  <div>
    <div class="tmp_heading clearfix" ></div>
    <div class="easy-table" >

    </div>  
  </div>
</template>

<script>

  import moment from 'moment'
  import protocolFields from '../data/protocolFields.js';

  export default {
    data() {
      return {
        tableFields: [],
        tableData:[],
        showFixedHeader:false
      }
    },
    props: ["data","protocol"],
    computed: {
    }, 
    watch: {
      data(val){
        // 获取当前页所有相关字段
        let tmpTableFields = [];
        for(var [k,v] of val.entries()){
          for(var key in v){
            if(tmpTableFields.indexOf(key)==-1){
              tmpTableFields.push(key);
            }
          }
        }

        // 根据字段表的顺序存成字段数组
        this.tableFields = [];
        let fieldsSorted = protocolFields[this.protocol];
        for(var [k,v] of fieldsSorted.entries()){
          if(tmpTableFields.indexOf(v.value)!=-1){
            this.tableFields.push(v.value);
          }
        }

        this.tableData = val;
        this.buildTable();
        this.buildHeader();
      }
    },       
    mounted() {

    },
    methods: {
      buildHeader(){
          $('.tmp_heading').empty();
          var fixedTableHeader = $(".table_head").clone();
          $(".table_head").children().each(function(index, element) {
            if( !$(element).hasClass('hidden') ){
                $(fixedTableHeader.children()[index]).children("div").css({'width':parseInt($(element).children("div").outerWidth()) - 8});
            }
          });

          var sourceTable = $(".top_fix_table");
          var sourceTableHead = $(".table_head");
          var headHeight = sourceTableHead.height();
          var sourceTableWidth = sourceTable.outerWidth(); 

          $('.tmp_heading').html('<div id="shelter"><table id="fixed_table" class="fixed-header" ><thead></thead></table></div>');
          $("#shelter").css({'height':headHeight,'position':'relative','top':'0','left':'0'});
          $("#fixed_table").css({'width':sourceTableWidth+"px"});
          var targetHead = fixedTableHeader.attr('id','fix_head');
          targetHead.appendTo('#fixed_table thead');
          if(this.showFixedHeader){
            $('.tmp_heading').show();
          }else{
            $('.tmp_heading').hide();
          }
      },
      buildTable() {
        $('.easy-table').empty();
        var html_thead_th = "";
        for(var [k,v] of this.tableFields.entries()){
          html_thead_th = html_thead_th + "<th><div >" + v + "</div></th>" ;
        }

        var html_thead_trs = "";
        for(var [k1,v1] of this.tableData.entries()){
          var html_tbody_td = "";
          for(var [k2,v2] of this.tableFields.entries()){
            var rowv = v1[v2];
            if(typeof rowv == 'undefined'){
              rowv = "";
            }
            html_tbody_td = html_tbody_td  + "<td><div >" + rowv + "</div></td>";
          }
          html_thead_trs = html_thead_trs + "<tr>"+ html_tbody_td +"</tr>";
        }

        var html_table = "<table class='table table-stripe' >" +
                            "<thead><tr class='table_head' >" + html_thead_th + "</tr></thead>"+
                            "<tbody>"+html_thead_trs+"</tbody>"
                          "</table>";
        $('.easy-table').html(html_table);       
        
        $('.el-main').unbind("scroll");
        var that = this;
        $('.el-main').scroll(function(){

          var sl=-Math.max($('.el-main').scrollLeft(),$('.el-main').scrollLeft());
          if(isNaN(sl)){
              sl = - $('.el-main').scrollLeft();
          }

          $('#shelter').css("left",sl+'px');
          var scroll_top = $('.el-main').scrollTop();
          var offsetHeight = $(".el-form")[0].offsetHeight;

          if (scroll_top > (offsetHeight + 20) ) {
              $(".tmp_heading").show();
              that.showFixedHeader = true;
          }else {
              $('.tmp_heading').hide();
              that.showFixedHeader = false;
          } 


        });
      }
    }
  }

</script>


<style lang="less">
    .easy-table{
      font-size:12px;
      margin-top:20px;
      .table_head{
        text-align: left;
        // background: #fafafa;
        // background: -webkit-linear-gradient(top, #eee, #ccc) !important;
        th {
           border-bottom: 1px solid #e6ebf5;
          > div{
            padding: 3px 4px;
          }
        }
      }
      td, th {
          border-right: 1px solid #e6ebf5;
          white-space: nowrap;
          > div{
            padding: 3px 4px;
          }          
      }
      tr{
        &:nth-child(odd){
          background: #f3f3f3;
        }
      }      
    }

    .tmp_heading{
      position:fixed;
      top:60px;
      font-size:12px;
      background:#fff;
      // table-layout:fixed;
      text-align: left;
      tr{
        background: #f3f3f3;
        // background: #fafafa;
        // background: -webkit-linear-gradient(top, #eee, #ccc);
      }
      th {
        border-right: 1px solid #e6ebf5;
        border-bottom: 1px solid #e6ebf5;
        white-space: nowrap;        
        > div{
          padding: 3px 4px;
          width:100%;
        }
      }      
    }

</style>