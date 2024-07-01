
<template>
  <div class="d-flex justify-content-center">
    <div class="text-center" style="width: 80%;">
      <img src="../assets/images/logo.jpeg" alt="" style="width: 120px; margin-bottom: 50px" />
      <div class="fw-bold" style="font-size: 40px; margin-top: -50px;">Lost Item</div>
      <el-input style="margin-bottom: 20px;" prefix-icon="el-icon-search" placeholder="Enter keyword to search" />
      <el-row>
          <el-col v-for="(o, index) in 5" :key="o" style="margin:10px; width: 45%;">
            <el-card :body-style="{ padding: '0px' }">
              <el-image style="background-color: #FFBD12; width: 100%; height: 150px;  margin-right: 10px;">
                <div slot="error" class="image-slot d-flex justify-content-center align-items-center" style="height: 100%;">
                    <i class="el-icon-picture-outline" style="font-size: 40px; color:#fff"></i>
                </div>
              </el-image>
              <div style="padding: 14px; text-align: left;">
                <div class="d-flex justify-content-between">
                  <div class="fw-bold">Iphone 12</div>
                  <i class="el-icon-collection-tag"></i>
                </div>
                <div class="text-truncate" style="width: 60%;">Found an Iphone 12 in toilet.</div>
              </div>
            </el-card>
          </el-col>
      </el-row>
      <el-pagination
        style="margin-top: 20px;"
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      registerForm: {}
    }
  }
}
</script>