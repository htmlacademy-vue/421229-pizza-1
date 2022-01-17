<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in sizes"
          :key="size.id"
          class="diameter__input"
          :class="`diameter__input--${size.type}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.type"
            class="visually-hidden"
            :checked="size.id === activeSize.id"
            @change="updateSize(size.id)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "BuilderSizeSelector",
  computed: {
    ...mapState({ sizes: (state) => state.sizes.list }),
    ...mapGetters("Builder", ["activeSize"]),
  },

  methods: { ...mapActions("Builder", ["updateSize"]) },
};
</script>
<style lang="scss">
@import "~@/assets/scss/mixins/mixins";
@import "~@/assets/scss/blocks/diameter";
</style>
