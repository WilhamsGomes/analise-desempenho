<template>
    <v-data-table  :headers="headers" :items="desserts" class="elevation-1" >
        <template v-slot:top>
            <v-toolbar flat > 
                <v-row class="d-flex justify-end align-baseline">
                    <v-text-field v-model="search" append-icon="mdi-magnify" class="ml-4"
                        label="Pesquisar atleta" single-line hide-details @click:append="searchPlayer">
                    </v-text-field>
                </v-row>

                <!--DIALOGO PARA EDITAR-->
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">Adicionar insight</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                            <v-row>
                                <v-col cols="12" sm="6">
                                <v-text-field
                                    v-model="editedItem.apelidoAtleta"
                                    label="Nome Atleta"
                                ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6">
                                <v-select
                                      :items="arrayPartidas"
                                      label="Adversário"
                                      required
                                      v-model="editedItem.nomeAdversario"
                                ></v-select>
                                </v-col>

                                <v-col cols="12" sm="6"  >
                                <v-text-field
                                        v-model="editedItem.gols"
                                        type="number"
                                        label="Gols na partida"
                                        required
                                ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6"  >
                                <v-text-field
                                        v-model="editedItem.assistencias"
                                        type="number"
                                        label="Assistências na partida"
                                        required
                                ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6"  >
                                <v-text-field
                                        v-model="editedItem.cartoesAmarelo"
                                        type="number"
                                        label="Cartões amarelo"
                                        required
                                ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6"  >
                                <v-text-field
                                        v-model="editedItem.cartoesVermelho"
                                        type="number"
                                        label="Cartões vermelho"
                                        required
                                ></v-text-field>
                                </v-col>
                                
                                <v-col cols="12" sm="6"  >
                                <v-text-field
                                        v-model="editedItem.chancesCriadas"
                                        type="number"
                                        label="Chances criadas"
                                        required
                                ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6"  >
                                <v-text-field
                                        v-model="editedItem.chancesPerdidas"
                                        type="number"
                                        label="Chances perdidas"
                                        required
                                ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6"  >
                                <v-text-field
                                        v-model="editedItem.faltasCometidas"
                                        type="number"
                                        label="Faltas cometidas"
                                        required
                                ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6"  >
                                <v-text-field
                                        v-model="editedItem.minutosJogados"
                                        type="number"
                                        label="Minutos jogados"
                                        required
                                ></v-text-field>
                                </v-col>

                            </v-row>
                            </v-container>
                        </v-card-text>
            
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="#00695C" text @click="close" >
                            Cancelar
                            </v-btn>
                            <v-btn color="#00695C" text @click="saved()" >
                            Salvar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="dialogInsight" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="text-h5 ml-6">Insights do atleta {{editedItem.apelidoAtleta}}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" v-for="(item, index) in insights" :key="index">
                                        <v-list>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title> {{item.title}} </v-list-item-title>
                                                    <v-list-item-subtitle> {{item.dados}} </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-col>  
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="#00695C" text @click="close" >
                                Fechar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)" >
            mdi-plus
          </v-icon>
          <v-icon small class="mr-2" @click="seeInsight(item)" >
            mdi-magnify-plus-outline
          </v-icon>
        </template>
    </v-data-table> 
  </template>
  
