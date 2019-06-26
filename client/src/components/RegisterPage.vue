<template>
  <div class="conatiner-fluid mt-4">
    <form v-on:submit="register">
      <div class="form-group">
        <label for="exampleInputEmail1">Full Name</label>
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter Full Name"
          v-model="user.name"
          required
        >
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="user.email"
          required
        >
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="user.password"
          required
        >
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <router-link to="/login" class="btn btn-link">Login</router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import VueNotifications from "vue-notifications";

export default {
  name: "register",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      },
      error: false
    };
  },
  methods: {
    register(e) {
      e.preventDefault();
      axios
        .post("http://localhost:5000/api/user", this.user)
        .then(res => {
          this.showSuccessMsg({ message: "Register Succesfully!" });
          this.$router.push("/");
        })
        .catch(e => {
          this.showErrorMsg({ message: "Email already exits." });
          this.user.email = "";
          this.user.password = "";
        });
    }
  },
  notifications: {
    showSuccessMsg: {
      type: VueNotifications.types.success,
      title: "Blog Application",
      message: ""
    },
    showErrorMsg: {
      type: VueNotifications.types.error,
      title: "Wow-wow",
      message: "Email already exits."
    }
  }
};
</script>

