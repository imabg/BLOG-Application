<template>
  <div class="conatiner-fluid mt-4">
    <form v-on:submit="login">
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
        />
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
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <router-link to="/register" class="btn btn-link">Register</router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import VueNotifications from "vue-notifications";

export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      axios
        .post("http://localhost:5000/api/user/login", this.user)
        .then(res => {
          localStorage.setItem("token", res.data.token);
          this.$router.push("/");
        })
        .catch(() => {
          this.showErrorMsg({ message: "Email/Password is NOT correct" });
          this.user.email = "";
          this.user.password = "";
        });
    }
  },
  notifications: {
    showErrorMsg: {
      type: VueNotifications.types.error,
      title: "Wow-wow",
      message: ""
    }
  }
};
</script>
