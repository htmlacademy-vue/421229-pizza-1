<template>
  <section class="footer">
    <div class="footer__more">
      <router-link to="/" class="button button--border button--arrow"
        >Хочу еще одну</router-link
      >
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ totalSum }} ₽</b>
    </div>

    <div class="footer__submit">
      <router-link to="/order_popup">
        <button type="submit" class="button">Оформить заказ</button>
      </router-link>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "CartFooter",
  computed: mapGetters("Cart", ["totalSum"]),
};
</script>
