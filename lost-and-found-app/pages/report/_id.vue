<template>
    <common-template>
        <div slot="content" class="p-4 overflow-auto">
            <div class="d-flex align-items-center justify-content-between">
                <div class="fw-bold m-0 p-0 text-secondary" style="font-size: 20px;">Reported Lost Item Details</div>
                <div>
                    <el-button type="default" icon="el-icon-arrow-left" @click="$router.go(-1)">Back</el-button>
                </div>
            </div>

            <div v-loading="loading">
                <div class="border rounded p-4 mb-4" style="background-color: #f95b2c;">
                    <div class="row">
                      <div class="col">
                        <div class="d-flex align-items-center">
                            <div><img style="width: 48px; height: 48px; border-radius: 50px;" :src="`${lostAndFoundServiceUrl}/images/${item.user.avatar_url}`" alt=""></div>
                            <div class="ms-2">
                                <h3 class="fw-bold m-0 p-0">{{ item.user.username }}</h3>
                            </div>
                        </div>
                        <!-- <div class="my-4">
                            <div class="d-flex text-white align-items-center" >
                                <i class="el-icon-message" ></i>
                                <p class="m-0 p-0 ms-2" >{{ item.user.email }}</p></div>
                            <div class="d-flex text-white align-items-center" >
                                <i class="el-icon-phone" ></i>
                                <p class="m-0 p-0 ms-2" >{{ item.user.phone_number || "-" }}</p></div>
                            <div class="d-flex text-white align-items-center" >
                                <i class="el-icon-location" ></i>
                                <p class="m-0 p-0 ms-2" >{{ item.user.location || "-" }}</p></div>
                        </div> -->
                        <el-button
                            type="primary"
                            class="btn btn-dark mt-4"
                            @click="$router.push(`/contact/${$cookies.get('user').id}?contact_user_id=${item.user_id}`)"
                        >
                            Contact Reporter
                        </el-button>
                      </div>
                      <!-- <div class="col-4">
                        <img src="../../assets/images/profile.jpeg" alt="" class="w-100">
                      </div> -->
                    </div>
                </div>
                <div class="text-center mb-2 rounded">
                    <img class="border rounded w-100" style="height: 200px; widows: auto; object-fit: contain;" v-if="item && item.report_images && item.report_images[0]" :src="`${lostAndFoundServiceUrl}/images/` + item.report_images[0].image" />
                    <el-image v-else class="border rounded d-flex align-items-center justify-content-center" style="min-height: 200px;">
                  `  <div slot="error" class="image-slot item-image">
                        <i class="el-icon-picture-outline" style="font-size: 40px;"></i>
                    </div>`
                    </el-image>
                </div>
                <div @click="edit = !edit" v-if="item.user_id == $cookies.get('user').id" class="fw-bold m-0 p-0 text-secondary mb-4 d-flex justify-content-end" style="font-size: 30px; width:100%;">
                    <i class="el-icon-edit" style="font-size: 20px;"></i>
                </div>
                <el-tag class="mt-2" type="success" v-if="item.status == 'claimed'">
                    Claimed
                </el-tag>
                <el-form :model="item" ref="item" class="vh-100">
                    <el-form-item label="Lost Item">
                        <el-input placeholder="Lost Item" v-model="item.item_name" :disabled="!edit" >
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="Category">
                        <el-input placeholder="Category" v-model="item.category" :disabled="!edit" >
                            <i slot="prefix" class="el-input__icon el-icon-menu"></i>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="Location">
                        <el-input placeholder="Location" v-model="item.location" :disabled="!edit" >
                            <i slot="prefix" class="el-input__icon el-icon-location"></i>
                        </el-input>
                    </el-form-item>

                    <div class="d-flex row" >
                    <el-form-item
                        label="Date"
                        class="col-sm-6"
                        :rules="[{ message: 'Date is required' }]"
                    >
                        <el-date-picker
                        type="datetime"
                        placeholder="Datetime"
                        class="w-100"

                        v-model="item.report_date"
                        :disabled="!edit"
                        >
                        </el-date-picker>
                    </el-form-item>
                    </div>
                    <el-form-item
                        label="Description"
                        :rules="[{ message: 'Description is required' }]"
                    >
                    <el-input
                        type="textarea"

                        :autosize="{ minRows: 2, maxRows: 4 }"
                        placeholder="Description"
                        v-model="item.item_description"
                        :disabled="!edit"
                    >
                    </el-input>
                    </el-form-item>
                    <el-button
                        v-if="item.user_id != $cookies.get('user').id && item.status != 'claimed'"
                        style="width: 100%;"
                        class="w-100 btn btn-dark"
                        @click="claimItem()"
                    >
                        Claim
                    </el-button>
                    <el-button
                        v-if="item.user_id == $cookies.get('user').id && item.status != 'claimed'"
                        style="width: 100%;"
                        type="primary"
                        class="w-100 btn btn-dark"
                        :disabled="!edit"
                        @click="updateItem()"
                    >
                        Update
                    </el-button>
                </el-form>
            </div>
        </div>
    </common-template>
  </template>

  <script>
  import Footer from "@/components/Footer.vue";
  import CommonHeader from '../../components/CommonHeader.vue';
  import CommonTemplate from '../../components/CommonTemplate.vue';

  export default {
    data() {
      return {
        item: {
            report_images : [],
            user:{}
        },
        images: [],
        edit: false,
        loading: true,
        lostAndFoundServiceUrl: process.env.LOST_AND_FOUND_SERVICE_URL,
      };
    },
    component: {
      Footer,
      CommonHeader,
      CommonTemplate
    },
    created() {
        this.getReportItem()
        // this.getReportItemImages()
    },
    methods: {
        async getReportItem(){
            this.loading = true
            const response = await this.$axios.get(
                `${process.env.LOST_AND_FOUND_SERVICE_URL}/api/report/${this.$route.params.id}`
            );

            this.item = response.data;
            this.loading = false
        },
        async claimItem(){
            try{
                const response = await this.$axios.post(`${process.env.LOST_AND_FOUND_SERVICE_URL}/api/claim`, {
                    claimer_id : this.$cookies.get('user').id,
                    report_id : this.item.id,
                    status: "pending",
                    claimed_date: ''
                })

                window.location.href = "/search"
            }catch(err){
                this.$notify.error({
                    title: "Error",
                    message: err.response.data,
                });
            }
        },
        async updateItem(formName) {

            try {
              const payload = {
                ...this.item,
              };

              delete payload.report_images
              delete payload.user

              const response = await this.$axios.put(
                `${process.env.LOST_AND_FOUND_SERVICE_URL}/api/report/${this.$route.params.id}`,
                payload
              );

              this.$notify.success({
                title: "Successfully updated",
                message: "Report sucessfully updated",
              });

              window.location.reload()
            } catch (error) {
              this.$notify.error({
                title: "Error",
                message: error.response?.data,
              });
            }


      },
    }
  };
  </script>

  <style>
  @import "../../assets/styles/custom-style.css";
  </style>
