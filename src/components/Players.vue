<template>
    <div class="atletas">
        <GraphicLine/>
        <v-row class="mb-12 mt-8 flex justify-center align-center">
                <v-row>
                    <v-col lg="3" cols="12" v-for="(item, index) in activities" :key="index">
                        <v-card color="#f3f3f3" elevation="0" class="rounded-xl" >
                            <v-card-text class="d-flex justify-space-between align-center">
                                <div class="">
                                    <strong class="title">{{item.title}}</strong> <br/>
                                </div>
                                <v-avatar :color="item.color" size="60">
                                    <span class="white--text " >{{item.amouts}}</span>
                                </v-avatar>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
        </v-row>
        <!-- <Graphic/> -->
        <DataTable/>
    </div>
</template>

<script>
    import Modal from './Modal.vue';
    import DataTable from './DataTable.vue';
    import Graphic from './Graphic.vue';
    import GraphicLine from './GraphicLine.vue';

    export default {
        name: "Players",

        data() {
            return {
                activities:[
                        {title: 'Total de atletas', color:'#004D40', amouts:''},
                        {title: 'Média de idade', color:'#004D40', amouts:''},
                        {title: 'Média de altura', color:'#004D40', amouts:''},
                        {title: 'Média de peso', color:'#004D40', amouts:''},
                    ],
                desserts: [],    
                idades: [],
                pesos: [],
                totalPeso: 0,
                altura: [],
                totalAltura: 0,
                totalMedia: 0,
                anoAtual: null
            };
        },

        mounted() {
            const dataAtual = new Date();
            this.anoAtual = dataAtual. getFullYear();
            this.getAtletas()
        },

        methods: {

            async getAtletas() {
            fetch("http://localhost:8080/analise/").then((response) => {
                return response.json();
            }).then((jsonParsed) => {
                
                const data = jsonParsed;
                this.desserts = data;

                for (var x = 0; x < (this.desserts).length; x++) {
                    let dataFormat = (this.desserts[x].dtNascimentoAtleta).split("T");
                    this.desserts[x].dtNascimentoAtleta = dataFormat[0];
                    
                    this.idades.push( this.anoAtual - ((this.desserts[x].dtNascimentoAtleta.split("-"))[0]) )
                    this.pesos.push(this.desserts[x].pesoAtleta)
                    this.altura.push(this.desserts[x].alturaAtleta)
                }

                for (var h = 0; h < this.altura.length; h++){
                    this.totalAltura += this.altura[h]
                }

                for (var i = 0; i < this.idades.length; i++){
                    this.totalMedia += this.idades[i]
                }

                for (var i = 0; i < this.pesos.length; i++){
                    this.totalPeso += this.pesos[i]
                }

                //Média de altura
                this.activities[2].amouts = (this.totalAltura/this.altura.length).toFixed(2)

                //Média de peso
                this.activities[3].amouts = (this.totalPeso/this.pesos.length).toFixed(2)

                //Média de idade
                this.activities[1].amouts = (this.totalMedia/this.idades.length).toFixed(1)

                //Total de Atletas
                this.activities[0].amouts = this.desserts.length
            });
            },

        },
        
        components: {
    Modal,
    DataTable,
    Graphic,
    GraphicLine
}
    }
</script>

<style scoped>      


</style>