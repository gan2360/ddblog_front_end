import { Form, FormItem, Input, Button, Message, MessageBox, Notification, Menu, MenuItem, Submenu, Upload, Radio, RadioGroup, Pagination } from 'element-ui'
// import '../assets/style/theme/index.css'
import Vue from 'vue'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Upload)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Pagination)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification