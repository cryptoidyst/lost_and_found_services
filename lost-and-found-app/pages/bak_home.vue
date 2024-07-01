<template>
  <div>
    <common-header></common-header>
    <div class="row justify-content-center p-4">
      <div class="col-md-6" v-loading="loading">
        <div class="d-flex justify-content-center mb-4" style="width: 80%;" v-for="(item, idx) in items" :key="idx">
            <el-image class="d-flex justify-content-center align-items-center" style="background-color: lightgrey; height: 130px; width:130px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
            <div class="align-self-end ms-4">
              <p class="item-post-date">{{ item.report_date }}</p>
              <p @click="clickedItem(item.id)">{{ item.item_name }}</p>
              <div>
                <i class="el-icon-chat-line-round"></i> Comment
                <i class="el-icon-star-off"></i> Like
              </div>
            </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import CommonHeader from '../components/CommonHeader.vue'
import moment from "moment";

export default {
  component: {
    Footer,
    CommonHeader
  },
  data() {
    return {
      items: [],
      loading: true
    };
  },
  created() {
    this.getReports()
  },
  methods: {
    async clickedItem(itemId) {
      this.$router.push(`/report/${itemId}`);
    },
    async getReports(){
      this.loading = true
      try{
        const response = await this.$axios.get(
          `${process.env.LOST_AND_FOUND_SERVICE_URL}/api/reports`
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

<style>
@import "../assets/styles/custom-style.css";

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
