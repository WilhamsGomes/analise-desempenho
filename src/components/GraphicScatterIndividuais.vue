<template>
    <div id="chart">
        <apexchart v-if="loaded" type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>

    import VueApexCharts from 'vue-apexcharts';
    import axios from 'axios';

    export default {
        name:"GraphicScatterIndividuais",
        
        components: {
          apexchart: VueApexCharts,
        },

        data(){
            return{
                loaded: false,
                arrayArtilheiros: [],
                series: [{
                    name: 'Gol',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
                }, {
                    name: 'Assistência',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
                }, {
                    name: 'Chance criada',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
                }],
                chartOptions: {
                    chart: {
                        type: 'bar',
                        height: 350
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '55%',
                            endingShape: 'rounded'
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                    },
                    xaxis: {
                        categories: ['Antony', 'Raphinha', 'Neymar', 'Rodrygo', 'Vinícius Júnior', 'Richarlison', 'Pedro', 'Gabriel Jesus', 'Matheus Cunha'],
                    },
                    yaxis: {
                        title: {
                            text: 'Participação em gol'
                        }   
                    },
                    fill: {
                        opacity: 1
                    },
                    
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
                            this.arrayArtilheiros.push({'atleta':data[x].nmAtleta, 'gols':data[x].golsFeitos, 'assistencias':data[x].assistencias, 'chances': data[x].chancesReaisCriadas})
                        }
                        this.buscandoArtilheiros();
                        
                    })
                    .catch((error) => {
                            console.log(error);
                    });
            },

            buscandoArtilheiros(){

                for (var y=0; y < this.arrayArtilheiros.length; y++){

                    if(this.arrayArtilheiros[y].atleta == 'Antony'){
                        this.series[0].data[0] = (this.series[0].data[0] + this.arrayArtilheiros[y].gols)
                        this.series[1].data[0] = (this.series[1].data[0] + this.arrayArtilheiros[y].assistencias)
                        this.series[2].data[0] = (this.series[2].data[0] + this.arrayArtilheiros[y].chances)
                    }

                    if(this.arrayArtilheiros[y].atleta == 'Raphinha'){
                        this.series[0].data[1] = (this.series[0].data[1] + this.arrayArtilheiros[y].gols)
                        this.series[1].data[1] = (this.series[1].data[1] + this.arrayArtilheiros[y].assistencias)
                        this.series[2].data[1] = (this.series[2].data[1] + this.arrayArtilheiros[y].chances)
                    }

                    if(this.arrayArtilheiros[y].atleta == 'Neymar'){
                        this.series[0].data[2] = (this.series[0].data[2] + this.arrayArtilheiros[y].gols)
                        this.series[1].data[2] = (this.series[1].data[2] + this.arrayArtilheiros[y].assistencias)
                        this.series[2].data[2] = (this.series[2].data[2] + this.arrayArtilheiros[y].chances)
                    }

                    if(this.arrayArtilheiros[y].atleta == 'Rodrygo'){
                        this.series[0].data[3] = (this.series[0].data[3] + this.arrayArtilheiros[y].gols)
                        this.series[1].data[3] = (this.series[1].data[3] + this.arrayArtilheiros[y].assistencias)
                        this.series[2].data[3] = (this.series[2].data[3] + this.arrayArtilheiros[y].chances)
                    }

                    if(this.arrayArtilheiros[y].atleta == 'Vinícius Júnior'){
                        this.series[0].data[4] = (this.series[0].data[4] + this.arrayArtilheiros[y].gols)
                        this.series[1].data[4] = (this.series[1].data[4] + this.arrayArtilheiros[y].assistencias)
                        this.series[2].data[4] = (this.series[2].data[4] + this.arrayArtilheiros[y].chances)
                    }

                    if(this.arrayArtilheiros[y].atleta == 'Richarlison'){
                        this.series[0].data[5] = (this.series[0].data[5] + this.arrayArtilheiros[y].gols)
                        this.series[1].data[5] = (this.series[1].data[5] + this.arrayArtilheiros[y].assistencias)
                        this.series[2].data[5] = (this.series[2].data[5] + this.arrayArtilheiros[y].chances)
                    }

                    if(this.arrayArtilheiros[y].atleta == 'Pedro'){
                        this.series[0].data[6] = (this.series[0].data[6] + this.arrayArtilheiros[y].gols)
                        this.series[1].data[6] = (this.series[1].data[6] + this.arrayArtilheiros[y].assistencias)
                        this.series[2].data[6] = (this.series[2].data[6] + this.arrayArtilheiros[y].chances)
                    }

                    if(this.arrayArtilheiros[y].atleta == 'Gabriel Jesus'){
                        this.series[0].data[7] = (this.series[0].data[7] + this.arrayArtilheiros[y].gols)
                        this.series[1].data[7] = (this.series[1].data[7] + this.arrayArtilheiros[y].assistencias)
                        this.series[2].data[7] = (this.series[2].data[7] + this.arrayArtilheiros[y].chances)
                    }

                    if(this.arrayArtilheiros[y].atleta == 'Matheus Cunha'){
                        this.series[0].data[8] = (this.series[0].data[8] + this.arrayArtilheiros[y].gols)
                        this.series[1].data[8] = (this.series[1].data[8] + this.arrayArtilheiros[y].assistencias)
                        this.series[2].data[8] = (this.series[2].data[8] + this.arrayArtilheiros[y].chances)
                    }
                    
                }

                this.loaded = true;

            }

        }

    }
</script>

<style>

</style>