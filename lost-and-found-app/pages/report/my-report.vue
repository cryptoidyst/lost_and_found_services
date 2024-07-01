<template>
    <common-template>
        <div slot="content" class="p-4" style="min-height: 80vh;">
          <div class="fw-bold m-0 p-0 text-secondary mb-2" style="font-size: 20px; ">Reports that I've Submitted</div>
            <div v-if="items.length <= 0" class="border rounded p-4 text-center" style="margin-top: 30px;">
                <div class="text-secondary">No data found.</div>
            </div>
            <div v-loading="loading" style="margin-top: 30px;">
              <div class="d-flex border rounded justify-content-between align-items-center mb-4 p-4" style="width: 100%;" v-for="(item, idx) in items" :key="idx">
                  <el-image v-if="item.report_images[0]" :src="`${lostAndFoundServiceUrl}/images/` + item.report_images[0].image" class="d-flex justify-content-center align-items-center" style=" height: 130px; width:130px">
                  </el-image>
                  <el-image v-else class="d-flex justify-content-center align-items-center" style="background-color: lightgrey; height: 130px; width:130px">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                  </el-image>
                  <div class="ms-4">
                    <p class="text-secondary m-0 p-0">{{ item.report_date || "-" | formatDate }}</p>
                    <p class="fw-bold m-0 p-0" @click="clickedItem(item.id)">{{ item.item_name }}</p>
                    <p class="text-secondary m-0 p-0" @click="clickedItem(item.id)">{{ item.item_description }}</p>
                    <el-tag v-if="item.status != 'claimed'" class="mt-2" type="warning" size="small">Pending Reporter Action</el-tag>
                    <el-tag v-else class="mt-2" type="success" size="small">Claimed</el-tag>
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
  import moment from "moment";
import { provide } from "vue";

  export default {
    component: {
      Footer,
      CommonHeader
    },
    data() {
      return {
        items: [],
        loading: true,
        lostAndFoundServiceUrl: process.env.LOST_AND_FOUND_SERVICE_URL
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
            `${process.env.LOST_AND_FOUND_SERVICE_URL}/api/reports?user_id=${this.$cookies.get('user').id}`
          );

          this.items = response.data.data
        }catch(err){

        }finally{
          this.loading = false
        }
      }
    },
  };
  </script>

  <style>

  .home-item-image-container {
    border: 2px solid black;
    border-radius: 15px;
    padding: 0;
    box-shadow: 1px 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f2f2f2;
  }

  .home-item-container {
    display: flex;
    margin: 20px 0;
  }

  i {
    margin-right: 5px;
    display: flex;
    align-items: center;
  }

  .item-post-date {
    color: grey;
    font-size: 12px;
    margin-bottom: 0;
  }
  </style>
