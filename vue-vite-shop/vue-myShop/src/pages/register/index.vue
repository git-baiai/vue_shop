<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="data.phone">
        <span class="error-msg" v-if="!data.phone">请输入手机号</span>
        <span class="error-msg" v-if="!/^1[3-9]\d{9}$/.test(data.phone) && data.phone">手机号格式错误</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="data.code">
        <button style="width:100px;height:38px" @click="getCode">获取验证码</button>
        <span class="error-msg" v-if="!/^\d{6}$/.test(data.code)">验证码是6个数字</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="data.password">
        <span class="error-msg" v-if="!/^\w{6,24}$/.test(data.password)">密码是6-24个字符</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="data.makesure">
        <span class="error-msg" v-if="!/^\w{6,24}$/.test(data.makesure)">确认密码为6-24个字符</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" :checked="data.agree">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg" v-if="!data.agree">请勾选同意用户协议</span>
      </div>
      <div class="btn">
        <button @click="overRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import store from '../../store'
import router from '../../router'
  export default {
    name: 'Register',
    setup() {
      let data = reactive({
        phone:'',
        code:'',
        password:'',
        makesure:'',
        agree:true
      })
      let getCode = async function () { 
        if(data.phone){
          try{
            await store.dispatch('getCode', data.phone)
            data.code = store.state.users.code
          }catch(error){
            alert(error.message)
          }
        }else{
          alert('请输入您的手机号')
        }
      }
      let overRegister = async function () { 
        const {phone,code,password,makesure,agree} = data
        if(phone&&code&&(password==makesure)&&agree){
          try{
            await store.dispatch('userRegister', { phone, code, password })
            router.push('/login')
          }catch(error){
            alert(error.message)
          }
        }else{
          alert('请检查注册信息')
        }
      }
      return{
        data, getCode, overRegister
      }
    }
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>