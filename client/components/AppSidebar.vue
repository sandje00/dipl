<template>
  <div class="flex-v align-items-center sidebar">
    <app-logo></app-logo>
    <nav class="flex-v align-items-center mt-xl">
      <router-link
        :to="{ name: 'overview' }"
        :class="{ 'active': pathName === 'overview' }"
        class="navlink"
      >
        <div class="flex-v align-items-center pa-m">
          <icon-home></icon-home>
          <span>Overview</span>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'projects' }"
        :class="{ 'active': pathName === 'projects' }"
        class="navlink"
      >
        <div class="flex-v align-items-center pa-m">
          <icon-projects></icon-projects>
          <span>Projects</span>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'boards' }"
        :class="{ 'active': pathName === 'boards' }"
        class="navlink"
      >
        <div class="flex-v align-items-center pa-m">
          <icon-boards></icon-boards>
          <span>Boards</span>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'docs' }"
        :class="{ 'active': pathName === 'docs' }"
        class="navlink"
      >
        <div class="flex-v align-items-center pa-m">
          <icon-docs></icon-docs>
          <span>Docs</span>
        </div>
      </router-link>
    </nav>
  </div>
</template>

<script>
import AppLogo from './common/Logo';
import { computed } from 'vue';
import IconBoards from './icons/IconBoards';
import IconDocs from './icons/IconDocs';
import IconHome from './icons/IconHome';
import IconProjects from './icons/IconProjects';
import { useRoute } from 'vue-router';

export default {
  name: 'app-sidebar',
  setup() {
    const pathName = computed(() => useRoute().name);

    return { pathName };
  },
  components: {
    AppLogo,
    IconBoards,
    IconDocs,
    IconHome,
    IconProjects
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  width: var(--measure-sidebar-width);
  z-index: var(--z-sidebar);
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--color-background-primary);
  border-right: 1px solid var(--color-border);
  overflow-x: hidden;

  .navlink {
    color: var(--color-text-primary);
    // TODO Define inside _typography.scss
    font-size: 0.8rem;
    font-weight: 700;

    &:hover, &.active {
      color: var(--color-primary);

      svg {
        fill: var(--color-primary);
      }
    }

    &.active {
      max-width: calc(var(--measure-sidebar-width) * 0.85);
      background-color: var(--color-primary-light);
      border-radius: 10px;
    }
  }
}
</style>
