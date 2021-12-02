<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="dough in doughTypes"
          :key="dough.name"
          class="dough__input"
          :class="`dough__input--${dough.type}`"
        >
          <input
            type="radio"
            name="dough"
            :value="dough.type"
            class="visually-hidden"
            :checked="dough.name === active.name"
            @change="updateEntity({ entity: 'doughTypes', value: dough })"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { UPDATE_ENTITY } from "../../store/mutation-types";

export default {
  name: "BuilderDoughSelector",
  computed: {
    ...mapState({
      doughTypes: (state) => state["Builder"].doughTypes.list,
      active: (state) => state["Builder"].doughTypes.active,
    }),
  },
  methods: {
    ...mapMutations("Builder", {
      updateEntity: UPDATE_ENTITY,
    }),
  },
};
</script>
