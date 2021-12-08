<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="login">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            placeholder="example@mail.ru"
            ref="email"
            required
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            ref="password"
            type="password"
            name="pass"
            placeholder="***********"
            required
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "Login",
  mounted() {
    this.$refs.email.focus();
  },
  methods: {
    async login() {
      if (
        !this.$refs.email.checkValidity() ||
        !this.$refs.password.checkValidity()
      ) {
        return;
      }
      await this.$store.dispatch("User/login", {
        email: this.$refs.email.value,
        password: this.$refs.password.value,
      });
      await this.$router.push("/");
    },
  },
};
</script>
