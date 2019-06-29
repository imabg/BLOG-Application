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
      <button type="submit" class="btn btn-outline-primary mr-4">Save</button>
      <router-link to="/dashboard" class="btn btn-outline-danger">Exit</router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      article: {
        title: "",
        description: "",
        image: ""
      },
      id: ""
    };
  },
  mounted() {
    const id = this.$route.params.id;
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/api/article/${id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        this.id = res.data._id;
        this.article.title = res.data.title;
        this.article.description = res.data.description;
        this.article.image = res.data.image;
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    createPost(e) {
      e.preventDefault();
      const id = this.$route.params.id;
      const token = localStorage.getItem("token");
      axios
        .patch(`http://localhost:5000/api/article/${id}`, this.article, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(res => {
          console.log(res);
          this.$router.push(`/dashboard`);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style>
</style>
