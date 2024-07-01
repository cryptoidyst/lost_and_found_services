<template>
    <div class="row justify-content-center m-0 p-0">
    <div class="col-md-6 p-0">
      <common-header></common-header>
      <slot name="content"></slot>
      <Footer></Footer>
    </div>
  </div>
</template>

  
<script>
import Footer from "@/components/Footer.vue";
import CommonHeader from "~/components/CommonHeader.vue";

export default {
  component: {
    Footer,
    CommonHeader
  },
}
</script>