<template>
  <div v-if="typses" class="tab_box">
    <div
      class="clearfix"
      style="background-color: #fff;line-height: normal;border-radius: 0.3rem;"
    >
      <div @click="back()" class="back">
		  <i class="iconfont iconright" style="font-size: 1.25rem;color: #b3b3b3;"></i>
	  </div>
      <div class="tab">
        <div
          ref="Scroll"
          :style="{ left: tableft + 'rem' }"
          id="Scrollingcon"
          class="Scrollingcon"
        >
          <div
            class="listb"
            v-for="(i, index) in $store.getters.g_settabs"
            :key="index"
          >
            <div
              @click="routing(i.path, index)"
              :class="active === index ? 'active' : ''"
            >
              <span>{{ i.menuName }}</span
              ><i
			  style="margin-left: 5px;"
                v-if="index !== 0"
                @click.stop="close(index)"
                class="el-icon-close"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <el-dropdown style="float: right;">
        <div class="delete">
          <span>关闭操作 </span>
          <!-- el-icon-arrow-up -->
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="close(active)"
            >关闭当前</el-dropdown-item
          >
          <el-dropdown-item @click.native="closeother(active)"
            >关闭其他</el-dropdown-item
          >
          <el-dropdown-item @click.native="closeall()"
            >关闭全部</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <div @click="next()" class="next">
		  <i class="iconfont icongengduobeifen" style="font-size: 1.25rem;color: #b3b3b3;"></i>
	  </div>
    </div>
  </div>
