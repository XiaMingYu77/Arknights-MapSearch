import {createRouter, createWebHashHistory} from "vue-router";

//路由表
const routes: Array<any> = [
    {
        path:"/",
        name:"Comming",
        component: ()=> import("../components/views/Comming.vue")
    },
    {
        path:"/search",
        name:"Search",
        //可以进行懒加载
        component: ()=> import("../components/views/Search.vue")
    },
]

//管理器
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;