<template >
  <div class="container-fluid mt-4">
    <p class="display-4 text-center heading">{{title}}</p>
    <hr />
    <img :src="image" class="text-center" />
    <p class="text-left ml-4 para">{{description}}</p>
    <!-- <div>
      <router-link to="/" class="btn btn-outline-primary">Back to Home</router-link>
    </div>-->
  </div>
</template>

<script>
import axios from "axios";
import VueNotifications from "vue-notifications";
export default {
  data() {
    return {
      id: "",
      title: "",
      description: "",
      createdAt: "",
      updatedAt: "",
      image: ""
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    const id = this.$route.params.id;
    axios
      .get(`http://localhost:5000/api/article/${id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        this.id = res.data._id;
        this.title = res.data.title;
        this.description = res.data.description;
        this.createdAt = res.data.createdAt;
        this.updatedAt = res.data.updatedAt;
        this.image = res.data.image;
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    deletePost() {
      const token = localStorage.getItem("token");
      axios
        .delete(`http://localhost:5000/api/article/${this.id}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(() => {
          this.showSuccessMsg({ message: "Post succesfully Deleted." });
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

<style scoped>
.heading {
  padding: 15px;
}
.para {
  margin: auto;
  padding: 15px;
}
</style>
