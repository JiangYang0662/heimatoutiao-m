<template>
  <div class="user-profile">
      <!-- 顶部导航栏 -->
      <van-nav-bar 
        class="page-nav-bar"
        title="个人信息" 
        left-arrow 
        @click-left="$router.back()"/>

        <!-- 选择图片 -->
        <input type="file" ref="file" hidden @change="onFileChange">
        <!-- 个人信息 -->
       <van-cell-group>
         <van-cell title="头像" is-link class="avatar-cell" center @click="$refs.file.click()">
           <van-image
             class="avatar"
             round
             fit="cover"
             :src="user.photo"
           />
         </van-cell>
         <van-cell title="昵称" 
           :value="user.name" 
           is-link 
           @click="isUpdateNameShow = true"/>
         <van-cell title="性别" 
           :value="user.gender === 0 ? '男' : '女'"
            is-link 
            @click="isUpdateGenderShow = true"/>
         <van-cell title="生日" 
           :value="user.birthday" 
           is-link 
           @click="isUpdateBirthdayShow = true"/>
       </van-cell-group>

       <!-- 编辑资料---头像 -->
       <van-popup v-model="isUpdatePhotoShow" position="bottom" style="height: 100%" >
          <update-photo
            v-if="isUpdatePhotoShow"
            :img="img"
            @close="isUpdatePhotoShow = false"
            @update-photo="user.photo = $event"
           />
       </van-popup>
       <!-- 编辑资料---昵称 -->
       <van-popup v-model="isUpdateNameShow" style="height: 100%" position="bottom">
           <update-name 
             v-if="isUpdateNameShow" 
             v-model="user.name"
             @close="isUpdateNameShow = false">
           </update-name>
       </van-popup>

       <!-- 编辑资料---性别 -->
       <van-popup v-model="isUpdateGenderShow" position="bottom">
           <update-gender 
             v-if="isUpdateGenderShow" 
             v-model="user.gender"
             @close="isUpdateGenderShow = false">
           </update-gender>
       </van-popup>

       <!-- 编辑资料---生日 -->
       <van-popup v-model="isUpdateBirthdayShow" position="bottom">
           <update-birthday 
             v-if="isUpdateBirthdayShow" 
             v-model="user.birthday"
             @close="isUpdateBirthdayShow = false">
           </update-birthday>
       </van-popup>


  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from '@/views/componets/update-name.vue'
import UpdateGender from '@/views/componets/update-gender.vue'
import UpdateBirthday from '@/views/componets/update-birthday.vue'
import UpdatePhoto from '@/views/componets/update-photo.vue'


export default {
  name: 'UserProfile',
  components: {
      UpdateName,
      UpdateGender,
      UpdateBirthday,
      UpdatePhoto
  },
  props: {},
  data () {
    return {
        user: {}, //个人信息
        isUpdateNameShow: false,
        isUpdateGenderShow: false,
        isUpdateBirthdayShow: false,
        isUpdatePhotoShow: false,
        img: null // 
    }
  },
  computed: {},
  watch: {},
  created () {
      this.loadUserProfile();
  },
  mounted () {},
  methods: {
      // 1. 获取用户个人信息
      async loadUserProfile() {
          try {
              const {data} = await getUserProfile();
              this.user = data.data;
              console.log(data)
          } catch(err) {
              console.log('数据获取失败',err);
             this.$toast('数据获取失败，请登录!');
          }
      },

      // 2. 获取图片
      onFileChange() {
          const file = this.$refs.file.files[0];
          this.img = window.URL.createObjectURL(file);
          console.log(this.img);
          console.log(file);
          this.isUpdatePhotoShow = true;
          this.$refs.file.value = '';
      }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
  }
}
</style>