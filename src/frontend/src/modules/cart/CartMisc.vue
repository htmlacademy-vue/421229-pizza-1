<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        class="additional-list__item sheet"
        v-for="miscItem in misc"
        :key="miscItem.id"
      >
        <p class="additional-list__description">
          <img
            :src="miscItem.image"
            width="39"
            height="60"
            :alt="miscItem.name"
          />
          <span>{{ miscItem.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <div class="counter additional-list__counter">
            <button
              type="button"
              class="counter__button counter__button--minus"
              @click="addMisc({ entity: 'misc', value: miscItem, term: -1 })"
            >
              <span class="visually-hidden">Меньше</span>
            </button>
            <input
              type="text"
              name="counter"
              class="counter__input"
              :value="miscItem.quantity"
            />
            <button
              type="button"
              class="
                counter__button counter__button--plus counter__button--orange
              "
              @click="addMisc({ entity: 'misc', value: miscItem, term: 1 })"
            >
              <span class="visually-hidden">Больше</span>
            </button>
          </div>

          <div class="additional-list__price">
            <b>{{ miscItem.price * miscItem.quantity }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { UPDATE_COUNT } from "../../store/mutation-types";

export default {
  name: "CartMisc",
  computed: mapState(["misc"]),
  methods: {
    ...mapMutations({ addMisc: UPDATE_COUNT }),
  },
};
</script>
