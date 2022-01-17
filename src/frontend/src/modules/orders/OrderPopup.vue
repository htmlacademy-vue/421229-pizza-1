<template>
  <div class="popup">
    <a
      class="close"
      @click.prevent="closePopup"
    >
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a
        class="button"
        @click.prevent="closePopup"
      >
        Отлично, я жду!
      </a>
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
<style lang="scss">
@import "~@/assets/scss/mixins/mixins";
@import "~@/assets/scss/layout/popup";
@import "~@/assets/scss/blocks/close";
</style>
