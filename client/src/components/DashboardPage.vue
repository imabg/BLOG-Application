<template>
  <div class="conatiner-fluid mt-4">
    <div class="fixed-left-top">
      <p class="display-4">Hello, {{user.name | capitalize }}</p>
      <a class="btn btn-outline-danger" @click="logout">
        <i class="fa fa-sign-out">Sign out</i>
      </a>
    </div>
    <hr>
    <div class="conatiner" v-if="found">
      <Post :posts="posts"/>
    </div>
    <div class="container" v-else>
      <p class="display-6">No Posts yet.</p>
    </div>
    <div class="fixed-right-bottom">
      <router-link to="/create" class="btn btn-outline-info">
        Add Post
        <i class="fa fa-plus"></i>
      </router-link>
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
    logout() {
      let token = localStorage.getItem("token");
      axios
        .delete("http://localhost:5000/api/user/logout", {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(() => {
          localStorage.removeItem("token");
          this.$router.push("/");
        })
        .catch(e => {
          console.log(e);
        });
    },
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
