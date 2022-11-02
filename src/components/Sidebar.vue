<template> 
    <v-navigation-drawer v-model="drawer" app color="#00695C">
        <v-avatar class="mb-4 ml-16" size="128">
            <v-img src="https://cdn.freebiesupply.com/logos/thumbs/2x/cbf-confederacao-brasileira-de-futebol-logo.png" class="pa-4"  height="100%">
            </v-img> 
        </v-avatar> 
        <v-divider/>
        <v-list shaped dark>
            <v-list-item v-for="(item, i) in links" :key="i" :to="item.link" link >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title >{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        props: ['drawer'],
        name:"Sidebar",
        data(){
            return{
                links: [
                    {
                        icon: 'mdi-microsoft-windows',
                        text: 'Dashboard',
                        link: '/',
                    },
                    {
                        icon: 'mdi-account',
                        text: 'Atletas',
                        link: '/atletas',
                    },
                    {
                        icon: 'mdi-clipboard-list-outline',
                        text: 'Dados individuais',
                        link: '/dadosindividuais',
                    },
                    {
                        icon: 'mdi-clipboard-list',
                        text: 'Dados coletivos',
                        link: '/dadostreino',
                    },
                    {
                        icon: 'mdi-calendar-search',
                        text: 'Histórico',
                        link: '/historico',
                    },
                ]
            }
        },
    }
</script>

<style>
</style>