<template>
  <div class="row justify-content-center">
    <div class="col-md-6 p-4">
      <div class="text-center">
        <img src="../assets/images/logo.jpeg" style="width:128px" alt="" />
      </div>
      <h1 class="fw-bold text-center mt-4">Login</h1>
      <el-form :model="loginForm" ref="loginForm" style="width: 100%;">
        <el-form-item
          prop="username"
          :rules="[
            {
              required: true,
              message: 'Please input username',
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            placeholder="Email"
            prefix-icon="el-icon-message"
            v-model="loginForm.username"
            autocomplete="off"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          prop="password"
          :rules="[{ required: true, message: 'Password is required' }]"
        >
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            placeholder="Password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <el-button
          class="w-100 btn btn-dark"
          v-loading="loading"
          @click="loginUser('loginForm')"
        >
          Sign in
        </el-button>
        <div class="mt-2 d-flex justify-content-center align-items-center">
          <p class="m-0 p-0 text-secondary"> You are new ? </p>
          <el-link class="m-0 ps-2" type="primary" href="/register" style="color:#ee9278">create new</el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loading: false,
    };
  },
  computed: {
  },
  methods: {
    async loginUser(formName) {
      await this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true

            const response = await this.$axios.post(`${process.env.LOST_AND_FOUND_SERVICE_URL}/api/login`, this.loginForm)


            this.$notify.success({
              title: "Success",
              message: "Login sucessfully",
            });

            this.$cookies.set("token", response.data.token)
            this.$cookies.set("user", response.data.user)

            window.location.href = "home"
          } catch (error) {
            console.log(error)
            this.$notify.error({
              title: "Error",
              message: error,
            });

          }finally{
            this.loading = false
          }
        } else {
          return false;
        }
      });
    }
  },

};
</script>

<style>
@import "../assets/styles/custom-style.css";

.login-logo-container {
  display: flex;
  justify-content: center;
}

.login-logo {
  width: 300px;
  object-fit: cover;
  height: 300px;
}

</style>
