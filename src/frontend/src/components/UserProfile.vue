<template>
  <div class="header__user">
    <router-link to="/profile">
      <picture>
        <source
          type="image/webp"
          srcset="
            @/assets/img/users/user5.webp    1x,
            @/assets/img/users/user5@2x.webp 2x
          "
        />
        <img
          src="img/users/user5.jpg"
          srcset="@/assets/img/users/user5@2x.jpg"
          alt="Василий Ложкин"
          width="32"
          height="32"
        />
      </picture>
      <span>Василий Ложкин</span>
    </router-link>
    <a href="#" @click.prevent="$logout" class="header__logout">
      <span>Выйти</span>
    </a>
  </div>
</template>
<script>
import logout from "@/common/mixins/logout";

export default {
  name: "UserProfile",
  mixins: [logout],
};
</script>
