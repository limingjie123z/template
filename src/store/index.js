// import Vue from "vue";
// import Vuex from "vuex";
// Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        sidebartype: true,
        settabs: [{
            path: "/",
            menuName: "首页"
        }],
        buttons: null,
        // url: "http://192.168.3.123:8081", //景琦
        // url: "http://192.168.3.49:8081", //谷哥
        // url: "http://192.168.3.69:8081", //华晨
        // url: "http://192.168.3.7/api", //吕昌
        // url: "http://192.168.3.62/api", //志伟
        // url: "http://192.168.3.17:8081", // 振鹏
        // url: "http://192.168.3.8:8081", // 少峰
        // url: "http://47.94.163.209:9091",
        url: "http://ceshi.bjjbkj.cn:9080/api",
        loginstatus: false, //登录状态
        sidebarlist: null, //侧边栏列表
        perInfor: null,//登录信息
        newsin: false, //消息进入
        bidProjectCode: null, //招标项目id
        bidEvaluation: null, // 标段评标
        whetheractive: true, //招标项目是否进入选择
        bidProjectactive: null, //招标项目进入选择
        bidisShow: null, //招标项目是否是添加
        claractive: 0, //答疑踏勘选择
        clarisShow: 0, //答疑添加还是删除
        currentmessage: null //当前消息
    },
    mutations: {
        m_currentmessage(state, a) {
            state.currentmessage = a;
        },
        m_sidebartype(state, a) {
            state.sidebartype = a;
        },
        m_settabs(state, a) {
            state.settabs = a;
        },
        m_buttons(state, a) {
            state.buttons = a;
        },
        m_loginstatus(state, a) {
            state.loginstatus = a;
        },
        m_perInfor(state, a) {
            state.perInfor = a;
        },
        m_bidProjectCode(state, a) {
            state.bidProjectCode = a;
        },
        m_bidEvaluation(state, a) {
            state.bidEvaluation = a;
        },
        m_bidProjectactive(state, a) {
            state.bidProjectactive = a;
        },
        m_whetheractive(state, a) {
            state.whetheractive = a;
        },
        m_bidisShow(state, a) {
            state.bidisShow = a;
        },
        m_claractive(state, a) {
            state.claractive = a;
        },
        m_clarisShow(state, a) {
            state.clarisShow = a;
        },
        m_newsin(state, a) {
            state.newsin = a;
        },
        m_sidebarlist(state, a) {
            state.sidebarlist = a;
        }
    },
    actions: {
        a_currentmessage(context, payload) {
            context.commit("m_currentmessage", payload);
        },
        a_sidebartype(context, payload) {
            context.commit("m_sidebartype", payload);
        },
        a_settabs(context, payload) {
            context.commit("m_settabs", payload);
        },
        a_buttons(context, payload) {
            context.commit("m_buttons", payload);
        },
        a_loginstatus(context, payload) {
            context.commit("m_loginstatus", payload);
        },
        a_perInfor(context, payload) {
            context.commit("m_perInfor", payload);
        },
        a_bidProjectCode(context, payload) {
            context.commit("m_bidProjectCode", payload);
        },
        a_bidEvaluation(context, payload) {
            context.commit("m_bidEvaluation", payload);
        },
        a_bidProjectactive(context, payload) {
            context.commit("m_bidProjectactive", payload);
        },
        a_whetheractive(context, payload) {
            context.commit("m_whetheractive", payload);
        },
        a_bidisShow(context, payload) {
            context.commit("m_bidisShow", payload);
        },
        a_claractive(context, payload) {
            context.commit("m_claractive", payload);
        },
        a_clarisShow(context, payload) {
            context.commit("m_clarisShow", payload);
        },
        a_newsin(context, payload) {
            context.commit("m_newsin", payload);
        },
        a_sidebarlist(context, payload) {
            context.commit("m_sidebarlist", payload);
        }
    },
    getters: {
        g_url(state) {
            return state.url;
        },
        g_currentmessage(state) {
            return state.currentmessage;
        },
        g_sidebartype(state) {
            return state.sidebartype;
        },
        g_settabs(state) {
            return state.settabs;
        },
        g_buttons(state) {
            return state.buttons;
        },
        g_loginstatus(state) {
            return state.loginstatus;
        },
        g_perInfor(state) {
            return state.perInfor;
        },
        g_bidProjectCode(state) {
            return state.bidProjectCode;
        },
        g_bidEvaluation(state) {
            return state.bidEvaluation;
        },
        g_bidProjectactive(state) {
            return state.bidProjectactive;
        },
        g_whetheractive(state) {
            return state.whetheractive;
        },
        g_bidisShow(state) {
            return state.bidisShow;
        },
        g_claractive(state) {
            return state.claractive;
        },
        g_clarisShow(state) {
            return state.clarisShow;
        },
        g_newsin(state) {
            return state.newsin;
        },
        g_sidebarlist(state) {
            return state.sidebarlist;
        }
    }
});