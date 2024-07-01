<template>
    <common-template>
      <div slot="content" class="p-4 overflow-auto">
        <div class="d-flex align-items-center justify-content-between mb-4">
          <div class="fw-bold m-0 p-0 text-secondary" style="font-size: 20px;">Report Lost Item</div>
          <div>
            <el-button type="default" icon="el-icon-arrow-left" @click="$router.go(-1)">Back</el-button>
          </div>
        </div>

        <el-form :model="reportItemForm" ref="reportItemForm">
          <div class="d-flex justify-content-center">
            <el-upload
              ref="upload"
              action="#"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :before-upload="handleBeforeUpload"
              :multiple="false"
              :limit="1"
              >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <el-form-item
            label="Lost Item"
            class="mt-4"
            :rules="[{ required: true, message: 'Item Name is required' }]"
          >
            <el-input placeholder="Lost Item" v-model="reportItemForm.item_name">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item
            label="Category"
            :rules="[{ required: true, message: 'Category is required' }]"
          >
            <el-select
              v-model="reportItemForm.category"
              filterable
              placeholder="Select a category"
              class="w-100"
            >
              <el-option
                v-for="category in categories"
                :key="category"
                :label="category"
                :value="category"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="Location"
            :rules="[{ required: true, message: 'Location is required' }]"
          >
            <el-input placeholder="Location" v-model="reportItemForm.location">
              <i slot="prefix" class="el-input__icon el-icon-location"></i>
            </el-input>
          </el-form-item>
          <div class="d-flex row">
            <el-form-item
              label="Date"
              class="col-sm-6"
              :rules="[{ required: true, message: 'Date is required' }]"
            >
              <el-date-picker
                type="datetime"
                placeholder="Datetime"
                class="w-100"
                v-model="reportItemForm.report_date"
              >
                <i slot="prefix" class="el-input__icon el-icon-date"></i>
              </el-date-picker>
            </el-form-item>
          </div>
          <el-form-item
            label="Description"
            :rules="[{ required: true, message: 'Description is required' }]"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="Description"
              v-model="reportItemForm.item_description"
            >
              <i slot="prefix" class="el-input__icon el-icon-document"></i>
            </el-input>
          </el-form-item>
          <el-button
              @click="insertReport()"
              class="w-100 btn btn-dark"
            >
              Submit
          </el-button>
        </el-form>
      </div>
    </common-template>
  </template>

  <script>
  import CommonHeader from "../../components/CommonHeader.vue";
  import Footer from "@/components/Footer.vue";
  import CommonTemplate from "~/components/CommonTemplate.vue";

  export default {
    components: {
      CommonHeader,
      CommonTemplate
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        reportItemForm: {
          // item_name: "",
          // item_description: "",
          // report_date: "",
          // report_time: "",
          // status: "",
          // category: "",
          // location: "",
        },
        submitButtonLoading: false,
        uploadedFiles:[],
        categories: [
          'Personal Items',
          'Electronics',
          'Clothing',
          'Accessories',
          'Documents',
          'Sporting Goods',
          "Children's Items",
          'Others'
        ]

      };
    },
    component: {
      Footer,
    },
    methods: {
      handleRemove(file, fileList) {
        console.log("file list", fileList);
        this.uploadedFiles = fileList;
      },
      handlePictureCardPreview(file) {
        console.log("preview file", file)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleBeforeUpload(file) {
        console.log("file", file)
        this.uploadedFiles.push(file);
        // return false; // prevent auto upload by el-upload
      },
      // async onSubmit(formName) {
      //   this.submitButtonLoading = true
      //   await this.$refs[formName].validate(async (valid) => {
          // console.log('vvv', valid)
      //     if (valid) {

      //       this.loading = true;
      //       try {
      //         const payload = {
      //           ...this.reportItemForm,
      //           user_id: "1", // todo
      //         };
      //         const { status, data } = await this.$axios.post(
      //           `${process.env.LOST_AND_FOUND_SERVICE_URL}/api/report`,
      //           payload
      //         );

      //         this.$notify.success({
      //           title: "Success",
      //           message: "Reported sucessfully",
      //         });

      //         // this.$router.push(`/missing-item/${data.id}`);
      //       } catch (error) {
      //         this.$notify.error({
      //           title: "Error",
      //           message: error.response?.data,
      //         });
      //       }

      //     } else {
      //       console.log("error submit!!");
      //       return false;
      //     }
      //   });
      //   this.submitButtonLoading = false
      // },
      async insertReport(){
        try{
            const formData = new FormData();
            formData.append("item_name", this.reportItemForm.item_name);
            formData.append("item_description", this.reportItemForm.item_description);
            formData.append("report_date", this.reportItemForm.report_date);
            formData.append("report_time", this.reportItemForm.report_time);
            formData.append("status", "unclaim");
            formData.append("category", this.reportItemForm.category);
            formData.append("location", this.reportItemForm.location);
            formData.append("user_id", this.$cookies.get('user').id); // todo: replace with actual user ID

            this.uploadedFiles.forEach((file, index) => {
              console.log("asdasd", file)
              formData.append(`files[]`, file);
            });

            const response = await this.$axios.post(
              `${process.env.LOST_AND_FOUND_SERVICE_URL}/api/report`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
            );

            this.$notify.success({
              title: "Success",
              message: "Reported sucessfully",
            });

            this.$router.push('/search')

        }catch(err){
          console.log(err)
          this.$notify.error({
            title: "Error",
            message: err,
          });
        }
      }
    },
  };
  </script>
