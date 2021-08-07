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
            @change="$emit('setActiveDough', dough)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderDoughSelector",
  props: {
    doughTypes: {
      type: Array,
      required: true,
    },
    active: {
      type: Object,
      required: false,
    },
  },
};
</script>
