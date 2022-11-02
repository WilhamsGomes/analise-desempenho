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
        name:"GraphicArtilheiro",

        components: {
          apexchart: VueApexCharts,
        },

        data() {
            return{
                loaded: false,
                arrayArtilheiros: [],
                series: [],
                chartOptions: {
                    chart: {
                        type: 'donut',
                    },
                    labels: [],
                    dataLabels: {
                        enabled: false
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
                            this.arrayArtilheiros.push({'Atleta':data[x].nmAtleta, 'Gols':data[x].golsFeitos})
                        }

                        this.buscandoArtilheiros();
                        


                    })
                    .catch((error) => {
                            console.log(error);
                    });
            },

            buscandoArtilheiros(){

                function somar(arr) {
                    let novoLista = [];
                    let m = new Map();

                    for (let prod of arr) {
                        if (m.has(prod.Atleta)) {
                            novoLista[m.get(prod.Atleta)].Gols += prod.Gols;
                        } else {
                            if(prod.Gols != 0){
                                m.set(prod.Atleta, novoLista.push({
                                Atleta: prod.Atleta,
                                Gols: prod.Gols
                                }) - 1);
                            }
                        }
                    }

                    return novoLista;
                }

                this.arrayArtilheiros = somar(this.arrayArtilheiros)

                this.arrayArtilheiros.sort(function(a, b){
                    if(a.Gols > b.Gols) return -1;
                    if(a.Gols < b.Gols) return 1;
                    return 0;
                })

                this.series[0] = this.arrayArtilheiros[0].Gols
                this.series[1] = this.arrayArtilheiros[1].Gols
                this.series[2] = this.arrayArtilheiros[2].Gols
                this.series[3] = this.arrayArtilheiros[3].Gols

                this.chartOptions.labels[0] = this.arrayArtilheiros[0].Atleta + " - " + this.arrayArtilheiros[0].Gols +" gols"
                this.chartOptions.labels[1] = this.arrayArtilheiros[1].Atleta + " - " + this.arrayArtilheiros[1].Gols +" gols"
                this.chartOptions.labels[2] = this.arrayArtilheiros[2].Atleta + " - " + this.arrayArtilheiros[2].Gols +" gols"
                this.chartOptions.labels[3] = this.arrayArtilheiros[3].Atleta + " - " + this.arrayArtilheiros[3].Gols +" gols"
                this.loaded = true;

            }

        }

    }
</script>

<style>

</style>