<script>

    import axios from "axios";
    import Modal from './Modal.vue'

    export default {
        name: "DataTableIndividual",

        data: () => ({
            arrayPartidas: [],
            search: "",
            dialogInsight: false,
            dialog: false,
            dialogDelete: false,
            headers: [
                { text: "ID", value: "id" },
                {
                    text: "Atleta",
                    align: "start",
                    sortable: true,
                    value: "apelidoAtleta",
                },
                { text: "Posição", value: "posicaoAtleta" },
                { text: "Peso (kg)", value: "pesoAtleta" },
                { text: "Altura (cm)", value: "alturaAtleta" },
                { text: "Perna dominante", value: "pernaAtleta" },
                { text: "Data de nascimento", value: "dtNascimentoAtleta" },
                { text: "Actions", value: "actions", sortable: false },
            ],

            desserts: [],
            editedIndex: -1,

            editedItem: {
                id: 0,
                apelidoAtleta: 0,
                nomeAdversario: 0,
                gols: 0,
                assistencias: 0,
                cartoesAmarelo: 0,
                cartoesVermelho: 0,
                chancesCriadas: 0,
                chancesPerdidas: 0,
                faltasCometidas: 0,
                minutosJogados: 0,

            },

            defaultItem: {
               
            },

            insights:[
                {title: 'Gols', dados:0},
                {title: 'Assistências', dados:0},
                {title: 'Chances criadas', dados:0},
                {title: 'Chances perdidas',  dados:0},
                {title: 'Faltas cometidas',  dados:0},
                {title: 'Cartões amarelos',  dados:0},
                {title: 'Cartões vermelhos',  dados:0},
                {title: 'Minutos jogados',  dados:0}
            ],

        }),

        watch: {
            dialog(val) {
                val || this.close();
            }
        },

        created() {
            this.getAtletas();
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
                    }
                    this.getHistorico();
                });
            },

            async searchPlayer() {
                fetch("http://localhost:8080/analise/buscarPorNome?name=" + this.search).then((response) => {
                    return response.json();
                }).then((jsonParsed) => {
                    const data = jsonParsed;
                    this.desserts = data;
                    for (var x = 0; x < (this.desserts).length; x++) {
                        let dataFormat = (this.desserts[x].dtNascimentoAtleta).split("T");
                        this.desserts[x].dtNascimentoAtleta = dataFormat[0];
                    }
                });
            },

            async getHistorico() {
                axios
                    .get("http://localhost:8080/historico")
                    .then((response) => {
                        return response.data
                    }).then((jsonParsed) =>{

                        const data = jsonParsed;
                        for(var x=0; x<data.length; x++){
                            let dataFormat = (data[x].dataPartida).split("T")
                            this.arrayPartidas.push(data[x].timeAdversario + ", " + dataFormat[0])
                        }

                    })
                    .catch((error) => {
                            console.log(error);
                    });
            },

            async saved() {

                const data = {
                    nmAtleta: this.editedItem.apelidoAtleta,
                    nmAdversario:  (this.editedItem.nomeAdversario.split(","))[0] ,
                    golsFeitos:  this.editedItem.gols,
                    assistencias:  this.editedItem.assistencias,
                    chancesReaisCriadas:  this.editedItem.chancesCriadas,
                    chancesReaisPerdidas:  this.editedItem.chancesPerdidas,
                    faltasCometidas:  this.editedItem.faltasCometidas,
                    cartoesAmarelo:  this.editedItem.cartoesAmarelo,
                    cartoesVermelho:  this.editedItem.cartoesVermelho,
                    minJogados:  this.editedItem.minutosJogados
                }                

                const dataJson = JSON.stringify(data);  

                axios.post("http://localhost:8080/dados/individuais", dataJson, {headers: {"Content-Type": "application/json"} })
                    .then((response) => {
                        console.log(response)
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                alert("Dados salvos com sucesso!")
                location.reload()
                this.close();

            },

            async searchInsight(nameAtleta){

                axios
                    .get("http://localhost:8080/dados/buscarInsight?name=" + nameAtleta)
                    .then((response) => {
                        return response.data
                    }).then((jsonParsed) => {
                        const data = jsonParsed

                        if(data != "Dados de atleta não encontrado"){

                            for (var x = 0; x < data.length; x++){
                                this.insights[0].dados = (this.insights[0].dados + data[x].golsFeitos)
                                this.insights[1].dados = (this.insights[1].dados + data[x].assistencias)
                                this.insights[2].dados = (this.insights[2].dados + data[x].chancesReaisCriadas)
                                this.insights[3].dados = (this.insights[3].dados + data[x].chancesReaisPerdidas)
                                this.insights[4].dados = (this.insights[4].dados + data[x].faltasCometidas)
                                this.insights[5].dados = (this.insights[5].dados + data[x].cartoesAmarelo)
                                this.insights[6].dados = (this.insights[6].dados + data[x].cartoesVermelho)
                                this.insights[7].dados = (this.insights[7].dados + data[x].minJogados)
                            } 

                        }
                       

                    })
                    .catch((error) => {
                        console.log(error)
                    });

            },

            editItem(item) {
                this.editedIndex = this.desserts.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
            },

            close() {
                this.dialog = false;
                this.dialogInsight = false;
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                });
            },

            seeInsight(item){

                this.insights[0].dados = 0
                this.insights[1].dados = 0
                this.insights[2].dados = 0
                this.insights[3].dados = 0
                this.insights[4].dados = 0
                this.insights[5].dados = 0
                this.insights[6].dados = 0
                this.insights[7].dados = 0

                this.editedIndex = this.desserts.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialogInsight = true;
                this.searchInsight(this.editedItem.apelidoAtleta)
            },


        },
        components: { 
            Modal 
        }
    }
  </script>