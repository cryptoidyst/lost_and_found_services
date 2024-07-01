<template>
  <div>

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
    this.$router.push('home')
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
