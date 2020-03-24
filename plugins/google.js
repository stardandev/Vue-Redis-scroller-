import Vue from 'vue'
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '428968004852-stn9715pd2o0k9lohiph9autiulev894.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)