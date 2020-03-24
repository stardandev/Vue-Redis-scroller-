<template>
  <!-- :style="{ 'max-height': maxScrollHeight + 'px', 'top': top + 'px' }" -->
  <div class="container px-0">
    <b-row>
      <b-col lg="2" class="my-1">
        <b-button @click="$router.back()" block variant="primary">
          Go Back
        </b-button>
      </b-col>
    </b-row>

    <div class="row" :class="{ ' m-0': window.width < 760 }">
      <div class="col-md-8 mb-4" :class="{ ' p-0': window.width < 760 }">
        <!-- <Post @click="onPostSelected" v-if="$store.state.posts.selected" :item="$store.state.posts.selected" :link="$store.state.posts.selected.location" /> -->

        <div
          :id="'post_' + post.id"
          class="card card-post"
          :class="{ 'card--dark': $store.state.dark }"
        >
          <div class="card-header">
            <div class="row">
              <div class="col-sm-12">
                <div class="text-primary">
                  <!-- <i style="font-size:20px" class="float-left fab text-yellow" v-bind:class="['fa-'+item.source+'-square']" ></i> -->
                  <img
                    class="float-left"
                    :src="'/images/social/' + post.platform + '-icon.png'"
                    height="20px"
                    alt
                  />
                </div>
                <div class="float-right">
                  <div class="text-white" v-if="$store.state.dark" @click="toggleShare()">
                    <img
                      src="/images/social/icons8-connect-51.png"
                      class="mb-1"
                      height="16px"
                    />
                    Share
                  </div>
                  <div class="text-dark" v-if="!$store.state.dark" @click="toggleShare()">
                    <img
                      src="/images/social/icons8-connect-50-dark.png"
                      class="mb-1"
                      height="16px"
                    />
                    Share
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div v-if="share" class="social-share">
              <div v-if="share"  class="float-right">
                <a
                  class="mr-1"
                  title="share on facebook"
                  :href="
                    'https://www.facebook.com/sharer/sharer.php?u=https://skrollo.com/post/' +
                      post.id
                  "
                  target="_blank"
                >
                  <img src="/images/social/icons8-facebook-48.png"  v-if="$store.state.dark" height="30px" />
                  <img src="/images/social/icons8-facebook-48-dark.png"  v-if="!$store.state.dark" height="30px" />
                </a>
                <a
                  class="mr-1"
                  title="share on whatsapp"
                  :href="'https://wa.me/?text=https://skrollo.com/post/' + post.id"
                  target="_blank"
                >
                  <img src="/images/social/icons8-whatsapp-100.png"  v-if="$store.state.dark" height="30px" />
                  <img src="/images/social/icons8-whatsapp-100-dark.png"  v-if="!$store.state.dark" height="30px" />
                </a>
                <a
                  class="mr-1"
                  title="share on twitter"
                  :href="
                    'https://twitter.com/intent/tweet?url=https://skrollo.com/post/' +
                      post.id
                  "
                  target="_blank"
                >
                  <img src="/images/social/icons8-twitter-16.png"  v-if="$store.state.dark" height="30px" />
                  <img src="/images/social/icons8-twitter-16-dark.png"  v-if="!$store.state.dark" height="30px" />
                </a>
                <a
                  class="mr-1"
                  title="share on Pinterest"
                  :href="
                    'http://pinterest.com/pin/create/button/?url=https://skrollo.com/post/' +
                      post.id
                  "
                  target="_blank"
                >
                  <img src="/images/social/icons8-pinterest-48.png"  v-if="$store.state.dark" height="30px" />
                  <img src="/images/social/icons8-pinterest-48-dark.png"  v-if="!$store.state.dark" height="30px" />
                </a>
                <a
                  class="mr-1"
                  title="share vie SMS"
                  :href="'sms:?&body=http%3A//skrollo.com/post/' + post.id"
                  target="_blank"
                >
                  <img src="/images/social/icons8-sms-48.png"  v-if="$store.state.dark" height="30px" />
                  <img src="/images/social/icons8-sms-48-dark.png"  v-if="!$store.state.dark" height="30px" />
                </a>
                <a
                  @click="copyLink"
                  class="mr-1 clickable"
                  title="copy link"
                  target="_blank"
                >
                  <img src="/images/social/icons8-link-16.png"  v-if="$store.state.dark" height="30px" />
                  <img src="/images/social/icons8-link-16-dark.png"  v-if="!$store.state.dark" height="30px" />
                </a>
              </div>
            </div>
            <div v-touch="selected" class="card-img-top clickable">
              <div
                v-if="
                  post.content_type.includes('image') || post.content_type == ''
                "
              >
                <!-- this is the changed part by Ivan -->
                <!-- <visual in-viewport-root-margin="10% 0%" width="100%" loop :muted="isMuted" autoplay autopause="visible"
            :image="image" :video="video" @loaded="load"></visual> -->

                <div
                  class="vv-visual vv-loaded vv-image-loaded"
                  style="width: 100%;"
                >
                  <div class="vv-transition vv-image-transition">
                    <picture>
                      <source
                        :src="post.media_location"
                        media="(min-width: 800px)"
                      />
                      <img
                        :src="post.media_location"
                        class="vv-asset vv-image vv-has-width"
                      />
                    </picture>
                  </div>
                </div>
                <!-- this is the changed part by Ivan -->
              </div>

              <div v-if="post.platform == 'youtube'">
                <LazyYoutubeVideo :url="post.location" />
              </div>

              <div v-if="post.content_type.includes('video')">
                <video
                  width="100%"
                  :src="post.media_location"
                  controls
                  loop
                  :muted="isMuted"
                  preload="metadata"
                ></video>
              </div>
            </div>
          </div>
          <!-- special content -->
          <!-- <div class="shop">
      <b-button variant="outline-primary" size="sm">Shop Now</b-button>
    </div>-->
          <div class="card-body pt-1 pb-0">
            <a :href="post.location">
              <!-- @click="selected" -->
              <h5 class="card-title clickable">
                <b>{{ post.title }}</b>
              </h5>
            </a>

            <div class="row">
              <div class="col-6">
                <div v-if="$store.state.dark" class="text-white">
                  <h4 class="mb-1">
                    <i class="far fa-comment-alt"></i>
                    <b>{{ post.comment_count }}</b>
                  </h4>
                </div>
                <div v-if="!$store.state.dark" class="text-dark">
                  <h4 class="mb-1">
                    <i class="far fa-comment-alt"></i>
                    <b>{{ post.comment_count }}</b>
                  </h4>
                </div>
              </div>
              <!-- <div class="col-6"></div> -->
              <!-- <div class="col-6">
          <div class="text-center text-grey">Company Name</div>
        </div> -->
              <div class="col-6">
                <div v-if="$store.state.dark" class="text-white float-right mb-1" @click="onLike">
                  <h4>
                    <i
                      v-if="!post.user_liked"
                      class="far fa-arrow-alt-circle-up "
                    ></i>
                    <i
                      v-if="post.user_liked"
                      class="fas fa-arrow-alt-circle-up"
                    ></i>
                    <b>{{ post.score + post.like_count }}</b>
                  </h4>
                  <!-- <img
              src="/images/social/icons8-up-arrow-24.png"
              class=""
              height="20px"
            /> -->
                </div>
                <div v-if="!$store.state.dark" class="text-dark float-right mb-1" @click="onLike">
                  <h4>
                    <i
                      v-if="!post.user_liked"
                      class="far fa-arrow-alt-circle-up "
                    ></i>
                    <i
                      v-if="post.user_liked"
                      class="fas fa-arrow-alt-circle-up"
                    ></i>
                    <b>{{ post.score + post.like_count }}</b>
                  </h4>
                  <!-- <img
              src="/images/social/icons8-up-arrow-24.png"
              class=""
              height="20px"
            /> -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div v-if="window.width <= 770" class="card mb-2" :class="{ 'card--dark': $store.state.dark }">
          <div class="row m-1">
            <div class="col-6 p-1">
              <b-button variant="primary" squared block @click="onPrevPost">
                <img class="mr-2" src="/images/social/icons8-prev-100.png" height="25px" />Prev Post
              </b-button>
            </div>
            <div class="col-6 p-1">
              <b-button variant="primary" squared block @click="onNextPost">
                Next Post
                <img class="ml-2" src="/images/social/icons8-more-than-80.png" height="25px" />
              </b-button>
            </div>
          </div>
        </div> -->

        <div class="tabs mt-2" :class="{ 'tabs--dark': $store.state.dark }">
          <!-- <vue-disqus
              class="mx-2"
              shortname="scrolltron"
              :identifier="post._id"
              :url="url"
            ></vue-disqus> -->
          <div class="row mb-3 m-0">
            <div v-if="$store.state.dark" class="text-white col-6 text-center" @click="tabsC">
              <span class="title" :class="{ active: comments }">Comments</span>
            </div>
            <div class="col-6 text-center" @click="tabsS">
              <span v-if="$store.state.dark" class="text-white title" :class="{ active: supported }">Journal</span>
            </div>
          </div>
          <div class="row mb-3 m-0">
            <div v-if="!$store.state.dark" class="text-dark col-6 text-center" @click="tabsC">
              <span class="title" :class="{ active: comments }">Comments</span>
            </div>
            <div class="col-6 text-center" @click="tabsS">
              <span v-if="!$store.state.dark" class="text-dark title" :class="{ active: supported }">Journal</span>
            </div>
          </div>
          <span v-if="$store.state.loggedIn">
            <textarea
              v-model="new_comment"
              :placeholder="
                comments ? 'Add A Comment' : 'Upload Supporting Content'
              "
              cols="30"
              rows="4"
            ></textarea>
            <img
              @click="onAddComment"
              class="send"
              src="/images/social/Path 107.png"
            />

            <div class="ques" v-if="supported">
              <img
                @click="ques = !ques"
                src="/images/social/icons8-question-mark-24.png"
                height="15px"
              />
              <div class="explanation" v-if="ques">Text explanation</div>
            </div>
            <div class="upload" v-if="supported">
              <img src="/images/social/attached-3.png" height="15px" />
            </div>
          </span>
        </div>

        <div class="supporteds" v-if="!isAuthenticated">
          <b-card class="tabs--dark">
            <div class="d-flex justify-content-between align-items-center">
              <p class="text-centered">
                Please login to comment.
              </p>
              <nuxt-link to="/login">
                <b-btn>Login</b-btn>
              </nuxt-link>
            </div>
          </b-card>
        </div>

        <div
          class="comments"
          v-if="comments"
          :class="{ 'comments--dark': $store.state.dark }"
        >
          <div v-for="comment in $store.state.comment.comments">
            <Comment :comment="comment"></Comment>
          </div>
        </div>

        <div class="supporteds" v-if="supported">
          <b-card class="tabs--dark">
            <p class="text-centered">
              Users are able to link supporting content and media to a post.
              This allows others to track the story, stay informed, or see a
              post from another Skroller’s perspective.
            </p>
          </b-card>
          <div
            class="card supported"
            :class="{ 'card--dark supported--dark': $store.state.dark }"
          >
            <div v-if="$store.state.dark" class="supporting-light">Supporting Content</div>
            <div v-if="!$store.state.dark" class="supporting-dark">Supporting Content</div>
            <img
              src="/images/social/1_QIg6vEjZmT5YMVKU5Rxr2A.png"
              class="card-img-top"
            />
            <div class="card-header">
              <div class="row">
                <div class="col-10">
                  <a>
                    <h5 class="card-title m-0">
                      <b>Header</b>
                    </h5>
                  </a>
                </div>
                <div class="col-2 text-right">
                  <span class="menu">
                    <img
                      @click="menuS = !menuS"
                      src="/images/social/icons8-menu-vertical-50-black.png"
                      v-if="!$store.state.dark"
                      alt
                      height="15px"
                    />
                    <img
                      @click="menuS = !menuS"
                      src="/images/social/icons8-menu-vertical-50.png"
                      v-if="$store.state.dark"
                      alt
                      height="15px"
                    />
                    <div class="flag" v-if="menuS">
                      <img
                        src="/images/social/icons8-flag-filled-24.png"
                        class="mb-1 mr-1"
                        height="12px"
                      />Flag Comment
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div class="card-body relat pt-1">
              <div class="row">
                <div class="col-6">
                  <div v-if="$store.state.dark" class="text-white">
                    <img
                      src="/images/social/icons8-up-arrow-24.png"
                      height="20px"
                      class="mb-1"
                    />
                    <b>+15</b>
                  </div>
                  <div v-if="!$store.state.dark" class="text-dark">
                    <img
                      src="/images/social/icons8-up-arrow-24.png"
                      height="20px"
                      class="mb-1"
                    />
                    <b>+15</b>
                  </div>
                </div>
                <div class="col-6">
                  <div v-if="$store.state.dark" class="text-white float-right" @click="shar = !shar">
                    <img
                      src="/images/social/icons8-connect-50-dark.png"
                      class="mb-1"
                      height="16px"
                    />
                    <b>Share</b>
                  </div>
                  <div v-if="!$store.state.dark" class="text-dark float-right" @click="shar = !shar">
                    <img
                      src="/images/social/icons8-connect-51.png"
                      class="mb-1"
                      height="16px"
                    />
                    <b>Share</b>
                  </div>
                </div>
              </div>
              <div v-if="shar" class="social-share-single">
                <div v-if="$store.state.dark" class="float-right">
                  <a 
                    class="mr-1"
                    title="share on facebook"
                    :href="
                      'https://www.facebook.com/sharer/sharer.php?u=http%3A//207.246.95.48:5000/post/' +
                        post.id
                    "
                    target="_blank"
                  >
                    <img src="/images/social/icons8-facebook-48.png" height="30px" />
                  </a>
                  <a
                    class="mr-1"
                    title="share on whatsapp"
                    :href="
                      'https://wa.me/?text=http%3A//207.246.95.48:5000/post/' +
                        post.id
                    "
                    target="_blank"
                  >
                    <img
                      src="/images/social/icons8-whatsapp-100.png"
                      height="30px"
                    />
                  </a>
                  <a
                    class="mr-1"
                    title="share on twitter"
                    :href="
                      'https://twitter.com/intent/tweet?url=http%3A//207.246.95.48:5000/post/' +
                        post.id
                    "
                    target="_blank"
                  >
                    <img
                      src="/images/social/icons8-twitter-16.png"
                      height="22px"
                    />
                  </a>
                  <a
                    class="mr-1"
                    title="share on Pinterest"
                    :href="
                      'http://pinterest.com/pin/create/button/?url=http%3A//207.246.95.48:5000/post/' +
                        post.id
                    "
                    target="_blank"
                  >
                    <img
                      src="/images/social/icons8-pinterest-48.png"
                      height="22px"
                    />
                  </a>
                  <a
                    class="mr-1"
                    title="share on Pinterest"
                    :href="
                      'http://pinterest.com/pin/create/button/?url=http%3A//207.246.95.48:5000/post/' +
                        post.id
                    "
                    target="_blank"
                  >
                    <img src="/images/social/icons8-sms-48.png" height="22px" />
                  </a>
                  <a
                    class="mr-1"
                    title="share on Pinterest"
                    :href="
                      'http://pinterest.com/pin/create/button/?url=http%3A//207.246.95.48:5000/post/' +
                        post.id
                    "
                    target="_blank"
                  >
                    <img
                      src="/images/social/icons8-link-16.png"
                      height="20px"
                    />
                  </a>
                </div>
                <div v-if="!$store.state.dark" class="float-right">
                  <a 
                    class="mr-1"
                    title="share on facebook"
                    :href="
                      'https://www.facebook.com/sharer/sharer.php?u=http%3A//207.246.95.48:5000/post/' +
                        post.id
                    "
                    target="_blank"
                  >
                    <img src="/images/social/icons8-facebook-48-dark.png" height="30px" />
                  </a>
                  <a
                    class="mr-1"
                    title="share on whatsapp"
                    :href="
                      'https://wa.me/?text=http%3A//207.246.95.48:5000/post/' +
                        post.id
                    "
                    target="_blank"
                  >
                    <img
                      src="/images/social/icons8-whatsapp-100-dark.png"
                      height="30px"
                    />
                  </a>
                  <a
                    class="mr-1"
                    title="share on twitter"
                    :href="
                      'https://twitter.com/intent/tweet?url=http%3A//207.246.95.48:5000/post/' +
                        post.id
                    "
                    target="_blank"
                  >
                    <img
                      src="/images/social/icons8-twitter-16-dark.png"
                      height="22px"
                    />
                  </a>
                  <a
                    class="mr-1"
                    title="share on Pinterest"
                    :href="
                      'http://pinterest.com/pin/create/button/?url=http%3A//207.246.95.48:5000/post/' +
                        post.id
                    "
                    target="_blank"
                  >
                    <img
                      src="/images/social/icons8-pinterest-48-dark.png"
                      height="22px"
                    />
                  </a>
                  <a
                    class="mr-1"
                    title="share on Pinterest"
                    :href="
                      'http://pinterest.com/pin/create/button/?url=http%3A//207.246.95.48:5000/post/' +
                        post.id
                    "
                    target="_blank"
                  >
                    <img src="/images/social/icons8-sms-48-dark.png" height="22px" />
                  </a>
                  <a
                    class="mr-1"
                    title="share on Pinterest"
                    :href="
                      'http://pinterest.com/pin/create/button/?url=http%3A//207.246.95.48:5000/post/' +
                        post.id
                    "
                    target="_blank"
                  >
                    <img
                      src="/images/social/icons8-link-16-dark.png"
                      height="20px"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4" :class="{ ' p-0': window.width < 760 }">
        <!-- <div v-if="window.width > 770">
          <div class="row m-1">
            <div class="col-lg-6 p-1">
              <b-button variant="primary" squared block @click="onPrevPost">
                <img class="mr-2" src="/images/social/icons8-prev-100.png" height="25px" />Prev Post
              </b-button>
            </div>
            <div class="col-lg-6 p-1">
              <b-button variant="primary" squared block @click="onNextPost">
                Next Post
                <img class="ml-2" src="/images/social/icons8-more-than-80.png" height="25px" />
              </b-button>
            </div>
          </div>
        </div> -->

        <div v-for="item of $store.state.posts.related" :key="item._id">
          <Post @selected="onRelatedSelected" :item="item" class="mb-3" />
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="row">
        <div class="col-6 ml-auto">
          <nuxt-link to="/" @click="$router.back()" exact>
            <h5>Back to feed?</h5>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
