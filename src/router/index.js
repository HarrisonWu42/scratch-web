import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
	return VueRouterPush.call(this, to).catch(err => err)
}
export default new Router({
	routes: [{
			path: "/",
			redirect: "/home"
		},
		{
			path: "/login",
			component: () => import("@/components/login.vue")
		},
		{
			path: "/register",
			component: () => import("@/components/register.vue")
		},
		{
			path: "/forgetpswd",
			component: () => import("@/components/forgetpswd.vue")
		},
		{
			path: "/main",
			component: () => import("@/components/main.vue")
		},
		{
			path: "/person",
			component: () => import("@/components/person.vue")
		},
		{
			path: "/confirm",
			component: () => import("@/components/auth/confirm.vue")
		},
		{
			path: "/editgroup/:groupid",
			component: () => import("@/components/editgroup.vue")
		},
		{
			path: "/edittask",
			component: () => import("@/components/edittask.vue")
		},
		{
			path: "/groupadmit",
			component: () => import("@/components/GroupAdmit.vue")
		},
		{
			path: "/home",
			component: () => import("@/components/home.vue")
		},
		{
			path: "/taskset/:tasksetid/:tasksetname",
			component: () => import("@/components/TaskSet.vue")
		},
		{
			path: "/taskset/:tasksetid/task/:taskid",
			component: () => import("@/components/TaskItem.vue")
		},
		{
			path: "/auth/confirm/:token",
			component: () => import("@/components/confirm.vue")
		},
		{
			path: "/taskDB",
			component: () => import("@/components/TaskDB.vue")
		},
		{
			path: "/taskLimit",
			component: () => import("@/components/TaskLimit.vue")
		},
		{
			path: "/group",
			component: () => import("@/components/Group.vue")
		},
		{
			path: "/task",
			component: () => import("@/components/Task.vue")
		},
		// {
        //     path: "/index",
        //     name: 'index',
        //     component: () => import("@/components/index.vue"),
        //     children: [
        //         {
        //             path: "/taskDB",
        //             component: () => import("@/components/TaskDB.vue")
        //         },
        //         {
        //             path: "/group",
        //             component: () => import("@/components/Group.vue")
        //         },
        //         {
        //             path: "/task",
        //             component: () => import("@/components/Task.vue")
        //         }
        //     ]
        // }
	]
})
