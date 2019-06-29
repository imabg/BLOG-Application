<template>
  <div class="container">
    <ul class="nav justify-content-end">
      <div v-if="notLogin">
        <li class="nav-item">
          <router-link to="/login" class="mr-4">Login</router-link>
          <router-link to="/register">Register</router-link>
        </li>
      </div>
      <div v-else>
        <li class="nav-item">
          <router-link to="/dashboard" class="mr-4">Dashboard</router-link>
          <a href="#" @click="logout" class="text-danger">Sign-Out</a>
        </li>
      </div>
    </ul>
    <hr />
    <div>
      <p class="display-4">Welcome to Blog Application</p>Created By:
      <a href="https://abgoswami.netlify.com" target="_blank" class="lead">Abhay Goswami</a>
    </div>
    <br />
    <div class="conatiner">
      <Post :posts="posts" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Post from "../components/post";
export default {
  name: "home",
  components: {
    Post
  },
  data() {
    return {
      posts: "",
      notLogin: true
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/api/articles/all")
      .then(res => {
        this.posts = res.data;
      })
      .catch(() => {});
  },
  created() {
    if (localStorage.getItem("token") != null) {
      this.notLogin = false;
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
          this.$router.go();
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
</style>

