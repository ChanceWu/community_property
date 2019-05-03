/**
 * 路由组件出口文件
 */
// import Loadable from 'react-loadable';
// import Loading from './widget/Loading';
import AdminHome from '../components/adminHome/AdminHome';
import UserHome from '../components/userHome/UserHome';

import PersonInfo from './user/owner/PersonInfo'
import HouseInfo from './user/owner/HouseInfo'
import GarageInfo from './user/owner/GarageInfo'
import ChargeInfo from './user/charge/ChargeInfo'
import RepairInfo from './user/repair/RepairInfo'

import Information from './admin/owner/Information'
import HouseManage from './admin/house/HouseManage'
import ConventionalCost from './admin/cost/ConventionalCost'
import EquallySharedCost from './admin/cost/EquallySharedCost'
import ChargeManage from './admin/charge/ChargeManage'
import GarageManage from './admin/garage/GarageManage'
import RepairManage from './admin/repair/RepairManage'

/*const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});*/

export default {
    AdminHome,
    UserHome,

    PersonInfo,
    HouseInfo,
    GarageInfo,
    ChargeInfo,
    RepairInfo,
    
    Information,
    HouseManage,
    ConventionalCost,
    EquallySharedCost,
    ChargeManage,
    GarageManage,
    RepairManage,
}