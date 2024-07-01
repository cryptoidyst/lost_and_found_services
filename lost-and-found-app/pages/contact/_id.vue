<template>
    <common-template>
        <div slot="content" class="p-4 overflow-auto" style="height: 80vh;">
            <div v-for="(message, idx) in messages">
                <div class="d-flex justify-content-end mb-4" v-if="message.sender_id == $cookies.get('user').id && message.receiver_id !== $cookies.get('user').id">
                    <div class="border rounded p-2" style="min-width: 40%;">
                       <div class="" style="font-size: 15px;" >{{ message.contact_message }}</div>
                       <div class="text-secondary" style="font-size: 12px;">{{ message.contact_sent_date | formatDate }}</div>
                    </div>
                    <div class="ms-2"><img style="width: 28px; height: 28px; border-radius: 50px;" :src="`${lostAndFoundServiceUrl}/images/${message.sender_avatar_url}`" alt=""></div>
                </div>
                <div v-else class="d-flex justify-content-start mb-4" v-if="message.receiver_id == $cookies.get('user').id && message.sender_id !== $cookies.get('user').id">
                    <div class="ms-2"><img style="width: 28px; height: 28px; border-radius: 50px;" :src="`${lostAndFoundServiceUrl}/images/${message.sender_avatar_url}`" alt=""></div>
                    <div class="border rounded p-2" style="min-width: 40%;">
                       <div class="" style="font-size: 15px;" >{{ message.contact_message }}</div>
                       <div class="text-secondary" style="font-size: 12px;">{{ message.contact_sent_date | formatDate }}</div>
                    </div>
                </div>
            </div>
            <div class="contact-form">
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="Enter your message"
                    v-model="message"
                ></el-input>
                <el-button class="btn btn-dark" @click="sendMessage">Send</el-button>
                <el-button class="btn"@click="getContactByReportIdAndClaimerId">
                  <i class="el-icon-refresh" ></i>
                </el-button>
            </div>
        </div>
    </common-template>
  </template>

  <script>
  import Footer from "@/components/Footer.vue";
  import CommonHeader from "~/components/CommonHeader.vue";
  import axios from 'axios';

  export default {
    components: {
      Footer,
      CommonHeader
    },
    data() {
      return {
        message: '',
        messages: [],
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
    created(){
        this.getContactByReportIdAndClaimerId()
    },
    methods: {
     async getContactByReportIdAndClaimerId(){
        try{
            const response = await this.$axios.get(`${process.env.LOST_AND_FOUND_SERVICE_URL}/api/contacts?conversation_no=${this.$route.params.id}`)
            this.messages = response.data.data
        }catch(err){
            console.log(err)
        }
      },
      async sendMessage(receiverId) {
        try{

            let body = {
              sender_id: this.$cookies.get('user').id,
              receiver_id: this.$route.query.contact_user_id,
              sent_date: new Date(),
              message: this.message
            }
            
            

            if(this.messages.length >= 1){
              body = {
              conversation_no: this.$route.params.id,
              sender_id: this.$cookies.get('user').id,
              receiver_id: this.messages[0].sender_id == this.$cookies.get('user').id ? this.messages[0].receiver_id : this.messages[0].sender_id,
              sent_date: new Date(),
              message: this.message}
            }

            const response = await this.$axios.post(`${process.env.LOST_AND_FOUND_SERVICE_URL}/api/contact`, body)
              
            this.$notify.success({
                title: "Success",
                message: "Successfully sent",
            });

            const responseBody = response

            console.log(responseBody.data.conversation_no)

            if(responseBody.data.conversation_no){
              window.location.href = `${response.data.conversation_no}`
            }

            this.getContactByReportIdAndClaimerId(response.data.converstation_no)
        }catch(err){
            // Handle error
            console.error('Error sending message:', err);
            this.$notify.error({
                title: "Error",
                message: err,
            });
        }

      }
    }
  };
  </script>

  <style scoped>
  .contact-content {
    padding: 20px;
  }

  .contact-form {
    margin-top: 20px;
  }

  .el-button {
    margin-top: 10px;
  }
  </style>
