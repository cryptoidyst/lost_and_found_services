<template>
  <div>
    <common-header></common-header>
    <div style="">
      <div class="page-title">Report</div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 p-4">
        <el-form :model="reportItemForm" ref="reportItemForm" style="height: 95vh;">
          <div class="d-flex justify-content-center">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>

          <el-form-item
            class="mt-4"
            :rules="[{ required: true, message: 'Item Name is required' }]"
          >
            <el-input placeholder="Lost Item" v-model="reportItemForm.item_name">
            </el-input>
          </el-form-item>

          <el-form-item
            :rules="[{ required: true, message: 'Category is required' }]"
          >
            <el-input placeholder="Category" v-model="reportItemForm.category">
            </el-input>
          </el-form-item>

          <el-form-item
            :rules="[{ required: true, message: 'Location is required' }]"
          >
            <el-input placeholder="Location" v-model="reportItemForm.location">
            </el-input>
          </el-form-item>

          <div class="d-flex row">
            <el-form-item
              class="col-sm-6"
              :rules="[{ required: true, message: 'Date is required' }]"
            >
              <el-date-picker
                type="date"
                placeholder="Date"
                class="w-100"
                v-model="reportItemForm.report_date"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              class="col-sm-6"
              :rules="[{ required: true, message: 'Time is required' }]"
            >
              <el-time-picker
                placeholder="Time"
                class="w-100"
                v-model="reportItemForm.report_time"
              ></el-time-picker>
            </el-form-item>
          </div>
          <el-form-item
            :rules="[{ required: true, message: 'Description is required' }]"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="Description"
              v-model="reportItemForm.item_description"
            >
            </el-input>
          </el-form-item>

          <el-form-item class="w-100 d-flex justify-content-center mt-4">
            <el-button
              type="primary"
              @click="onSubmit('reportItemForm')"
              class="w-100"
            >
              Submit
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import CommonHeader from "../components/CommonHeader.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    CommonHeader
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      reportItemForm: {
        item_name: "",
        item_description: "",
        report_date: "",
        report_time: "",
        status: "",
        category: "",
        location: "",
      },
      submitButtonLoading: false,
    };
  },
  component: {
    Footer,
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async onSubmit(formName) {
      this.submitButtonLoading = true
      await this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.submitButtonLoading = true;
          try {
            const payload = {
              ...this.reportItemForm,
              user_id: "1", // todo
            };
            const { status, data } = await this.$axios.post(
              `${process.env.LOST_AND_FOUND_SERVICE_URL}/api/report`,
              payload
            );
            this.$notify.success({
              title: "Success",
              message: "Reported sucessfully",
            });
            this.$router.push(`/missing-item/${data.id}`);
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
      this.submitButtonLoading = false
    },
  },
};
</script>

<style>
@import "../assets/styles/custom-style.css";
</style>
