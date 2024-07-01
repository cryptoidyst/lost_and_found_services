<template>
  <common-template>
    <div slot="content" class="p-4 overflow-auto" style="min-height: 80vh;">
      <div class="row">
        <div class="col-md-4">
          <div @click="$router.push('/claim/')" class="card mb-4">
            <div class="card-body d-flex flex-column align-items-center">
              <i class="el-icon-document icon-large mb-3"></i>
              <h5 class="card-title">My Claim</h5>
              <p class="card-text">View and manage your claims.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div @click="$router.push('/report/my-report')" class="card mb-4">
            <div class="card-body d-flex flex-column align-items-center">
              <i class="el-icon-edit icon-large mb-3"></i>
              <h5 class="card-title">My Report</h5>
              <p class="card-text">Create and view your reports.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div @click="$router.push('/contact/')" class="card mb-4">
            <div class="card-body d-flex flex-column align-items-center">
              <i class="el-icon-phone-outline icon-large mb-3"></i>
              <h5 class="card-title">My Contact</h5>
              <p class="card-text">Manage your contact information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </common-template>
</template>

<script>
import Footer from "@/components/Footer.vue";
import CommonHeader from '../components/CommonHeader.vue';
import moment from "moment";

export default {
  components: {
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
    // this.getReports()
  },
  methods: {
    async clickedItem(itemId) {
      this.$router.push(`/report/${itemId}`);
    },
    async getReports() {
      this.loading = true;
      try {
        const response = await this.$axios.get(
          `${process.env.LOST_AND_FOUND_SERVICE_URL}/api/reports`
        );
        this.items = response.data;
      } catch (err) {
        // Handle error
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style>
@import "../assets/styles/custom-style.css";

.icon-large {
  font-size: 48px;
}

.card {
  cursor: pointer;
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.card-text {
  font-size: 14px;
  color: #666;
}
</style>