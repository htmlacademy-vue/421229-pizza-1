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
            :checked="dough.id === activeDough.id"
            @change="updateDough(dough.id)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "BuilderDoughSelector",
  computed: {
    ...mapState({ doughTypes: (state) => state.dough.list }),
    ...mapGetters("Builder", ["activeDough"]),
  },
  methods: mapActions("Builder", ["updateDough"]),
};
</script>
