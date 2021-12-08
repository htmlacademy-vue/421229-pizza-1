<template>
  <div class="user">
    <picture>
      <source
        type="image/webp"
        :srcset="`
          ${avatar} 1x,
          ${avatar} 2x
        `"
      />
      <img :src="avatar" :alt="name" width="72" height="72" />
    </picture>
    <div class="user__name">
      <span>{{ name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ phone }}</span>
    </p>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "UserData",
  computed: {
    ...mapState("User", {
      name: (state) => state.user?.name,
      avatar: (state) => state.user?.avatar,
      phone: (state) => state.phone,
    }),
  },
};
</script>
