<template>
  <section class="footer">
    <div class="footer__more">
      <router-link
        to="/"
        class="button button--border button--arrow"
      >
        Хочу еще одну
      </router-link>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ totalSum }} ₽</b>
    </div>

    <div class="footer__submit">
      <button
        type="submit"
        class="button"
        :disabled="submitDisabled"
      >
        Оформить заказ
      </button>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "CartFooter",
  computed: {
    ...mapGetters("Cart", ["totalSum"]),
    submitDisabled() {
      return this.totalSum === 0;
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/blocks/footer";
@import "~@/assets/scss/blocks/button";
</style>
