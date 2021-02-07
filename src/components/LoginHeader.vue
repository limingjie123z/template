<template>
  <div id="header">
    <div class="header-content">
      <div class="logo">
        <img src="../assets/logo.png" alt />
      </div>
      <div class="phone">
        <img src="../assets/dianhua.png" alt="" />
        <span>400-000-0000</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss">
$width: 75rem;
#header {
  .header-content {
    width: $width;
    height: 10.625rem;
    margin: auto;
    .logo {
      width: 50%;
      float: left;
      margin-top: 3.875rem;
      text-align: left;
      img {
        width: 21.875rem;
        height: 3.75rem;
      }
    }
    .phone {
      width: 50%;
      float: left;
      font-size: 2.875rem;
      color: #e37031;
      line-height: 10.625rem;
      text-shadow: 0.063rem 0.063rem 0.063rem #f1b798;
      img {
        width: 3.5rem;
        height: 3rem;
      }
    }
  }
}
</style>
