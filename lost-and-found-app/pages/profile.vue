<template>
  <common-template>
    <div slot="content" class="p-4 overflow-auto" style="min-height: 80vh;"  v-loading="loading">
      <div class="d-flex align-items-center justify-content-between mb-4">
          <div class="fw-bold m-0 p-0 text-secondary" style="font-size: 30px;">Profile</div>
          <div>
            <el-button type="default" icon="el-icon-arrow-left" @click="$router.go(-1)">Back</el-button>
          </div>
        </div>

      <div v-if="profile.avatar_url" class="w-100 text-center" style="max-height: 50vh; overflow: hidden;">
        <img :src="`${lostAndFoundServiceUrl}/images/` + profile.avatar_url" alt="" class="w-100">
      </div>
      <div v-else class="w-100 text-center" style="max-height: 50vh; overflow: hidden;">
        <img src="../assets/images/profile.jpeg" alt="" class="w-100">
      </div>
      
      <div class="d-flex justify-content-end">
        <i class="el-icon-edit text-secondary my-2 mt-4" style="font-size: 20px;" @click="toggleEditMode"></i>
      </div>
      <el-form :model="profile" ref="profile" >
        <el-form-item prop="avatar">
          <el-upload
            class="upload-demo"
            action=""
            :auto-upload="false"
            :on-change="handleAvatarChange"
            :disabled="!editMode"
          >
            <el-button size="small" type="primary" :disabled="!editMode">Click to upload profile photo</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="Username">
          <el-input placeholder="Username" v-model="profile.username" :disabled="!editMode"></el-input>
        </el-form-item>
        <el-form-item label="Full Name" prop="full_name">
          <el-input placeholder="Full Name" v-model="profile.full_name" :disabled="!editMode"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input placeholder="Email" v-model="profile.email" :disabled="!editMode"></el-input>
        </el-form-item>
        <el-form-item label="Location" prop="address">
          <el-input placeholder="Location" v-model="profile.address" :disabled="!editMode"></el-input>
        </el-form-item>
        <el-form-item label="Date Joined" >
          <el-date-picker
            placeholder="Date Joined"
            class="w-100"
            :disabled="!editMode"
            v-model="profile.created_at"
          ></el-date-picker>
        </el-form-item>
        <el-button v-loading="submitButtonLoading" @click="onSubmit('profile')" class="w-100 btn btn-dark" :disabled="!editMode">
          Update
        </el-button>
      </el-form>
      <el-button class="w-100 mt-4" type="danger" @click="logout()">
        Logout
      </el-button>
    </div>
  </common-template>
</template>

<script>
import CommonHeader from "../components/CommonHeader.vue";
import Footer from "@/components/Footer.vue";
import ProfileMenu from "@/components/ProfileMenu.vue";

export default {
  components: {
    CommonHeader,
    Footer,
    ProfileMenu,
  },
  data() {
    return {
      profile: {},
      loading: false,
      editMode: false,
      avatarFile: null,
      submitButtonLoading: false,
      lostAndFoundServiceUrl: process.env.LOST_AND_FOUND_SERVICE_URL,
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      try {
        this.loading = true;
        const profileDetails = await this.$axios.get(
          `${process.env.LOST_AND_FOUND_SERVICE_URL}/api/user/${this.$cookies.get('user').id}`
        );
        this.profile = profileDetails.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
      this.loading = false;
    },
    handleAvatarChange(file, fileList) {
      this.avatarFile = file.raw;
    },
    onSubmit(formName) {
      this.submitButtonLoading = true;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const formData = new FormData();
            formData.append('address', this.profile.address);
            formData.append('full_name', this.profile.full_name);
            if (this.avatarFile) {
              formData.append('files', this.avatarFile);
            }
            await this.$axios.post(
              `${process.env.LOST_AND_FOUND_SERVICE_URL}/api/update-user/${this.profile.id}`,
              formData
            );
            this.$notify.success({
              title: "Success",
              message: "User updated successfully",
            });
            window.location.reload()
          } catch (error) {
            this.$notify.error({
              title: "Error",
              message: error.response?.data,
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async logout() {
      try {
        await this.$cookies.remove("token");
        await this.$cookies.remove("user");
        this.$notify.success({
          title: "Success",
          message: "Logout successful",
        });
        window.location.reload();
      } catch (error) {
        this.$notify.error({
          title: "Error",
          message: error.response?.data.message || "Logout failed",
        });
      }
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
  },
};
</script>

<style>
@import "../assets/styles/custom-style.css";

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>