<template>
    <div class="login-wrapper" >
        <!-- <ul class="bg-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul> -->
      <div class="login-block" >
          <div class="logo" >
            <h1>
              <span class="logo-p1">ETL</span><span class="logo-p2">Online</span>
            </h1>
          </div>
          <el-form ref="form" status-icon :model="form" :rules="rules">
            <el-form-item prop="username">
              <el-input v-model="form.username" suffix-icon="el-icon-fa-user" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="form.password" suffix-icon="el-icon-fa-credit-card" placeholder="密码"></el-input>
            </el-form-item>   
            <el-form-item>
              <el-button type="primary" style="width:100%;" @click="login('form')">登录</el-button>
            </el-form-item>
            <!-- <div class="create-account">
              <span>还没有账户？</span> 
              <span class="create-btn">
                <router-link to="/register"> 创建账户 </router-link> 
              </span>
            </div>                                  -->
          </el-form>
      </div>
    </div> 
</template>

<script>

  import jQuery from 'jquery'
  import '../assets/js/md5/jquery.md5.js'
  import vConfig from '../config.js'
  import vCookie from '../utils/vCookie.js'

  export default {
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }      
      };
    }, 
    methods: {
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            let reqData = {
              username:this.form.username,
              password:this.form.password
            }
            this.$http.post(vConfig.backend_path+'/login',reqData
            ).then(response => {
                response.json().then(res=>{
                    if(res.rntCode == 200){
                        vCookie.setCookie("username",this.form.username,7);
                        vCookie.setCookie("token",res.data.token,7);
                        // this.$router.push('/main/casebatch');
                        $('.el-form').fadeOut(500);
                        $('.login-block').addClass('form-success');
                        let that = this;
                        setTimeout(function(){
                            that.$router.push('/main/casebatch');
                        },1200)
                    }else{
                        console.log('error server!!');
                    }
                })                
            }, response => {
                console.log('error post!!');
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }    
    }   
  }
</script>

<style lang="less">
    .login-wrapper{
      padding-top: 100px;
      .login-block{
        width: 300px;
        margin: 0 auto;
        .logo{
          text-align: center;
          padding:20px;
          -webkit-transition-duration: 1s;
                  transition-duration: 1s;
          -webkit-transition-timing-function: ease-in-put;
                  transition-timing-function: ease-in-put;          
          .logo-p1{
            color:#409EFF;
          }
          .logo-p2{
            color: #afafaf;
          }
        }
      }
    }

    .login-block.form-success .logo{
        -webkit-transform: translateY(85px);
            -ms-transform: translateY(85px);
                transform: translateY(85px);
    }  
    
    .create-account{
      font-size: 14px;
      color: #5a5e66;
      text-align: center;
      padding-top: 20px;      
      .create-btn{
        a{
          color: #409eff;
          cursor: pointer;
          text-decoration: none;
          &:hover{
            color: #66b1ff;
          }
        }
      }
    }

    // .bg-bubbles {
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     width: 100%;
    //     height: 80%;
    //     z-index: 1;
    //     margin: 0;
    //     padding: 0;        
    // }
    // .bg-bubbles li {
    //     position: absolute;
    //     list-style: none;
    //     display: block;
    //     width: 40px;
    //     height: 40px;
    //     background-color: rgba(64, 158, 255, 0.15);
    //     bottom: -160px;
    //     -webkit-animation: square 25s infinite;
    //     animation: square 25s infinite;
    //     -webkit-transition-timing-function: linear;
    //     transition-timing-function: linear;
    // }
    // .bg-bubbles li:nth-child(1) {
    //     left: 10%;
    // }
    // .bg-bubbles li:nth-child(2) {
    //     left: 20%;
    //     width: 80px;
    //     height: 80px;
    //     -webkit-animation-delay: 2s;
    //             animation-delay: 2s;
    //     -webkit-animation-duration: 17s;
    //             animation-duration: 17s;
    // }
    // .bg-bubbles li:nth-child(3) {
    //     left: 25%;
    //     -webkit-animation-delay: 4s;
    //             animation-delay: 4s;
    // }
    // .bg-bubbles li:nth-child(4) {
    //     left: 40%;
    //     width: 60px;
    //     height: 60px;
    //     -webkit-animation-duration: 22s;
    //             animation-duration: 22s;
    //     background-color: rgba(255, 255, 255, 0.25);
    // }
    // .bg-bubbles li:nth-child(5) {
    //     left: 70%;
    // }
    // .bg-bubbles li:nth-child(6) {
    //     left: 80%;
    //     width: 120px;
    //     height: 120px;
    //     -webkit-animation-delay: 3s;
    //             animation-delay: 3s;
    //     background-color: rgba(255, 255, 255, 0.2);
    // }
    // .bg-bubbles li:nth-child(7) {
    //     left: 32%;
    //     width: 160px;
    //     height: 160px;
    //     -webkit-animation-delay: 7s;
    //             animation-delay: 7s;
    // }
    // .bg-bubbles li:nth-child(8) {
    //     left: 55%;
    //     width: 20px;
    //     height: 20px;
    //     -webkit-animation-delay: 15s;
    //             animation-delay: 15s;
    //     -webkit-animation-duration: 40s;
    //             animation-duration: 40s;
    // }
    // .bg-bubbles li:nth-child(9) {
    //     left: 25%;
    //     width: 10px;
    //     height: 10px;
    //     -webkit-animation-delay: 2s;
    //             animation-delay: 2s;
    //     -webkit-animation-duration: 40s;
    //             animation-duration: 40s;
    //     background-color: rgba(255, 255, 255, 0.3);
    // }
    // .bg-bubbles li:nth-child(10) {
    //     left: 90%;
    //     width: 160px;
    //     height: 160px;
    //     -webkit-animation-delay: 11s;
    //             animation-delay: 11s;
    // }
    // @-webkit-keyframes square {
    //     0% {
    //         -webkit-transform: translateY(0);
    //                 transform: translateY(0);
    //     }
    //     100% {
    //         -webkit-transform: translateY(-1700px) rotate(600deg);
    //                 transform: translateY(-1700px) rotate(600deg);
    //     }
    // }
    // @keyframes square {
    //     0% {
    //         -webkit-transform: translateY(0);
    //                 transform: translateY(0);
    //     }
    //     100% {
    //         -webkit-transform: translateY(-1700px) rotate(600deg);
    //                 transform: translateY(-1700px) rotate(600deg);
    //     }
    // }    
</style>