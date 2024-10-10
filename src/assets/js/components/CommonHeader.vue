<template>
  <div class="header">
    <div class="header__inner">
      <a class="header__logo" href="/">Site Logo</a>
      <div class="header__menu">
        <nav>
          <ul>
            <li>
              <a href="/sub/">Sub</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '../../css/base/index' as *;

.header {
  color: #fff;
  background-color: #567b76;

  .header__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 95%;
    max-width: 1280px;
    margin-inline: auto;
  }

  .header__logo {
    &:hover {
      opacity: 0.6;
    }
  }

  nav {
    ul {
      display: flex;
      gap: 15px;
    }

    a {
      display: block;
      padding: 10px;

      &:hover {
        opacity: 0.6;
      }
    }
  }
}
</style>
