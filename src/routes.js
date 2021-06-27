import React from 'react';

const Members = React.lazy(() => import('./my-pages/Member/Members'));
const newMember = React.lazy(() => import('./my-pages/Member/newMember'));
const updateMember = React.lazy(() => import('./my-pages/Member/updateMember'));

const Login = React.lazy(() => import('./my-pages/Auth/Login'));
const Register = React.lazy(() => import('./my-pages/Auth/Register'));

const Group = React.lazy(() => import('../src/my-pages/Group/Gropu'));
const newGroup = React.lazy(() => import('../src/my-pages/Group/New-Group'));
const updateGroup = React.lazy(() => import('../src/my-pages/Group/Update-Group'));

const Status = React.lazy(() => import('../src/my-pages/Status/Status'));
const newStatus = React.lazy(() => import('../src/my-pages/Status/New-Status'));
const updateStatus = React.lazy(() => import('../src/my-pages/Status/Update-Status'));

const ForgetPassModal = React.lazy(() => import('./my-pages/Auth/Forget-Password'));
const resetPassword = React.lazy(() => import('./my-pages/Auth/Reset-Password'));

const Category = React.lazy(() => import('./my-pages/Category/Category'));
const newCategory = React.lazy(() => import('./my-pages/Category/New-Category'));
const updateCategory = React.lazy(() => import('./my-pages/Category/Update-Category'));

const Equipment = React.lazy(() => import('./my-pages/Equipment/Equipment'));
const newEquipment = React.lazy(() => import('./my-pages/Equipment/New-Equipment'));
const updateEquipment = React.lazy(() => import('./my-pages/Equipment/Update-Equipment'));

const Muscle = React.lazy(() => import('./my-pages/Muscle/Muscle'));
const newMuscle = React.lazy(() => import('./my-pages/Muscle/New-Muscle'));
const updateMuscle = React.lazy(() => import('./my-pages/Muscle/Update-Muscle'));

const Exercise = React.lazy(() => import('./my-pages/Exercise/Exercise'));
const newExercise = React.lazy(() => import('./my-pages/Exercise/New-Exercise'));
const updateExercise = React.lazy(() => import('./my-pages/Exercise/Update-Exercise'));

const Gym = React.lazy(() => import('./my-pages/Gym/Gym'));
const newGym = React.lazy(() => import('./my-pages/Gym/New-Gym'));
const updateGym = React.lazy(() => import('./my-pages/Gym/Update-Gym'));

const GymType = React.lazy(() => import('./my-pages/GymType/GymType'));
const newGymType = React.lazy(() => import('./my-pages/GymType/New-GymType'));
const updateGymType = React.lazy(() => import('./my-pages/GymType/Update-GymType'));

const WorkOut = React.lazy(() => import('./my-pages/WorkOut/WorkOut'));
const newWorkOut = React.lazy(() => import('./my-pages/WorkOut/New-WorkOut'));
const updateWorkOut = React.lazy(() => import('./my-pages/WorkOut/Update-WorkOut'));

const WorkOutDetails = React.lazy(() => import('./my-pages/WorkOutDetails/WorkOutDetails'));
const newWorkOutDetails = React.lazy(() => import('./my-pages/WorkOutDetails/New-WorkOutDetails'));
const updateWorkOutDetails = React.lazy(() => import('./my-pages/WorkOutDetails/Update-WorkOutDetails'));


// const Profile = React.lazy(() => import('./userSide-Components/Profile'));

const Users = React.lazy(() => import('./userSide-Components/Users'));
const User = React.lazy(() => import('./userSide-Components/User'));




const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));



const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/forget-password', name: 'Forget-Password', component: ForgetPassModal },
  { path: '/reset-password', name: 'Reset-Password', component: resetPassword },

  { path: '/members/list', name: 'Members', component: Members },
  { path: '/members/create', name: 'newMember', component: newMember },
  { path: '/members/update', name: 'updateMember', component: updateMember },

  { path: '/user_group/list', name: 'Group', component: Group },
  { path: '/user_group/create', name: 'newGroup', component: newGroup },
  { path: '/user_group/update', name: 'updateGroup', component: updateGroup },

  { path: '/user_status/list', name: 'Status', component: Status },
  { path: '/user_status/create', name: 'newStatus', component: newStatus },
  { path: '/user_status/update', name: 'updateStatus', component: updateStatus },

  { path: '/category/list', name: 'Category', component: Category },
  { path: '/category/create', name: 'newCategory', component: newCategory },
  { path: '/category/update', name: 'updateCategory', component: updateCategory },

  { path: '/equipment/list', name: 'Equipments', component: Equipment },
  { path: '/equipment/create', name: 'newEquipment', component: newEquipment },
  { path: '/equipment/update', name: 'updateEquipment', component: updateEquipment },

  { path: '/muscle/list', name: 'Muscle', component: Muscle },
  { path: '/muscle/create', name: 'newMuscle', component: newMuscle },
  { path: '/muscle/update', name: 'updateMuscle', component: updateMuscle },

  { path: '/exercise/list', name: 'Exercise', component: Exercise },
  { path: '/exercise/create', name: 'newExercise', component: newExercise },
  { path: '/exercise/update', name: 'updateExercise', component: updateExercise },
  
  
  { path: '/gym/list', name: 'Gym', component: Gym },
  { path: '/gym/create', name: 'newGym', component: newGym },
  { path: '/gym/update', name: 'updateGym', component: updateGym },
  
  { path: '/gymType/list', name: 'GymType', component: GymType },
  { path: '/gymType/create', name: 'newGymType', component: newGymType },
  { path: '/gymType/update', name: 'updateGymType', component: updateGymType },
  
  { path: '/workOut/list', name: 'WorkOut', component: WorkOut },
  { path: '/workOut/create', name: 'newWorkOut', component: newWorkOut },
  { path: '/workOut/update', name: 'updateWorkOut', component: updateWorkOut },

  { path: '/workOutDetails/list', name: 'WorkOutDetails', component: WorkOutDetails },
  { path: '/workOutDetails/create', name: 'newWorkOutDetails', component: newWorkOutDetails },
  { path: '/workOutDetails/update', name: 'updateWorkOutDetails', component: updateWorkOutDetails },
  
  { path: '/users', exact: true,  name: 'Users', component: Users },
  
  // { path: '/profile', name: 'profile', component: Profile },

  { path: '/users/:id', exact: true, name: 'User Details', component: User },





  { path: '/dashboard', name: 'Dashboard', component: Dashboard  },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
 
];

export default routes;
