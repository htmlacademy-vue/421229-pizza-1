export default {
  methods: {
    async $logout() {
      await this.$store.dispatch("User/logout");
      await this.$router.push("/login");
    },
  },
};
