<script setup lang="ts">
export interface Props {
  page: string;
}
const props = withDefaults(defineProps<Props>(), {
  page: '',
});
</script>
<template>
  <div class="footer">
    <div class="footer__inner">
      <nav>
        <ul>
          <li>
            <a href="#">
              <img src="/assets/images/common/icon-x.svg" alt="" width="40" height="40" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/assets/images/common/icon-fb.svg" alt="" width="40" height="40" />
            </a>
          </li>
        </ul>
      </nav>
      <p><small>©hoo bar baz...</small></p>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '../../css/base/index' as *;

.footer {
  color: #fff;
  background-color: #567b76;

  .footer__inner {
    display: grid;
    gap: 10px;
    width: 95%;
    max-width: 1280px;
    padding-block: 20px;
    margin-inline: auto;
  }

  nav {
    ul {
      display: flex;
      gap: 15px;
      justify-content: center;
    }

    a {
      &:hover {
        opacity: 0.6;
      }
    }
  }

  p {
    text-align: center;
  }
}
</style>
