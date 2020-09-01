import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import Vuex from 'vuex'


// import 'material-design-icons-iconfont/dist/material-design-icons.css'

export default ({
                    Vue,
                    options,
                    router,
                    siteData,
                }) => {
    Vue.use(Vuex),
    Vue.use(Vuetify);
    options.vuetify = new Vuetify({});
}
