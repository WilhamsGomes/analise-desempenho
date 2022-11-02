<template>
    <div id="chart">
        <apexchart v-if="loaded" type="area" height="350" :options="chartOptions" :series="series">
        </apexchart>
      </div>
</template>

<script>
    import axios from "axios";
    import VueApexCharts from 'vue-apexcharts';

    export default {
        name:"GraphicHistory",

        components: {
            apexchart: VueApexCharts,
        },

        data(){
            return{
                loaded: false,
                series: [{
                    name: 'Gols da Seleção Brasileira',
                    data: []
                }, {
                    name: 'Gols adversário',
                    data: []
                }],

                chartOptions: {
                    chart: {
                        height: 350,
                        type: 'area'
                    },
                    dataLabels: {
                        enabled: true
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    xaxis: {
                        categories: []
                    },
                    colors:['#00E396', '#5869B3']   
                },
            }
        },

        mounted() {
            this.loaded = false  
            this.getHistorico();
        },

        methods: {
            async getHistorico() {
            axios
                .get("http://localhost:8080/historico")
                .then((response) => {
                    return response.data
                }).then((jsonParsed) =>{
                    const data = jsonParsed;
                    this.desserts = data;   

                    for(var x=0; x<this.desserts.length; x++){
                        this.series[0].data.push(this.desserts[x].quantidadeGolsMandante)
                        this.series[1].data.push(this.desserts[x].quantidadeGolsVisitante)
                        this.chartOptions.xaxis.categories.push("Brasil x "+this.desserts[x].timeAdversario)
                    }
                    this.loaded = true;
                })
                .catch((error) => {
                        console.log(error);
                });
            },
        }

    }
</script>

<style>

</style>