<template>
  <div class="popup">
    <a @click="closePopup" class="close">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a @click="closePopup" class="button">Отлично, я жду!</a>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "OrderPopup",
  computed: {
    ...mapState("User", ["user"]),
  },
  methods: {
    async closePopup() {
      this.$emit("closePopup");
      setTimeout(() => {
        if (this.user) {
          this.$router.push("/orders");
        } else {
          this.$router.push("/");
        }
      }, 400);
    },
  },
};
</script>
