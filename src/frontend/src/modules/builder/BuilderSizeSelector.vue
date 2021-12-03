<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in sizes"
          class="diameter__input"
          :class="`diameter__input--${size.type}`"
          :key="size.type"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.type"
            class="visually-hidden"
            :checked="size.name === active.name"
            @change="updateEntity({ entity: 'sizes', value: size })"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { UPDATE_ENTITY } from "../../store/mutation-types";

export default {
  name: "BuilderSizeSelector",
  computed: {
    ...mapState({
      sizes: (state) => state["Builder"].sizes.list,
      active: (state) => state["Builder"].sizes.active,
    }),
  },
  methods: {
    ...mapMutations("Builder", {
      updateEntity: UPDATE_ENTITY,
    }),
  },
};
</script>
