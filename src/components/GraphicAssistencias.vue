<template>
    <div id="chart">
        <apexchart type="donut" v-if="loaded" :options="chartOptions" :series="series">
        </apexchart>
    </div>
</template>

<script>

    import VueApexCharts from 'vue-apexcharts';
    import axios from 'axios';

    export default {
        name:"GraphicAssistencias",

        components: {
          apexchart: VueApexCharts,
        },

        data() {
            return{
                loaded: false,
                arrayAssistencias: [],
                series: [],
                chartOptions: {
                    chart: {
                        type: 'donut',
                    },
                    labels: [],
                    dataLabels: {
                        enabled: false,
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                },      
            }
        },

        mounted(){
            this.getDadosIndividuais();
        },

        methods:{

            async getDadosIndividuais() {
                axios.get("http://localhost:8080/dados/individuais")
                    .then((response) => {
                        return response.data
                    }).then((jsonParsed) =>{

                        const data = jsonParsed;

                        for(var x=0; x < data.length; x++){
                            this.arrayAssistencias.push({'Atleta':data[x].nmAtleta, 'Assistencias':data[x].assistencias})
                        }

                        this.buscandoAssistencias();
                        


                    })
                    .catch((error) => {
                            console.log(error);
                    });
            },

            buscandoAssistencias(){

                function somar(arr) {
                    let novoLista = [];
                    let m = new Map();

                    for (let prod of arr) {
                        if (m.has(prod.Atleta)) {
                            novoLista[m.get(prod.Atleta)].Assistencias += prod.Assistencias;
                        } else {
                            if(prod.Assistencias != 0){
                                m.set(prod.Atleta, novoLista.push({
                                Atleta: prod.Atleta,
                                Assistencias: prod.Assistencias
                                }) - 1);
                            }
                        }
                    }

                    return novoLista;
                }

                this.arrayAssistencias = somar(this.arrayAssistencias)

                this.arrayAssistencias.sort(function(a, b){
                    if(a.Assistencias > b.Assistencias) return -1;
                    if(a.Assistencias < b.Assistencias) return 1;
                    return 0;
                })

                this.series[0] = this.arrayAssistencias[0].Assistencias
                this.series[1] = this.arrayAssistencias[1].Assistencias
                this.series[2] = this.arrayAssistencias[2].Assistencias
                this.series[3] = this.arrayAssistencias[3].Assistencias

                this.chartOptions.labels[0] = this.arrayAssistencias[0].Atleta + " - " + this.arrayAssistencias[0].Assistencias +" Assistências"
                this.chartOptions.labels[1] = this.arrayAssistencias[1].Atleta + " - " + this.arrayAssistencias[1].Assistencias +" Assistências"
                this.chartOptions.labels[2] = this.arrayAssistencias[2].Atleta + " - " + this.arrayAssistencias[2].Assistencias +" Assistências"
                this.chartOptions.labels[3] = this.arrayAssistencias[3].Atleta + " - " + this.arrayAssistencias[3].Assistencias +" Assistências"
                this.loaded = true;

            }

        }

    }
</script>

<style>

</style>