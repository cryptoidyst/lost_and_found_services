<template>
        <common-template>
          <div slot="content"  class="p-4 overflow-auto" style="min-height: 80vh;">
            <div class="fw-bold m-0 p-0 text-secondary mb-2" style="font-size: 20px;">Claim / Found Items</div>
            <div v-if="items.length <= 0" class="border rounded p-4 text-center" style="margin-top: 30px;">
              <div class="text-secondary">No data found.</div>
            </div>
            <div v-loading="loading" style="margin-top: 30px;">
              <div class="d-flex border rounded justify-content-between align-items-center mb-4 p-4" style="width: 100%;" v-for="(item, idx) in items" :key="idx">
                  <img v-if="item.report.reportImages[0]" :src="'${process.env.LOST_AND_FOUND_SERVICE_URL}/images/' + item.report.reportImages[0].image" class="d-flex justify-content-center align-items-center" style="height: 130px; max-width:130px">
                  </img>
                  <el-image v-else class="d-flex justify-content-center align-items-center" style="background-color: lightgrey; height: 130px; width:130px">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                  </el-image>
                  <div class="ms-4">
                    <p class="text-secondary m-0 p-0">{{ item.report.report_date || "-" | formatDate }}</p>
                    <p class="fw-bold m-0 p-0" @click="clickedItem(item.report.id)">{{ item.report.item_name }}</p>
                    <p class="text-secondary m-0 p-0" style="min-width: 200px;" @click="clickedItem(item.report.id)">{{ item.report.item_description }}</p>
                    <el-tag v-if="item.report.status == 'claimed'" class="mt-2" type="success" size="small">claimed</el-tag>
                    <el-tag v-else class="mt-2" type="warning" size="small">verifying</el-tag>
                  </div>
                  <div class="ms-4">
                  </div>
              </div>
            </div>
          </div>
        </common-template>
  </template>

  <script>
  import Footer from "@/components/Footer.vue";
  import CommonHeader from '../../components/CommonHeader.vue'
  import CommonTemplate from '../../components/CommonTemplate.vue'
  import moment from "moment";

  export default {
    component: {
      Footer,
      CommonHeader,
      CommonTemplate
    },
    data() {
      return {
        items: [],
        loading: true
      };
    },
    filters: {
      formatDate(value) {
          if (!value) return '';
          const date = new Date(value);
          const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
          return date.toLocaleDateString(undefined, options);
        }
    },
    created() {
      this.getReports()
    },
    methods: {
      async clickedItem(itemId) {
        this.$router.push(`/claim/${itemId}`);
      },
      async getReports(){
        this.loading = true
        try{
          const response = await this.$axios.get(
            `${process.env.LOST_AND_FOUND_SERVICE_URL}/api/claims?claimer_id=${this.$cookies.get('user').id}`
          );

          this.items = response.data
        }catch(err){

        }finally{
          this.loading = false
        }
      }
    },
  };
  </script>
