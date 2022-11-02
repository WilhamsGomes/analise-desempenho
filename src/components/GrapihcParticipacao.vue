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
        name:"GraphicParticipacoes",

        components: {
          apexchart: VueApexCharts,
        },

        data() {
            return{
                loaded: false,
                arrayParticipacoes: [],
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
                            this.arrayParticipacoes.push({'Atleta':data[x].nmAtleta, 'Participacoes': (data[x].golsFeitos + data[x].assistencias)})
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
                            novoLista[m.get(prod.Atleta)].Participacoes += prod.Participacoes;
                        } else {
                            if(prod.Participacoes != 0){
                                m.set(prod.Atleta, novoLista.push({
                                Atleta: prod.Atleta,
                                Participacoes: prod.Participacoes
                                }) - 1);
                            }
                        }
                    }

                    return novoLista;
                }

                this.arrayParticipacoes = somar(this.arrayParticipacoes)

                this.arrayParticipacoes.sort(function(a, b){
                    if(a.Participacoes > b.Participacoes) return -1;
                    if(a.Participacoes < b.Participacoes) return 1;
                    return 0;
                })

                this.series[0] = this.arrayParticipacoes[0].Participacoes
                this.series[1] = this.arrayParticipacoes[1].Participacoes
                this.series[2] = this.arrayParticipacoes[2].Participacoes
                this.series[3] = this.arrayParticipacoes[3].Participacoes

                this.chartOptions.labels[0] = this.arrayParticipacoes[0].Atleta + " - " + this.arrayParticipacoes[0].Participacoes +" Participações"
                this.chartOptions.labels[1] = this.arrayParticipacoes[1].Atleta + " - " + this.arrayParticipacoes[1].Participacoes +" Participações"
                this.chartOptions.labels[2] = this.arrayParticipacoes[2].Atleta + " - " + this.arrayParticipacoes[2].Participacoes +" Participações"
                this.chartOptions.labels[3] = this.arrayParticipacoes[3].Atleta + " - " + this.arrayParticipacoes[3].Participacoes +" Participações"
                this.loaded = true;

            }

        }

    }
</script>

<style>

</style>