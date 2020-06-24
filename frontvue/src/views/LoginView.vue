<template>
  <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>로그인</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
            <v-form v-model="valid" ref="form"  @submit.prevent="onSubmit">
              <v-text-field
                v-model="email"
                label="이메일"
                name="email"
                prepend-icon="mdi-account"
                type="text"
                :rules="emailRules"
                required
              />
              <v-text-field
                v-model="password"
                id="password"
                label="비밀번호"
                name="password"
                prepend-icon="mdi-onepassword"
                type="password"
                :rules="passwordRules"
                required
                />
              <v-card-actions>
                <v-btn text color="primary" @click="singupEvent">회원가입</v-btn>
                <v-spacer />
                <v-btn color="primary" type="summit" :disabled="!valid">로그인</v-btn>
                </v-card-actions>
            </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import {mapActions,mapMutations} from 'vuex'
export default {
  data() {
    return {
      rPath : '/',
      email : '',
      password : '',
      valid : false,
      emailRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.+@.+/.test(v) || '이메일이 형식이 아닙니다.',
      ],
      passwordRules: [
          v => !!v || '비밀번호는 필수입니다.',
      ],
    }
  }, 
  created() {
    // 로그인후 해당페이지로 이동
    this.rPath = this.$route.query.rPath;
    if(!this.rPath) this.rPath = "/";
  },
  methods: {
    ...mapActions('authStore' , ['LOGIN']),
    ...mapMutations(['SET_SNACKBAR_SETING']),
      onSubmit(){          
        if(this.$refs.form.validate()){
          this.LOGIN({email :this.email , password : this.password})
          .then(() =>{   
              
            this.$router.push(this.rPath);
          })
          .catch(err=>{             
            console.error(err);
          })
        }
      },
      singupEvent(){
        
        this.SET_SNACKBAR_SETING( {msg :'일반사용자는 회원가입불가' ,color :'green'});
      }
  },
     
}
</script>

<style>

</style>