</template>
<script>
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  computed: {
    settabs() {
      return this.$store.getters.g_settabs;
    }
  },
  watch: {
    $route(to) {
      if (this.$refs.Scroll.clientWidth / 16 > 92.3) {
        this.tableft = -(this.$refs.Scroll.clientWidth / 16 - 92.3);
      }
      this.$store.getters.g_settabs.forEach((item, index) => {
        console.log(to.path, item.path);
        if (window.location.hash.slice(1) === item.path) {
          // console.log(index);
          this.active = index;
          let domwidth = -(index * 9);
          if (domwidth > this.tableft && domwidth <= 0) {
            this.tableft = domwidth;
          } else if (domwidth < this.tableft - 92.3) {
            if (domwidth >= -(this.$refs.Scroll.clientWidth / 16)) {
              this.tableft = domwidth;
            } else {
              this.tableft = -(this.$refs.Scroll.clientWidth / 16 - 92.3);
            }
          }
        }
      });
    },
    settabs: function() {
      if (this.type) {
        this.$store.getters.g_settabs.forEach((item, index) => {
          if (window.location.hash.slice(1) === item.path) {
            this.active = index;
          }
        });
        const _this = this;
        const erd = elementResizeDetectorMaker();
        erd.listenTo(document.getElementById("Scrollingcon"), () => {
          _this.$nextTick(() => {
            if (_this.$refs.Scroll.clientWidth / 16 > 92.3) {
              _this.movetype = true;
            } else {
              _this.movetype = false;
            }
            if (_this.$refs.Scroll.clientWidth > _this.historywidth) {
              if (_this.$refs.Scroll.clientWidth / 16 > 92.3) {
                _this.tableft = -(_this.$refs.Scroll.clientWidth / 16 - 92.3);
              }
            } else {
              if (
                _this.tableft <= -(_this.$refs.Scroll.clientWidth / 16 - 92.3)
              ) {
                _this.tableft = -(_this.$refs.Scroll.clientWidth / 16 - 92.3);
                if (_this.tableft >= 0) {
                  _this.tableft = 0;
                }
              }
            }
            _this.historywidth = this.$refs.Scroll.clientWidth;
          });
        });
        this.type = false;
      }
    }
  },
  data() {
    return {
      active: 0,
      tableft: 0,
      historywidth: 0,
      movetype: false,
      type: true,
      typses: true
    };
  },
  mounted() {},
  methods: {
    routing(path, index) {
      this.active = index;
      if (path !== this.$route.path) {
        this.$router.push(path);
      }
      this.$store.dispatch("a_newsin", false);
      this.$store.dispatch("a_whetheractive", true);
      this.$store.dispatch("a_bidisShow", 1);
      this.$store.dispatch("a_bidProjectactive", 0);
    },
    back() {
      this.tableft += 7.125;
      if (0 < this.tableft) {
        this.tableft = 0;
      }
    },
    next() {
      if (this.$refs.Scroll.clientWidth / 16 > 92.3) {
        this.tableft -= 7.125;
        if (this.tableft < -(this.$refs.Scroll.clientWidth / 16 - 92.3)) {
          this.tableft = -(this.$refs.Scroll.clientWidth / 16 - 92.3);
        }
      }
    },
    close(a) {
      let arr = this.$store.getters.g_settabs;
      console.log(arr[a].path ,window.location.hash.slice(1))
      if (arr[a].path === window.location.hash.slice(1) && a > 0) {
        this.active = this.active - 1;
        this.$router.push(arr[this.active].path);

        arr.splice(a, 1);
        this.$store.dispatch("a_settabs", arr);
		  this.$store.dispatch("a_newsin", false);
		  this.$store.dispatch("a_whetheractive", true);
		  this.$store.dispatch("a_bidisShow", 1);
		  this.$store.dispatch("a_bidProjectactive", 0);
      } else {
        if (a > 0) {
          arr.splice(a, 1);
          if (this.active > a) {
            this.active = this.active - 1;
          }
          this.$store.dispatch("a_settabs", arr);
        }
      }
    },
    closeother(a) {
      let arr = this.$store.getters.g_settabs;
      let settabs = [];
      let ind = 0;
      arr.forEach((item, index) => {
        if (index == 0) {
          settabs.push(item);
        } else if (index == a) {
          ind = 1;
          settabs.push(item);
        }
      });
      this.active = ind;
      this.$store.dispatch("a_settabs", settabs);
    },
    closeall() {
      let arr = this.$store.getters.g_settabs;
      let settabs = [];
      settabs.push(arr[0]);
      this.active = 0;
      this.$store.dispatch("a_settabs", settabs);
	  
	  this.$store.dispatch("a_newsin", false);
	  this.$store.dispatch("a_whetheractive", true);
	  this.$store.dispatch("a_bidisShow", 1);
	  this.$store.dispatch("a_bidProjectactive", 0);
    }
  }
};
</script>
<style lang="scss">
.tab_box {
}
</style>
<style lang="scss" scoped>
.tab_box {
  background: rgba(0, 0, 0, 0);
  margin: 0;
  margin: 0 1.2rem;
  margin-top: 0.52rem;
  box-sizing: border-box;
  box-shadow: 0px 0.25rem 0.8125rem 0.0625rem rgba(46, 43, 41, 0.08);
  border: 0.0625rem #e3e3e3 solid;
  border-radius: 0.3rem;
  .tab {
    height: 3.125rem;
    line-height: 3.125rem;
    background-color: #fff;
    float: left;
    max-width: 92.3rem;
    overflow: hidden;

    // position: relative;
    .Scrollingcon {
      display: inline-block;
      white-space: nowrap;
      position: relative;
      top: 0;
      // left: 0;
      // transition: all 0.4s;
    }

    .listb {
      width: 9rem;
      box-sizing: border-box;
      border: 1px #e3e3e3 solid;
      // border-right: 1px #e3e3e3 solid;
      color: #333333;
      font-size: 16px;
      cursor: pointer;
      display: inline-block;
	  text-align:center;
      // border-radius: 0.3rem;
      overflow: hidden;
      margin-top: -1px;
      .iconfont {
        font-size: 0.8125rem;
        margin-left: 0.625rem;
        color: #666666;
        cursor: pointer;
      }

      .active {
        color: #fff;
        background-color: #1884e0;
        // border-top-right-radius: 0.1875rem;
        // border-top-left-radius: 0.1875rem;
        .iconfont {
          background-color: #1884e0;
          border-radius: 50%;
          overflow: hidden;
          color: #fff;
        }
      }
    }
  }

  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar-track {
    background-color: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: none;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: none;
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: none;
  }

  .next {
    width: 2.5rem;
    height: 3.15rem;
    float: right;
    // background-image: url(../assets/右箭头.png);
    background-size: 0.9375rem;
    background-repeat: no-repeat;
    background-position: 0.855rem 0.9875rem;
    border: 1px #e3e3e3 solid;
    // border-radius: 0.3rem;
    cursor: pointer;
    // margin-top: 2px;
    box-sizing: border-box;
	text-align: center;
	line-height: 3.15rem;
  }

  .back {
    width: 2.5rem;
    height: 3.15rem;
    float: left;
    border-right: 1px #e3e3e3 solid;
    // background-image: url(../assets/左箭头.png);
    background-size: 0.9375rem;
    background-repeat: no-repeat;
    background-position: 0.855rem 0.9875rem;
    border: 1px #e3e3e3 solid;
    // border-radius: 0.3rem;
    cursor: pointer;
    box-sizing: border-box;
	text-align: center;
	line-height: 3.15rem;
  }
  .delete {
    width: 7.5rem;
    text-align: center;
    background-color: #1884e0;
    color: #fff;
    float: right;
    font-size: 0.875rem;
    line-height: 3.125rem;
    // border-radius: 0.3rem;
    cursor: pointer;
  }
}
</style>
