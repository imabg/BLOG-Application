<template>
  <div class="conatiner-fluid mt-4">
    <div class="fixed-left-top">
      <p class="display-4">Hello, {{user.name | capitalize }}</p>
    </div>
    <hr />
    <div class="conatiner" v-if="found">
      <Post :posts="posts" :home="false" />
    </div>
    <div class="container" v-else>
      <p class="display-6">No Posts yet.</p>
    </div>
    <div class="fixed-right-bottom">
      <router-link to="/create" class="btn btn-outline-info">
        Add Post
        <i class="fa fa-plus"></i>
      </router-link>
      <router-link to="/" class="ml-4">Back to HOME</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Post from "./post";
export default {
  name: "DashboardPage",
  components: {
    Post
  },
  data() {
    return {
      user: {},
      posts: {},
      found: false,
      token: false
    };
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  methods: {
    fetchArticles() {
      let token = localStorage.getItem("token");
      axios
        .get("http://localhost:5000/api/articles", {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(res => {
          this.posts = res.data;
          this.found = true;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    console.log(this.$router);
    let token = localStorage.getItem("token");
    // User
    axios
      .get("http://localhost:5000/api/user", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        this.user = res.data;
      })
      .catch(e => {
        console.log(e);
      });
    // Article
    this.fetchArticles();
  }
};
</script>

<style>
</style>