import Post from "~/components/Post.vue";
import Comment from "~/components/Comment.vue";

export default {
  name: "post_id",
  layout: "default",
  scrollToTop: true,
  components: {
    Navbar,
    Post,
    Comment
  },
  async fetch({ store, params }) {
    let post = store.dispatch("posts/selectPost", params.id);
    let related = store.dispatch("posts/getRelated", params.id);
    let comments = store.dispatch("comment/getComments", params.id);
    return {
      selectposts: await post,
      getrelated: await related,
      getcomments: await comments
    };
  },
  head() {
    let content = this.$store.state.posts.selected;
    let imageData = [
      {
        hid: "og:image",
        property: "og:image",
        content: content.media_location
      },
      { hid: "og:image:type", property: "og:image:type", content: "image/gif" },
      {
        hid: "og:image:secure_url",
        property: "og:image:secure_url",
        content: content.media_location
      }
    ];
    let videoData = [
      {
        hid: "og:video",
        property: "og:video",
        content: content.media_location
      },
      { hid: "og:video:type", property: "og:video:type", content: "video/mp4" },
      {
        hid: "og:video",
        property: "og:video",
        content: content.media_location
      },
      { hid: "og:video:type", property: "og:video:type", content: "text/html" },
      {
        hid: "og:video:secure_url",
        property: "og:video:secure_url",
        content: content.media_location
      }
    ];
    return {
      title: content.title,
      meta: [
        { hid: "og:title", property: "og:title", content: content.title },
        {
          hid: "og:description",
          property: "og:description",
          content: "Skrollo hottest content"
        },
        ...(content.content_type.includes("image")
          ? imageData
          : content.content_type.includes("video")
          ? videoData
          : [])
      ]
    };
  },
  computed: {
    post() {
      return this.$store.state.posts.selected;
    },
    sources() {
      return this.$store.state.posts.sources;
    },    
    loading() {
      if (this.$store.state.posts.selected === null) {
        return true;
      } else {
        return false;
      }
    },
    isAuthenticated() {
      return this.authenticated;
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      url: null,
      image: null,
      video: null,
      fallback: null,
      shar: false,
      share: false,
      comments: true,
      supported: false,
      menuC: false,
      menuS: false,
      authenticated: true,
      maxScrollHeight: 0,
      window: {
        width: 0
      },
      ques: false,
      top: 0,
      new_comment: ""
    };
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
    window.removeEventListener("resize", this.getWindowHeight);
  },
  mounted() {
    //Current Url
    this.url = window.location.href;

    window.scrollTo(0, 0);

    this.$nextTick(function() {
      window.addEventListener("resize", this.onResize);
      //Init
      this.onResize();
    });
    this.top = document.querySelector("nav.navbar").scrollHeight;
    if (!this.$store.state.loggedIn) {
      this.authenticated = false;
    } else {
      this.authenticated = true;
    }
  },
  methods: {
    onLike() {
      if (this.$store.state.loggedIn) {
        if (this.post.user_liked) {
          // this.item.user_liked = false;
          this.$store.commit("posts/decrementPost", this.post);
        } else {
          this.$store.commit("posts/incrementPost", this.post);
        }
        this.$store.commit("posts/likePost", this.post);
        this.$store.dispatch("posts/likePost", this.post);
      }
    },
    onResize(event) {
      this.window.width = document.documentElement.clientWidth;
      this.pageHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );
      this.maxScrollHeight =
        this.pageHeight - document.getElementById("navbar").clientHeight;
    },
    tabsS() {
      this.comments = false;
      this.supported = true;
    },
    tabsC() {
      this.comments = true;
      this.supported = false;
    },
    getWindowWidth() {
      this.window.width = document.documentElement.clientWidth;
    },
    onPostSelected(post) {
      window.location(post.location, "_blank");
      // location.href = 'http://github.com'
      // $store.state.posts.selected.location
    },
    onRelatedSelected(post) {
      this.$router.replace({
        path: "/post/" + post.id
      });
    },
    onNextPost() {
      this.$router.replace({
        path: "/post/" + String(parseInt(this.id) + 1)
      });
    },
    onPrevPost() {
      this.$router.replace({
        path: "/post/" + String(parseInt(this.id) - 1)
      });
    },
    onAddComment() {
      let comment = this.new_comment;
      this.$store.commit("comment/appendComment", {
        author: this.$store.state.user,
        content: comment,
        created: new Date()
      });
      this.$store
        .dispatch("comment/addComment", {
          post: this.id,
          comment: { content: comment }
        })
        .then(res => {
          this.new_comment = "";
          this.$store.commit("comment/replaceNew", res);
        });
    },
    toggleShare () {
      this.share = !this.share
    }
  }
};
</script>

