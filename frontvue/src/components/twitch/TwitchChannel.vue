<template>
  <!-- <div ref="player"  :id="this.channel+'stream'"></div> -->
  <iframe
    :src="this.src"
    :height="this.height"
    :width="this.width"
    frameborder="0"
    :id="this.channel+'stream'"
    :ref="this.channel+'stream'">
  </iframe> 
</template>

<script>
export default {
  name : "twitch-play",
  props : {
    width: {
      type: String,
      default: '340',
    },
    height: {
      type: String,
      default: '340',
    },
    channel: {
      type: String,
    },
    layout: {
      type: String,
      default: 'video',
    },
    theme: {
      type: String,
      default: 'dark',
    },
  },
  data() {
    return {
      src : `http://player.twitch.tv?channel=${this.channel}`
    }
  },
}
</script>

<style>

</style>