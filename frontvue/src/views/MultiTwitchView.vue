<template>
  <grid-layout
    :layout.sync="layout"
    :col-num="12"
    :row-height="190"
    :is-draggable="true"
    :is-resizable="true"
    :responsive="true"
    :is-mirrored="false"
    :vertical-compact="true"
    :use-css-transforms="true">
    <div v-for="item in layout" :key="item.i">
    <grid-item
      v-if="item.i!='insert'"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
      @resized="resizedEvent"
      >
      <v-card>
        <v-app-bar
          dark
          color="pink"
          dense >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title> {{item.streamName}} </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="delWidget(item.streamer , item.option)">
            <v-icon>mdi-minus-circle-outline</v-icon>
          </v-btn>
        </v-app-bar>
        <twitch-channel v-if="item.option=='stream'"
            :channel="item.streamer" 
        ></twitch-channel>
        <twitch-chat v-if="item.option=='chat'"
            :channel="item.streamer" 
        ></twitch-chat>
      </v-card>
    </grid-item>
    <grid-item
      v-else
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
      :is-resizable="false"
      >
      <ChannelInput @addClick="addClick" @alarmSnack="alarmSnack" @errorSnack="errorSnack"/>
    </grid-item>
    </div>
    <v-snackbar
      v-model="asnackbar"
      :timeout="timeout"
      top
    >
      {{ alarmtext }}
      <v-btn
        color="blue"
        text
        @click="asnackbar = false"
      >
      Close
      </v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="esnackbar"
      :timeout="timeout"
      top
      color="red"
      >
      {{ errortext }}
      <v-btn
        text
        @click="esnackbar = false"
      >
      Close
      </v-btn>
    </v-snackbar>  
  </grid-layout>
</template>
<script>
import VueGridLayout from 'vue-grid-layout';
import ChannelInput from "../components/twitch/ChannelInput";
import TwitchChannel from "../components/twitch/TwitchChannel";
import TwitchChat from "../components/twitch/TwitchChat";
import { mapMutations } from 'vuex'
export default {
  created() {
    document.title = "멀티트위치,트우치";
    
  },
  components : {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    ChannelInput,
    TwitchChannel,
    TwitchChat
  },
  computed: {
    layout :{
      get(){
          return this.$store.state.twitchStore.layout
      },
      set(){
          
      }
    }
  },
  data() {
    return {
      draggable: true,
      resizable: true,
      asnackbar: false,
      esnackbar: false,
      alarmtext: '',
      errortext: '',
      timeout: 2000,
    }
  },
  methods: {
    ...mapMutations('twitchStore' , [
      'SET_LAYOUT',
      'REMOVE_LAYOUT'
    ]),
    addClick(channelId , viewOption ,streamName){     
      // 이미 존재하는지 확인
      const item =  this.layout.filter(el=> el.i==channelId+viewOption);
      if(item.length >0)return;
      this.SET_LAYOUT({"x":0,"y":0,"w":4,"h":2,"i":channelId+viewOption, "streamer" : channelId , "option" : viewOption, "streamName" : streamName});
    },
    resizedEvent(i, newH, newW, newHPx){
      const item = this.layout.filter((item)=>{
        return item.i ===i;
      })
      document.querySelector("iframe#"+item[0].i).height = newHPx-60;
    },
    // 위젯 삭제하기
    delWidget(channelId, option){
      let index = this.layout.findIndex((item)=>{
        return item.streamer == channelId && item.option == option;
      });
      this.REMOVE_LAYOUT(index);
    },
    // 스낵바 알림
    alarmSnack(msg){
      this.asnackbar = !this.asnackbar;
      this.alarmtext = msg;
    },
    // 스낵바이용 경고알림
    errorSnack(msg){
      this.esnackbar = !this.esnackbar;
      this.errortext = msg
    }
  },
}
</script>

<style>
  iframe{
    top : 0;
    left : 0;
    width : 100%;
    /* height : 100%; */
  }
  .vue-grid-item>.vue-resizable-handle {
    width: 10px;
    height: 10px;
    background-color: blueviolet;
  }
</style>