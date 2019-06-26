<template>
  <div class="container">
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <router-link to="/login" class="mr-4">Login</router-link>
        <router-link to="/register">Register</router-link>
      </li>
    </ul>
    <hr>
    <div>
      <p class="display-4">Welcome to Blog Application</p>Created By:
      <a href="https://abgoswami.netlify.com" target="_blank" class="lead">Abhay Goswami</a>
      <p class="lead text-center">Please, Login/Register for Editing and deleting the Post.</p>
    </div>
    <br>
    <div class="conatiner">
      <Post :posts="posts"/>
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
      posts: ""
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/api/articles/all")
      .then(res => {
        this.posts = res.data;
      })
      .catch(e => {});
  }
};
</script>

<style scoped>
</style>

