<template>
    <div id="chart">
        <apexchart v-if="loaded" type="line" height="350" :options="chartOptions" :series="series">
        </apexchart>
    </div>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts'

    export default {
        name:"GraphicLine",
        components: {
          apexchart: VueApexCharts,
        },

        data() {
            return{
                loaded: false,
                desserts:[],

                series: [{
                    name: "Idade do atleta",
                    data:[],
                }],

                chartOptions: {
                    chart: {
                        height: 350,
                        type: 'line',
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    title: {
                        text: '',
                        align: 'left'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        categories: [],
                    },
                    colors: ['#004D40']
                },
            }
        },

        mounted(){     
            this.loaded = false  
            this.getAtletas()
        },

        methods:{

            async getAtletas() {

                fetch("http://localhost:8080/analise/").then((response) => {
                    return response.json();
                }).then((jsonParsed) => {
                    const data = jsonParsed;
                    this.desserts = data;

                    for (var x = 0; x < (this.desserts).length; x++) {
                        let dataFormat = (this.desserts[x].dtNascimentoAtleta).split("T");
                        this.desserts[x].dtNascimentoAtleta = dataFormat[0];
                    }

                    const dataAtual = new Date();
                    const anoAtual = dataAtual. getFullYear();
                    
                    for (var x=0; x<this.desserts.length; x++){
                        this.chartOptions.xaxis.categories.push(this.desserts[x].apelidoAtleta)
                        this.series[0].data.push(anoAtual - ((this.desserts[x].dtNascimentoAtleta.split("-"))[0]))
                    }

                    this.loaded = true
                    
                });
            },

        }
    }
</script>

<style>

</style>