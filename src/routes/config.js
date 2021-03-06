export default {
    admin: [ // 菜单相关路由
        { key: '/admin/home', title: '首页', icon: 'environment', component: 'AdminHome' },
        {
        	key: '/admin/owner', title: '业主管理', icon: 'user',
        	subs: [
                { key: '/admin/owner/infomation', title: '业主信息', component: 'Information'},
            ],
    	},
        {
        	key: '/admin/house', title: '楼盘管理', icon: 'home',
        	subs: [
                { key: '/admin/house/infomation', title: '楼盘信息', component: 'HouseManage'}
            ],
    	},
        {
            key: '/admin/expense', title: '费用管理', icon: 'pay-circle',
            subs: [
                { key: '/admin/expense/conventional', title: '常规费用', component: 'ConventionalCost'},
                { key: '/admin/expense/equallyshared', title: '公摊费用', component: 'EquallySharedCost'},
            ]
        },
        {
            key: '/admin/charge', title: '收费管理', icon: 'money-collect',
            subs: [
                { key: '/admin/charge/chargemanage', title: '收费信息', component: 'ChargeManage'},
            ]
        },
        {
            key: '/admin/repair', title: '维修管理', icon: 'tool',
            subs: [
                { key: '/admin/repair/repairmanage', title: '维修信息', component: 'RepairManage'},
            ]
        },
        {
            key: '/admin/garage', title: '车位管理', icon: 'car',
            subs: [
                { key: '/admin/garage/garagemanage', title: '车位信息', component: 'GarageManage'},
            ]
        },
        {
            key: '/admin/complaint', title: '投诉管理', icon: 'message',
            subs: [
                { key: '/admin/complaint/complaintmanage', title: '投诉信息', component: 'ComplaintManage'},
            ]
        },
        {
            key: '/admin/announcement', title: '公告管理', icon: 'bell',
            subs: [
                { key: '/admin/announcement/announcementmanage', title: '公告信息', component: 'AnnouncementManage'},
            ]
        },
        {
            key: '/admin/admin', title: '物业人员管理', icon: 'team',
            subs: [
                { key: '/admin/admin/infomation', title: '物业人员信息', component: 'AdminMember'},
            ],
        },
    ],
    user: [ // 菜单相关路由
        { key: '/user/home', title: '首页', icon: 'environment', component: 'UserHome' },
        {
        	key: '/user/owner', title: '信息管理', icon: 'bars',
        	subs: [
                { key: '/user/owner/personinfo', title: '个人信息', component: 'PersonInfo' },
                { key: '/user/owner/houseinfo', title: '住宅信息', component: 'HouseInfo' },
                { key: '/user/owner/garageinfo', title: '车位信息', component: 'GarageInfo' },
                { key: '/user/owner/passwordreset', title: '密码重置', component: 'PasswordReset' },
            ],
    	},
    	{ key: '/user/repair', title: '维修', icon: 'tool', component: 'RepairInfo' },
    	{ key: '/user/charge', title: '费用', icon: 'pay-circle', component: 'ChargeInfo' },
    	{ key: '/user/complaint', title: '投诉反馈', icon: 'message', component: 'ComplaintInfo' },
        { key: '/user/announcement', title: '公告', icon: 'bell', component: 'AnnouncementInfo' },
    ]
}