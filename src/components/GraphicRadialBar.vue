<template>
    <apexchart v-if="loaded" type="radialBar"  height="350" :options="chartOptions" :series="series">
    </apexchart>
</template>

<script>
    import axios from 'axios';
    import VueApexCharts from 'vue-apexcharts'

    export default {
        name:"GraphicRadialBar",

        components: {
          apexchart: VueApexCharts,
        },

        data(){
            return{
                loaded: false,
                series: [],
                chartOptions: {
                    colors:['#00695C'],
                    chart: {
                        height: 350,
                        type: 'radialBar',
                        offsetY: -10,
                    },

                    plotOptions: {
                        radialBar: {
                            startAngle: -135,
                            endAngle: 135,
                            dataLabels: {
                                name: {
                                    fontSize: '16px',
                                    color: '#00695C',
                                    offsetY: 120
                                },
                                value: {
                                    offsetY: 76,
                                    fontSize: '28px',
                                    color: '#00695C',
                                    fontWeight: 'bold',
                                    formatter: function (val) {
                                        return val + "%";
                                    }
                                }
                            }
                        }

                    },

                    fill: {
                        type: 'gradient',
                        gradient: {
                            shade: 'dark',
                            shadeIntensity: 0.15,
                            inverseColors: false,
                            opacityFrom: 1,
                            opacityTo: 1,
                            stops: [0, 50, 65, 91]
                        },
                        
                    },

                    stroke: {
                        dashArray: 4,
                    },

                    labels: ['Aproveitamento em 2022'],
                },

                aproveitamento: 0,
            }
        },

        mounted(){
            this.getHistorico();
        },

        methods:{

            async getHistorico() {
            axios
                .get("http://localhost:8080/historico")
                .then((response) => {
                    return response.data
                }).then((jsonParsed) =>{
                    const data = jsonParsed;
                    this.desserts = data;
                    for (var x = 0; x < (this.desserts).length; x++) {
                       
                        if (this.desserts[x].quantidadeGolsMandante > this.desserts[x].quantidadeGolsVisitante) {
                            this.aproveitamento += 3
                        }
                        else if (this.desserts[x].quantidadeGolsMandante < this.desserts[x].quantidadeGolsVisitante) {
                            this.aproveitamento += 0
                        }
                        else if (this.desserts[x].quantidadeGolsMandante == this.desserts[x].quantidadeGolsVisitante) {
                            this.aproveitamento += 1
                        }
                    }

                    this.aproveitamento = ((this.aproveitamento/(((this.desserts).length)*3))*100).toFixed(1)
                    this.series[0] = this.aproveitamento
                    this.loaded = true
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