<template>
  <div class="row justify-content-center">
  <div class="col-md-6 p-6">
    <div class="text-center">
      <img
        src="~/static/register.png"
        alt=""
        width="50%"
        class="text-center"
      />
    </div>
    <div class="p-4">
      <div class="d-inline-flex">

        <h1>Register</h1>
        <div class="logo-container">
          <!-- <img src="../assets/images/logo.jpeg" alt="" style="width: 80px;" class="pe-4"> -->
        </div>
      </div>
      <p class="text-justify">
        You have chance to create new account if you really want to
      </p>

      <el-form :model="registerForm" ref="registerForm">
      <el-form-item
        label="Username"
        prop="username"
        :rules="[{ required: true, message: 'Username is required' }]"
      >
        <el-input placeholder="Username" prefix-icon="el-icon-user" v-model="registerForm.username">
        </el-input>
      </el-form-item>
      <el-form-item
        label="Full Name"
        prop="full_name"
        :rules="[{ required: true, message: 'Full Name is required' }]"
      >
        <el-input placeholder="Full Name" prefix-icon="el-icon-user-solid" v-model="registerForm.full_name">
        </el-input>
      </el-form-item>

      <el-form-item
        label="Email Address"
        prop="email"
        :rules="[
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input placeholder="Email Address" prefix-icon="el-icon-message" v-model="registerForm.email">
        </el-input>
      </el-form-item>
      <el-form-item
        label="Location"
        prop="address"
        :rules="[{ required: true, message: 'Location is required' }]"
      >
        <el-input placeholder="Location" prefix-icon="el-icon-location-outline" v-model="registerForm.address">
        </el-input>
      </el-form-item>

      <el-form-item
        label="Password"
        prop="password"
        :rules="[{ required: true, message: 'Password is required' }]"
      >
        <el-input
          v-model="registerForm.password"
          prefix-icon="el-icon-lock"
          placeholder="Password"
          type="password"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('registerForm')" class="btn btn-warning w-100">
          Sign Up
        </el-button>
      </el-form-item>
    </el-form>

    <p>
      Already have account? <span>
        <el-link type="primary" href="/login" style="color:#ee9278">Go Here</el-link></span>
    </p>
  </div>
</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: "",
        full_name: "",
        email: "",
        password: "",
        address: "",
      },
      submitButtonLoading: false,
    };
  },
  methods: {
    onSubmit(formName) {
      this.submitButtonLoading = true
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const response =  await this.$axios.post(`${process.env.LOST_AND_FOUND_SERVICE_URL}/api/user`, this.registerForm)

            this.$notify.success({
              title: "Success",
              message: "User created sucessfully",
            });
            
            window.location.href = "login"

        } catch (error) {
            this.$notify.error({
              title: "Error",
              message: error.response?.data,
            });
        }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
@import "../assets/styles/custom-style.css";

.form-input {
  border: 2px solid black;
  border-radius: 13px;
}

.logo-container {
  position: absolute;
  right: 0;
}
</style>