<style lang="scss">
// #post-wrapper{
//   position: fixed; /* Stay in place */
//   z-index: 1; /* Sit on top */
//   left: 0;
//   top: 0;
//   width: 100%; /* Full width */
//   height: 100%; /* Full height */
//   overflow: auto; /* Enable scroll if needed */
//   background: #292929;
// }

.source {
  font-weight: 600;
  font-size: 20px;
  font-style: italic;
}

.source--dark {
  color: rgba(255, 255, 255, 0.8);
}

.parent-back {
  background-color: transparent !important;
}

.sty {
  padding: 10px 25px !important;
  margin: 10px -15px !important;
}

.social-share-single {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px;
  z-index: 99;
  width: 100%;
  right: 0px;
}

.tabs {
  background-color: #fff;
  position: relative;
  padding: 2px;

  .ques {
    position: relative;
    top: -109px;
    right: 5px;

    img {
      border-radius: 50%;
      padding: 0 3px;
      cursor: pointer;
      z-index: 99;
      position: absolute;
      top: 2px;
      right: 0;
      height: 20px;
    }

    .explanation {
      background-color: #dee2e6;
      position: absolute;
      background-color: #dee2e6;
      position: absolute;
      top: -1px;
      z-index: 9;
      right: -1px;
      width: 280px;
      height: 105px;
      border-radius: 2px;
      padding: 10px;
    }
  }

  .upload {
    position: absolute;
    cursor: pointer;
    top: 120px;
    right: 65px;

    img {
      height: 35px;
    }
  }

  .title {
    font-weight: 600;
    cursor: pointer;
  }

  .title.active {
    border-bottom: 2px solid #21a6ff;
  }

  .send {
    position: absolute;
    top: 120px;
    right: 8px;
    height: 35px;
    cursor: pointer;
  }

  textarea {
    width: 100%;
    margin-bottom: -5px;
    background-color: #ececec;
    border: 0;
    border-radius: 3px;
    padding: 10px;
  }

  textarea:focus {
    outline-offset: 0px !important;
    outline: 0px !important;
  }
}

