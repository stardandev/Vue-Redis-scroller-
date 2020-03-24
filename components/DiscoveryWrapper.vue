<template>
  <div>
    <div v-if="!removed">
      <Post :item="item.content" ref="post" @load="onload" @view="onView" />
    </div>
  </div>
</template>

<script>
// Wraps around the post component
import Post from "~/components/Post.vue";
export default {
  name: "DiscoveryWrapper",
  scrollToTop: true,
  props: {
    item: {}
  },
  components: {
    Post
  },
  data() {
    return {
      isReady: false,
      seen: false,
      removed: false
    };
  },
  mounted() {},
  methods: {
    onView(e) {
      if (e.percentInView == 1 && this.isReady) {
        // console.log(this.item.content.id, "@", e.percentInView);
        setTimeout(()=>{
          this.seen = true;
        }, 500)
        
      }
      if (e.percentInView == 0 && this.seen) {
        // console.log(this.item.content.id, "@", e.percentInView);
        // 
        this.$axios.setToken(this.$store.state.token, this.$store.state.token_type);
        this.$axios.$post("/api/posts/"+ this.item.content.id +"/seen/")
        this.removed = true;
      }
    },
    resize() {
      if(this.removed){
        return
      }
      let grid = document.getElementsByClassName("grid")[0];
      let rowHeight = parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
      );
      let rowGap = parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
      );
      let rowSpan = Math.ceil(
        (this.$refs.post.height().height + rowGap) / (rowHeight + rowGap)
      );
      this.item.height = rowSpan;
    },
    onload() {
      this.isReady = true;
      this.$emit("load");
    }
  },
  computed: {},
  created() {
    
  },
  destroyed() {}
};
</script>

<style></style>
