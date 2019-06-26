<template>
  <div class="conatiner">
    <div class="row">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Updated At</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post._id">
            <td>{{ post.id }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.updatedAt }}</td>
            <td class="text-right">
              <!-- <router-link to:></router-link> -->
              <router-link :to="{name:'viewPost', params: {id: post._id}}">View</router-link>
              <span v-if="authToken">
                |
                <router-link :to="{name:'editPost', params: {id: post._id}}">Edit</router-link>|
                <a href="#" @click.prevent="deletePost(post._id)">Delete</a>
              </span>
              <span v-else></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueNotifications from "vue-notifications";
export default {
  props: {
    posts: {
      required: true
    }
  },
  data() {
    return {
      authToken: false
    };
  },
  mounted() {
    if (localStorage.getItem("token") !== null) {
      this.authToken = true;
    }
  },
  methods: {
    deletePost(id) {
      const token = localStorage.getItem("token");
      axios
        .delete(`http://localhost:5000/api/article/${id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(() => {
          console.log(this.posts);
          this.showSuccessMsg({ message: "Post succesfully Deleted." });
          this.$router.go();
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
