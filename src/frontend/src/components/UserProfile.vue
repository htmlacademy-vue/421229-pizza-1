<template>
  <div class="header__user">
    <router-link to="/profile">
      <picture>
        <source
          type="image/webp"
          :srcset="`
            ${avatar} 1x,
            ${avatar} 2x
          `"
        />
        <img
          :src="avatar"
          :alt="name"
          width="32"
          height="32"
        />
      </picture>
      <span>{{ name }}</span>
    </router-link>
    <a
      href="#"
      class="header__logout"
      @click.prevent="$logout"
    >
      <span>Выйти</span>
    </a>
  </div>
</template>
<script>
import logout from "@/common/mixins/logout";
import { mapState } from "vuex";

export default {
  name: "UserProfile",
  mixins: [logout],
  computed: {
    ...mapState("User", {
      name: (state) => state.user?.name,
      avatar: (state) => state.user?.avatar,
    }),
  },
};
</script>
