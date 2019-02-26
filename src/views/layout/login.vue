<template>
    <div class="login-page">
      <bg></bg>
      <div class="login-wrapper" >
        <div class="login-block" >
            <el-card style="opacity: 0.9;">
              <div class="login-logo" >
                <div class="login-logo-t"  >
                  <img style="width: 48px; margin:0 12px 0 0" src="../../assets/image/logo.png" />
                  <span class="logo-p2">数据分析</span>
                </div>
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
              </el-form>
              <div style="color: #bbb;width: 240px;margin: 0 auto;padding: 10px;    text-align: center;">
                <span>测试账号：admin</span>
                <span>密码：admin</span>
              </div>
            </el-card>
        </div>
      </div>
      <!-- <div class="copyright">
      </div> -->
    </div> 
</template>

<script>

  import bg from '~/components/bg.vue'

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
            if(this.form.username=="admin"&&this.form.password=="admin"){
              this.$router.push('/main/dashboard');
            }else{
              this.$message({
                showClose: true,
                message: '用户名密码错误，请重新输入。',
                type: 'warning'
              }); 
              this.$refs[formName].resetFields();             
            }
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
    },
    components: {
      'bg': bg,
    },      
  }
</script>

<style lang="less">
    .login-page{
      width:100%;
      height:100%;
    }
    .login-wrapper{
      position:relative;
      margin:0 auto;
      width:380px;
      height:100%;
      .login-block{
        position:absolute;
        top:50%;
        width: 380px;
        height: 400px;
        margin-top:-200px;
        // margin: 0 auto;
        .login-logo{
          text-align: center;
          padding:20px;
          -webkit-transition-duration: 1s;
                  transition-duration: 1s;
          -webkit-transition-timing-function: ease-in-put;
                  transition-timing-function: ease-in-put;   
          .login-logo-t{
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 12px 0;
          }       
          .logo-p2{
            color: #666;
            font-size:2rem;
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