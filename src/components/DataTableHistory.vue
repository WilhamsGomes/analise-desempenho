<template>
    <v-data-table :headers="headers" :items="desserts" class="elevation-1" >
        <template v-slot:top>
            <v-toolbar flat > 
                <v-toolbar-title>Histórico de partidas</v-toolbar-title>
                <v-spacer></v-spacer>
                <CadastroPartida/>
            
                <!--DIALOGO PARA EDITAR-->
                <v-dialog v-model="dialog" max-width="500px">
                  
                  <v-card>
                      <v-card-title>
                        <span class="text-h5">Editar atleta</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                        <v-row>
                            <v-col cols="12" >
                                <v-text-field
                                    label="Adversário*"
                                    required
                                    v-model="editedItem.timeAdversario"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    label="Local da partida"
                                    v-model="editedItem.localPartida"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" >
                                <v-text-field
                                    label="Data da partida"
                                    type="date"
                                    required
                                    v-model="editedItem.dataPartida"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" >
                                <v-text-field
                                    label="Quantidade gols do Brasil"
                                    type="number"
                                    v-model="editedItem.quantidadeGolsMandante"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" >
                                <v-text-field
                                    label="Quantidade gols do adversário"
                                    type="number"
                                    v-model="editedItem.quantidadeGolsVisitante"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        </v-container>
                        <small>*Campos obrigatórios</small>
                      </v-card-text>
        
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#00695C" text @click="close" >
                          Cancelar
                        </v-btn>
                        <v-btn color="#00695C" text @click="updated(editedItem.id)" >
                          Salvar
                        </v-btn>
                      </v-card-actions>
                  </v-card>

                </v-dialog>

                <!--DIALOGO PARA EXCLUIR-->
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Deseja apagar o atleta da base de dados?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="#00695C" text @click="closeDelete">Cancelar</v-btn>
                      <v-btn color="red" text @click="deleted(editedItem.id)">Sim</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

            </v-toolbar>
        </template>

        <template v-slot:[`item.quantidadeGolsMandante`]="{ item }">
            <v-chip :color="item.color" dark >
            {{ item.quantidadeGolsMandante }}
            </v-chip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)" >
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)" >
            mdi-delete
          </v-icon>
        </template>
    </v-data-table>
</template>

<script>
    import axios from "axios";
    import Modal from './Modal.vue';
    import CadastroPartida from './CadastroPartida.vue';

    export default {
    name: "DataTableHistory",
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: "Adversário",
                    align: "start",
                    sortable: false,
                    value: "timeAdversario",
                },
                { text: "Local da partida", value: "localPartida" },
                { text: "Data da partida", value: "dataPartida" },
                { text: "Gols mandante (BR)", value: "quantidadeGolsMandante" },
                { text: "Gols visitante", value: "quantidadeGolsVisitante" },
                { text: "Actions", value: "actions", sortable: false },
            ],

            desserts: [],

            editedIndex: -1,
            editedItem: {
                id: 0,
                timeAdversario: 0,
                localPartida: 0,
                dataPartida: 0,
                quantidadeGolsMandante: 0,
                quantidadeGolsMandante: 0,
            },

            defaultItem: {
                id: 0,
                timeAdversario: 0,
                localPartida: 0,
                dataPartida: 0,
                quantidadeGolsMandante: 0,
                quantidadeGolsMandante: 0,
            },

        };
    },

    mounted() {
        this.getHistorico();
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
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
                    for (var x = 0; x < (this.desserts).length; x++) {
                        let dataFormat = (this.desserts[x].dataPartida).split("T");
                        this.desserts[x].dataPartida = dataFormat[0];
                        if (this.desserts[x].quantidadeGolsMandante > this.desserts[x].quantidadeGolsVisitante) {
                            this.desserts[x].color = "green";
                        }
                        else if (this.desserts[x].quantidadeGolsMandante < this.desserts[x].quantidadeGolsVisitante) {
                            this.desserts[x].color = "red";
                        }
                        else if (this.desserts[x].quantidadeGolsMandante == this.desserts[x].quantidadeGolsVisitante) {
                            this.desserts[x].color = "yellow";
                        }
                    }
                })
                .catch((error) => {
                        console.log(error);
                });
        },

        async updated(idEdit) {

            const data = {
                timeAdversario: this.editedItem.timeAdversario,
                localPartida: this.editedItem.localPartida,
                dataPartida: this.editedItem.dataPartida,
                quantidadeGolsMandante: this.editedItem.quantidadeGolsMandante,
                quantidadeGolsVisitante: this.editedItem.quantidadeGolsVisitante
            }
            
            const dataJson = JSON.stringify(data);

            axios
            .put("http://localhost:8080/historico/"+idEdit, dataJson, {
                headers: {"Content-Type": "application/json"},
            })
            .then(() => {
                alert("Partida editada!")
                location.reload();
            })
            .catch((error) => {
                console.log(error.name + ":" + error.message)
                alert("Não foi possível editar a partida. Tente novamente!")
            });
        },

        async deleted(idEdit){
            axios
                .delete("http://localhost:8080/historico/"+idEdit)
                .then( () => {
                    alert("Partida deletada com sucesso")
                    location.reload();
                })
                .catch((error) =>{
                    alert("Houve um erro ao tentar excluir o registro!")
                });
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
    },

    components: {
        Modal,
        CadastroPartida
    }
}
</script>

<style>

</style>