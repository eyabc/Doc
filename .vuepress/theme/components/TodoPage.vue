<!--https://v1.vuepress.vuejs.org/guide/-->
<template>
    <div class="theme-default-content">
        <h1>Todos</h1>
        <div>
            <v-timeline
                    :align-top="true"
                    dense
            >
                <v-timeline-item
                        v-for="n in todos"
                        :key="n.key"
                        color="gray"
                        small
                >
                    <v-card class="elevation-2">
                        <v-card-title class="headline"><a :href="'/Doc'+n.regularPath">{{ n.regularPath.slice(6, 16) }}</a></v-card-title>
                        <v-card-text>

                            <Content  slot-key="footer"/>
                        </v-card-text>
                    </v-card>
                </v-timeline-item>
            </v-timeline>
        </div>

    </div>
</template>

<script>

  export default {
    data() {
      return {
         todos: []
      }
    },
    created () {
      this.getTodos();
    },
    methods: {
      getTodos () {
        console.log(this.$site.pages);
        console.log(this.$site.themeConfig)
            // .filter(v => {
            // return v.links;
        // }));
        this.todos = this.$site.pages.filter(page => page.path.includes('/todo/')).reverse();
        console.log(this.todos)
      },
    },
  };
</script>
