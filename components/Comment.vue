<template>
  <b-card class="comment" >
    <template v-slot:header>
      <span class="user float-left">
        {{ comment.author.username }} -
        {{ new Date(comment.created) | moment("from", "now") }}
      </span>
        <b-dropdown style="z-index:99999" class="float-right" size="lg"  variant="link" toggle-class="text-decoration-none" no-caret right v-if="$store.state.loggedIn">
          <template v-slot:button-content>
            <i class="fas fa-ellipsis-h"></i>
          </template>
          <b-dropdown-item href="#">Flag</b-dropdown-item>
          <b-dropdown-item @click="onDelete" v-if="$store.state.user.id == comment.author.id" href="#">Delete</b-dropdown-item>          
        </b-dropdown>      
    </template>
    <b-card-text>{{ comment.content }}</b-card-text>    
    
  </b-card>

</template>

<script>
  export default {
    props: {
      comment: {}
    },
    data() {
      return {
        menuC: false,
        created: null
      };
    },
    computed: {},
    components: {},
    created() { },
    methods: {
      onDelete(){
        this.$store.dispatch("comment/deleteComment", this.comment.id)
      }
    }
  };
</script>

<style lang="scss">
  .comment {
    margin: 20px 5px;
    background-color: #272727 !important;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    .card-header{
      background-color: #292929 !important;
    }

    .user {
      color: #949494;
      font-size: 12px;
    }

    .right-reply {
      float: right !important;
      display: flex;

      .reply {
        color: #949494;
        font-size: 15px;
        margin-right: 20px;
      }
    }

    a {
      text-decoration: none;
    }

  }
</style>