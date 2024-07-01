<template>
  <div class="main-container">
    <div class="logo-container">
      <img src="../assets/images/logo.jpeg" alt="" style="width: 80px" />
    </div>

    <p class="report-title">LOST ITEM</p>
    <div class="d-flex justify-content-center">
      <div class="item-photo-container">
        <img
          src="../assets/images/pen.jpg"
          alt=""
          class="w-100 h-100"
          style="object-fit: cover; border-radius: 15px"
        />
      </div>
    </div>
    <p class="text-center" style="color: grey">Add Photos</p>

    <p class="lost-item">Lost Item:</p>
    <el-form :model="reportForm" label-position="top" size="small">
      <el-form-item
        label="Category"
        :rules="[{ required: true, message: 'Full Name is required' }]"
      >
        <el-input placeholder="Please input"> </el-input>
      </el-form-item>

      <el-form-item
        label="Location"

        :rules="[{ required: true, message: 'Full Name is required' }]"
      >
        <el-input placeholder="Please input"></el-input>
      </el-form-item>

      <el-form-item
        label="Date"
        :rules="[{ required: true, message: 'Full Name is required' }]"
      >
        <el-date-picker type="date" placeholder="Pick a day" class="w-100"> </el-date-picker>
      </el-form-item>

      <el-form-item
        label="Time"
        :rules="[{ required: true, message: 'Full Name is required' }]"
      >
        <el-time-picker
          placeholder="Arbitrary time"
          class="w-100"
        >
        </el-time-picker>
      </el-form-item>

      <el-form-item
        label="Add description"
        :rules="[{ required: true, message: 'Full Name is required' }]"
      >
        <el-input type="textarea" :rows="2" placeholder="Please input">
        </el-input>
      </el-form-item>
    </el-form>

    <p></p>

    <div class="w-100 d-flex justify-content-center mt-4">
      <el-button
        type="primary"
        @click="onSubmit('reportForm')"
        class="submit-button"
      >
        SUBMIT
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
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

.report-title {
  font-weight: bold;
  text-align: center;
  font-size: 25px;
}
.item-photo-container {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  border-radius: 15px;
}

.lost-item {
  font-weight: bold;
  font-size: 20px;
}

.submit-button {
  color: white;
  background-color: black;
  border: none;
  border-radius: 15px;
  padding: 20px 50px;
}
</style>
