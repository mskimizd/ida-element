<template>
    <div class="login-wrapper" >
      <div class="login-block" >
          <div class="logo" >
            <h1>
              <span class="logo-p1">ETL</span><span class="logo-p2">Online</span>
            </h1>
          </div>
          <el-form ref="form" status-icon :model="form" :rules="rules" >
            <el-form-item label="账户名" prop="username" >
              <el-input v-model="form.username" suffix-icon="el-icon-fa-user" auto-complete="off" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password" auto-complete="off" suffix-icon="el-icon-fa-credit-card" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="form.checkPass" auto-complete="off" suffix-icon="el-icon-fa-credit-card" placeholder="确认密码"></el-input>
            </el-form-item>               
            <el-form-item>
              <el-button type="primary" style="width:100%;" @click="createAccount('form')">创建账户</el-button>
            </el-form-item>
            <div class="create-account">
              <span>已有账户？</span> 
              <span class="create-btn">
                <router-link to="/login"> 登录 </router-link> 
              </span>
            </div>                                             
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
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };      
      return {
        form: {
          username: '',
          password: '',
          checkPass:''
        },
        rules: {
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          checkPass: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ]
        }      
      };
    }, 
    methods: {
      createAccount(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            let reqData = {
              username:this.form.username,
              password:$.md5(this.form.password),
              checkPass:$.md5(this.form.checkPass)
            }
            console.log(reqData);
            // this.$http.post(vConfig.backend_path+'/login',reqData
            // ).then(response => {
            //     response.json().then(res=>{
            //         if(res.rntCode == 200){
            //             vCookie.setCookie("username",this.form.username,7);
            //             vCookie.setCookie("token",res.data.token,7);
            //             // this.$router.push('/main/casebatch');
            //             $('.el-form').fadeOut(500);
            //             $('.login-block').addClass('form-success');
            //             let that = this;
            //             setTimeout(function(){
            //                 that.$router.push('/main/casebatch');
            //             },1200)
            //         }else{
            //             console.log('error server!!');
            //         }
            //     })                
            // }, response => {
            //     console.log('error post!!');
            // });
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
      padding-top: 300px;
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

    
</style>