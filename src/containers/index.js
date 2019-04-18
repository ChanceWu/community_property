/**
 * 路由组件出口文件
 */
// import Loadable from 'react-loadable';
// import Loading from './widget/Loading';
import AdminHome from '../components/adminHome/AdminHome';
import UserHome from '../components/userHome/UserHome';

import PersonInfo from './user/owner/PersonInfo'
import HouseInfo from './user/owner/HouseInfo'

import Information from './admin/owner/Information'

/*const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});*/

export default {
    AdminHome,
    UserHome,
    PersonInfo,
    HouseInfo,
    Information,
}