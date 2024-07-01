<template>
    <common-template>
        <div slot="content" class="p-4 overflow-auto">
            <div class="d-flex align-items-center justify-content-between">
                <div class="fw-bold m-0 p-0 text-secondary mb-2" style="font-size: 30px; width:50%;">Reported Lost Item Details</div>
                <div>
                    <el-button type="default" icon="el-icon-arrow-left" @click="$router.go(-1)">Back</el-button>
                </div>
            </div>

            <div v-loading="loading" style="margin-bottom: 20px;">
                <div class="text-center mb-2 rounded">
                    <img class="border rounded w-100" style="height: 200px; widows: auto; object-fit: contain;" v-if="item && item.report_images[0]" :src="`${lostAndFoundServiceUrl}/images/` + item.report_images[0].image" />
                    <el-image v-else class="border rounded d-flex align-items-center justify-content-center" style="min-height: 200px;">
                    <div slot="error" class="image-slot item-image">
                        <i class="el-icon-picture-outline" style="font-size: 40px;"></i>
                    </div>`
                    </el-image>
                </div>
                <el-form :model="item" ref="item" class="vh-100">
                    <el-form-item label="Lost Item" readonly>
                        <el-input placeholder="Lost Item" v-model="item.item_name" readonly :disabled="!edit" >
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="Category">
                        <el-input placeholder="Category" v-model="item.category" readonly :disabled="!edit" >
                            <i slot="prefix" class="el-input__icon el-icon-menu"></i>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="Location">
                        <el-input placeholder="Location" v-model="item.location" readonly :disabled="!edit" >
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
                        placeholder="Date"
                        class="w-100"
                        readonly
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
                        readonly
                        :autosize="{ minRows: 2, maxRows: 4 }"
                        placeholder="Description"
                        v-model="item.item_description"
                        :disabled="!edit"
                    >
                    </el-input>
                    </el-form-item>
                    <el-button
                        v-if="item.user_id == $cookies.get('user').id && item.status != 'claimed'"
                        :disabled="true"
                        style="width: 100%;"
                        type="primary"
                        class="w-100"
                        @click="returnItem()">
                        Returned
                    </el-button>
                </el-form>
            </div>

            <div v-for="(claimer, clairmerIdx) in claimers" :key="claimerIdx">
                <div class="border rounded d-flex justify-content-between p-4 align-items-center mb-2">
                    <div class="d-flex align-items-center">
                        <div class="me-2"><img style="width: 28px; height: 28px; border-radius: 50px;" :src="`${lostAndFoundServiceUrl}/images/${claimer.user.avatar_url}`" alt=""></div>
                        <div class="fw-bold">{{ claimer.user.full_name }}</div>
                    </div>
                    <div>
                        <el-button
                            v-if="item.user_id == $cookies.get('user').id"
                            style="width: 100%;"
                            type="primary"
                            class="w-100"
                            @click="returnItem(claimer.claimer_id )">
                            Return
                        </el-button>
                    </div>
                </div>
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
            report_images : []
        },
        claimers: [],
        images: [],
        edit: false,
        loading: true,
        lostAndFoundServiceUrl: process.env.LOST_AND_FOUND_SERVICE_URL
      };
    },
    component: {
      Footer,
      CommonHeader,
      CommonTemplate
    },
    created() {
        this.getReportItem()
        this.getClaimers()
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
        async returnItem(userId){
            try{
                const response = await this.$axios.put(`${process.env.LOST_AND_FOUND_SERVICE_URL}/api/claim/${this.$cookies.get('user').id}`, {
                    claimer_id : userId,
                    report_id : this.item.id,
                    status: "claimed",
                    claimed_date: ''
                })

                this.$notify.success({
                    title: "Success",
                    message: "Successfully returned",
                });

                window.location.href = 'my-report'
            }catch(err){
                this.$notify.error({
                    title: "Error",
                    message: err,
                });
            }
        },
        async getClaimers(){
            try{
                const response = await this.$axios.get(`${process.env.LOST_AND_FOUND_SERVICE_URL}/api/claims?report_id=${this.$route.params.id}`)
                this.claimers = response.data
            }catch(err){

            }
        }
    }
  };
  </script>

  <style>
  @import "../../assets/styles/custom-style.css";
  </style>