.tabs--dark {
  background-color: #292929;
  color: #949494;

  textarea {
    color: #fff;
    background-color: #000;
  }
}

.comments {
}

.comments--dark {
  .comment {
    color: #fff;
  }

.text-white{
  color: #ffffff;
  cursor: pointer;
  font-size: 15px;
  transition: 1s;
}
.text-dark{
  color: #000000;
  cursor: pointer;
  font-size: 15px;
  transition: 1s;
}

  .menu {
    .flag {
      background-color: #000 !important;
    }
  }
}

.supporteds {
  .supported {
    box-shadow: 0 0 0 0;
    margin: 20px 0;
    position: relative;

    .supporting-light {
      position: absolute;
      color: #fff;
      background-color: #ffffff;
      width: 100%;
      padding: 5px 15px;
      border-radius: 3px 3px 0 0;
      font-size: 12px;
    }
    .supporting-dark {
      position: absolute;
      color: #fff;
      background-color: #1d1d1d;
      width: 100%;
      padding: 5px 15px;
      border-radius: 3px 3px 0 0;
      font-size: 12px;
    }

    .menu {
      position: relative;

      img {
        z-index: 999;
        position: relative;
        cursor: pointer;
      }

      .flag {
        background-color: #ececec;
        position: absolute;
        font-size: 12px;
        padding: 10px;
        top: 5px;
        right: -4px;
        width: 120px;
        color: #949494;
      }
    }
  }

  .supported--dark {
    .menu {
      .flag {
        background-color: #000;
      }
    }
  }
}
</style>