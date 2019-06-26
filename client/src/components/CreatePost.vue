<template>
  <div class="conatiner-fluid mt-4">
    <form v-on:submit="createPost">
      <div class="form-group">
        <label for="exampleInputEmail1">Title</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter Title"
          required
          v-model="article.title"
        >
      </div>
      <div class="form-group">
        <label for>Add Image link</label>
        <input type="text" v-model="article.image">
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Description</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          required
          v-model="article.description"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary mr-4">Submit</button>
      <router-link to="dashboard" class="btn btn-outline-primary">Back</router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import VueNotifications from "vue-notifications";
export default {
  name: "createPost",
  data() {
    return {
      article: {
        title: "",
        description: "",
        image: ""
      }
    };
  },
  methods: {
    createPost(e) {
      e.preventDefault();
      const token = localStorage.getItem("token");
      axios
        .post("http://localhost:5000/api/article", this.article, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(res => {
          this.showSuccessMsg({ message: "Post Succesfully Created." });
          this.$router.push("/dashboard");
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  notifications: {
    showSuccessMsg: {
      type: VueNotifications.types.success,
      title: "Blog Application",
      message: ""
    }
  }
};
</script>

<style>
</style>
