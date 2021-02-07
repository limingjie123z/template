<template>
  <div id="footer">
    <div class="content">
      <div class="footer clearfix">
        <div class="footer-logo">
          <img src="../assets/xlogo.png" alt />
        </div>
        <div class="link clearfix">
          <ul>
            <li v-for="(item, index) in linkData" :key="index">{{ item }}</li>
          </ul>
          <span class="record">晋ICP备14006202号</span>
          <span class="companyTitle">北京玖邦科技有限公司</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkData: ["咨询中心", "政策法规", "下载中心", "联系我们"]
    };
  }
};
</script>
<style lang="scss" scoped>
#footer {
  width: 100%;
  .content {
    width: 75rem;
    margin: auto;
    padding: 114px 0 9.75rem 0;
    .footer {
      margin-left: 13.375rem;
      .footer-logo {
        float: left;
        width: 8.75rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .link {
        float: left;
        color: #919191;
        width: 26.188rem;
        font-size: 1.125rem;
        li {
          float: left;
          padding: 0 0.813rem;
          border-right: 0.063rem solid #939393;
        }
        li:last-child {
          border: none !important;
        }
        span {
          font-size: 0.75rem;
        }
        .record {
          padding-left: 2.5rem;
        }
        .companyTitle {
          padding-left: 1.25rem;
        }
      }
    }
  }
}
// .content {
//   width: 75rem;
//   margin: auto;
//   background: lightblue;
//   padding: 114px 0 9.75rem 0;
//   .content {
//     width: 23.625rem;
//     margin-left: 13.375rem;
//     border: 0.063rem solid red;
//     .footer-logo {
//       text-align: left;
//       padding: 114px 0 0 362px;
//       float: left;
//     }
//   }
//   // .link {
//   //   float: left;
//   //   padding: 114px 0 0 9px;
//   //   color: #919191;
//   //   text-align: left;
//   //   li {
//   //     float: left;
//   //     padding: 0 13px;
//   //     border-right: 1px solid #939393;
//   //   }
//   //   span {
//   //     font-size: 12px;
//   //   }
//   //   .record {
//   //     padding-left: 40px;
//   //   }
//   //   .companyTitle {
//   //     padding-left: 20px;
//   //   }
//   // }
// }
// #footer .link li:last-child {
//   border: none;
// }
</style>
