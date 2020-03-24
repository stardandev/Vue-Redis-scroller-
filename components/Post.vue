<template>
    <div>
        <b-overlay :id="item.id" :show="!isReady" variant="dark" opacity="1">
            <b-card bg-variant="dark" img-alt="Image" no-body img-top class="text-light">
                <template v-slot:header>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="text-primary">
                                <!-- <i style="font-size:20px" class="float-left fab text-yellow" v-bind:class="['fa-'+item.source+'-square']" ></i> -->
                                <img class="float-left" :src="'/images/social/' + item.platform + '-icon.png'"
                                    height="20px" alt />
                            </div>
                            <div class="float-right">

                                <div class="text-white" v-if="$store.state.dark" @click="onLoad">
                                    <img src="/images/social/icons8-connect-51.png" class="mb-1" height="16px" />
                                    Share
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <div v-view="onView" v-if="item.content_type.includes('video')">
                    <video v-show="isReady" ref="media" width="100%" controls autoplay :src="item.media_location" loop
                        :muted="isMuted" @canplay="onLoad" preload="auto"></video>
                </div>

                <img v-view="onView" ref="media" :src="item.media_location" class="card-img-top"
                    v-if="item.content_type.includes('image')" :alt="item.title">

                <div v-view="onView"
                    v-if="item.content_type.includes('youtube') || item.media_location.includes('youtube.com')">
                    <LazyYoutubeVideo v-show="isReady" thumbnailListeners="{'jpg', onLoad}" :url="item.media_location"
                        autoplay />
                </div>

                <b-card-body>
                    <nuxt-link :to="'post/' + item.id" no-prefetch exact>
                        <b-card-title>{{item.title}}</b-card-title>
                    </nuxt-link>
                </b-card-body>

                <template v-slot:footer>
                    <b-row>
                        <b-col sm=12>
                            <h4 class="mb-1 text-white float-left">
                                <i class="far fa-comment-alt"></i>
                                <b>{{ item.comment_count }}</b>
                            </h4>
                            <h4 @click="onLike" class="text-white float-right mb-1">
                                <b>{{ nFormatter(item.score + item.like_count, 2) }}</b>
                                <i v-if="!item.user_liked" class="far fa-arrow-alt-circle-up "></i>
                                <i v-if="item.user_liked" class="fas fa-arrow-alt-circle-up"></i>
                            </h4>
                        </b-col>

                    </b-row>
                </template v-slot:footer>

            </b-card>
        </b-overlay>
    </div>
</template>

<script>
    import Vue from "vue"
    import Vue2TouchEvents from "vue2-touch-events";
    import VueClipboard from "vue-clipboard2";
    Vue.use(Vue2TouchEvents);
    Vue.use(VueClipboard);


    export default {
        name: "Post",
        props: {
            item: {},
        },
        components: {},
        data() {
            return {
                isMuted: true,
                isReady: false
            };
        },
        mounted() {
            //this.isReady = this.$refs.media.complete;
            if (this.item.content_type.includes('youtube') || this.item.media_location.includes('youtube.com')) {
                this.onLoad()
            }
            if (this.item.content_type.includes('image')) {
                this.$refs.media.onload = this.onLoad
            } else if (this.item.content_type == "") {
                if (this.item.media_location.includes('.png', '.gif', '.jpg')) {
                    this.item.content_type = "image"
                    this.$nextTick(() => {
                        this.$refs.media.onload = this.onLoad
                    })

                }
            }
        },
        methods: {
            onView(e) {
                this.$emit('view', e)
            },
            onLoad() {
                this.isReady = true;
                this.$emit("load");
            },
            nFormatter(num, digits) {
                var si = [
                    { value: 1, symbol: "" },
                    { value: 1e3, symbol: "k" },
                    { value: 1e6, symbol: "M" },
                    { value: 1e9, symbol: "G" },
                    { value: 1e12, symbol: "T" },
                    { value: 1e15, symbol: "P" },
                    { value: 1e18, symbol: "E" }
                ];
                var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
                var i;
                for (i = si.length - 1; i > 0; i--) {
                    if (num >= si[i].value) {
                        break;
                    }
                }
                return (
                    (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol
                );
            },
            height() {
                return this.$el.getBoundingClientRect()
            },
            copyLink() {
                this.$copyText("https://skrollo.com/post/" + this.item.id);
                this.$bvToast.toast("https://skrollo.com/post/" + this.item.id, {
                    title: "Link Copied! Share around :)",
                    autoHideDelay: 5000,
                    appendToast: true,
                    variant: "success",
                });
            },
            onLike() {
                this.$emit("liked", this.item);
                if (this.$store.state.loggedIn) {
                    this.$axios.setToken(this.$store.state.token, this.$store.state.token_type);
                    if (!this.item.user_liked) {
                        this.item.user_liked = true;
                        this.item.like_count += 1
                        return this.$axios.$post("/api/posts/" + this.item.id + "/like/");
                    } else {
                        this.item.user_liked = false;
                        this.item.like_count -= 1
                        return this.$axios.$delete("/api/posts/" + this.item.id + "/like/");
                    }
                }
            }
        },
        computed: {

        },
        created() { },
        destroyed() { }
    };
</script>

<style lang="scss">
    .card {
        a {
            color: inherit !important;
            text-decoration: none !important;
            transition: 1s;
        }

        a:hover {
            color: #f7c22d !important;
        }
    }

    .card-title {
        font-family: Roboto, Arial, sans-serif !important;
        margin-bottom: 0.1rem;
        font-size: 1.4rem;
    }

    .card-body {
        padding: .25rem;
        padding-left: .75rem;
    }

    .card-footer {
        border-top: none;
        background-color: inherit;
    }
</style>