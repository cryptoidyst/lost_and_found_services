<template>
  <common-template>
    <div slot="content" class="p-4 overflow-auto" style="height: 80vh; background-color: #f5f5f5;">
      <div class="fw-bold m-0 p-0 text-secondary mb-2" style="font-size: 20px;">Recently Reported Lost Items</div>

      <div style="margin-bottom: 30px;" class="d-flex">
        <div class="col">
          <el-input prefix-icon="el-icon-search" placeholder="Enter keyword to search" v-model="searchInput" @input="searching" @keyup.enter="getReports"/>
        </div>
        <div class="ms-2">
          <el-button @click="getReports">Search</el-button>
        </div>
      </div>
      <!-- CARD VIEW -->
      <div style="margin-bottom: 50px;" class="row p-0 mx-0" v-loading="loading">
        <div class="mb-4"  v-for="item in items" :key="item.id">
          <div @click="$router.push(`./report/${item.id}`)" class="item-card">
            <div class="d-flex justify-content-center align-items-center border mb-2 rounded item-image-container">
              <img style="min-height: 150px; max-height: 150px; object-fit: cover;" v-if="item && item.report_images && item.report_images[0]" :src="`${lostAndFoundServiceUrl}/images/` + item.report_images[0].image" />
              <el-image style="min-height: 150px;" v-else>
                <div slot="error" class="image-slot item-image">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div class="item-details">
              <div class="d-flex align-items-center justify-content-between">
                <div><p class="fw-bold p-0 m-0 m-0" style="font-size: 14px;">{{ item.item_name }}</p></div>
                <div v-if="item.status == 'claimed'"><el-tag type="success" size="small">{{ item.status }}</el-tag></div>
                <div v-else><el-tag type="warning" size="small">Finding owner</el-tag></div>
              </div>
              <p class="text-secondary p-0 m-0 mb-2" style="font-size: 12px;">"{{ item.item_description }}"</p>
              <div class="d-flex justify-content-between">
                <div class="d-flex align-self-center justify-content-center">
                  <i class="el-icon-location m-0 p=0"></i>
                  <div class="text-secondary p-0 m-0 ms-1" style="font-size: 12px;">{{ item.location || "-" }}</div>
                </div>
                <div class="d-flex align-self-center justify-content-center">
                  <i class="el-icon-time m-0 p=0"></i>
                  <div class="text-secondary p-0 m-0 ms-1" style="font-size: 12px;">{{ item.report_date || "-" | formatDate}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ... -->
    </div>
  </common-template>
</template>

<script>
import Footer from "@/components/Footer.vue";
import CommonHeader from "~/components/CommonHeader.vue";
import CommonTemplate from '~/components/CommonTemplate.vue'
export default {
  component: {
    Footer,
    CommonHeader,
    CommonTemplate
  },
  data() {
    return {
      items: [],
      searchInput: '',
      loading: true,
      currentPage: 1,
      limit: 6,
      total: 0,
      tab: "card",
      lostAndFoundServiceUrl: process.env.LOST_AND_FOUND_SERVICE_URL,
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
    searching() {
      console.log('abc')
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getReports();
    },
    async getReports(){
      try{
        this.loading = true
        const response = await this.$axios.get(
          `${process.env.LOST_AND_FOUND_SERVICE_URL}/api/reports`,
          {
            params: {
              search: this.searchInput,
              limit: this.limit,
              current_page: this.currentPage,
              status: 'unclaim'
            },
          }

        );
        this.items = response.data.data;
        this.total = response.data.total
        this.currentPage = response.data.current_page
      }catch(err){

      }finally{
        this.loading = false
      }
    }
  }
};
</script>



<style scoped>
.item-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.item-card:hover {
  transform: translateY(-5px);
}

.item-image-container {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-details {
  padding: 16px;
}
</style>