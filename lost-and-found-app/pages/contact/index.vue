<template>
    <common-template>
      <div slot="content" class="p-4 overflow-auto" style="min-height: 80vh;">
        <div class="fw-bold m-0 p-0 text-secondary mb-2" style="font-size: 30px; width:50%;">Contacts</div>
        <div v-if="items.length <= 0" class="border rounded p-4 text-center" style="margin-top: 30px;">
          <div class="text-secondary">No data found.</div>
        </div>
        <div v-loading="loading" style="margin-top: 30px;">
         
          <div style="background-color: #f95b2c;" class="rounded py-2 px-4 my-2" v-for="(item, idx) in uniqueItems" :key="idx">
              <div @click="$router.push(`/contact/${item.conversation_no}`)"  class="d-flex align-items-center justify-content-start" v-if="$cookies.get('user').id !== item.sender_id">   
                <div><img style="width: 48px; height: 48px; border-radius: 50px;" :src="`${lostAndFoundServiceUrl}/images/${item.sender_avatar_url}`" alt=""></div>
                <div class="fw-bold ms-2">
                    <!-- {{ item.user.id+" "+$cookies.get('user').id +" "+ item.contact_user_id }} -->
                    {{ item.sender_full_name }}
                </div>
              </div>
              <div @click="$router.push(`/contact/${item.conversation_no}`)"  class="d-flex align-items-center justify-content-start"  v-if="$cookies.get('user').id !== item.receiver_id">   
                <div><img style="width: 48px; height: 48px; border-radius: 50px;" :src="`${lostAndFoundServiceUrl}/images/${item.receiver_avatar_url}`" alt=""></div>
                <div class="fw-bold ms-2">
                    <!-- {{ item.user.id+" "+$cookies.get('user').id +" "+ item.contact_user_id }} -->
                    {{ item.receiver_full_name }}
                </div>
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
    loading: true,
    lostAndFoundServiceUrl: process.env.LOST_AND_FOUND_SERVICE_URL
  };
},
computed: {
    uniqueItems() {
      const uniqueConversations = new Set();
      return this.items.filter(item => {
        if (!uniqueConversations.has(item.conversation_no)) {
          uniqueConversations.add(item.conversation_no);
          return true;
        }
        return false;
      });
    },
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
        `${process.env.LOST_AND_FOUND_SERVICE_URL}/api/contact-users?user_id=${this.$cookies.get('user').id}`
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