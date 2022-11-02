<template>
    <v-data-table  :headers="headers" :items="desserts" class="elevation-1" >
        <template v-slot:top>
            <v-toolbar flat > 
                <v-row class="d-flex justify-end align-baseline">
                    <v-text-field v-model="search" append-icon="mdi-magnify" class="ml-4"
                        label="Pesquisar atleta" single-line hide-details @click:append="searchPlayer">
                    </v-text-field>
                    <Modal class="ml-16"/> 
                </v-row>

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
                                v-model="editedItem.nomeAtleta"
                                label="Nome Atleta"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6"  >
                              <v-select
                                      :items="['Goleiro', 'Lateral Esquerdo', 'Lateral Direito', 'Zagueiro', 'Volante', 'Meio-campo', , 'Ponta', 'Centroavante']"
                                      label="Posição"
                                      required
                                      v-model="editedItem.posicaoAtleta"
                              ></v-select>
                            </v-col>

                            <v-col cols="12" sm="6"  >
                              <v-text-field
                                v-model="editedItem.paisNascimentoAtleta"
                                label="País de nascimento"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6"  >
                              <v-text-field
                                v-model="editedItem.pesoAtleta"
                                label="Peso (kg)"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12"  sm="6"  >
                              <v-text-field
                                v-model="editedItem.alturaAtleta"
                                label="Altura"
                              ></v-text-field>
                            </v-col>
                            
                            <v-col cols="6" >
                                  <v-text-field
                                      label="Data de nascimento"
                                      type="date"
                                      required
                                      v-model="editedItem.dtNascimentoAtleta"
                                  ></v-text-field>
                              </v-col>
                              
                              <v-col cols="12" sm="6" >
                                  <v-select
                                      :items="['Esquerda', 'Direita', 'Ambas']"
                                      label="Perna preferencial"
                                      required
                                      v-model="editedItem.pernaAtleta"
                                  ></v-select>
                              </v-col>

                          </v-row>
                        </v-container>
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
                      <v-btn color="red" text @click="deleteItemConfirm(editedItem.id)">Sim</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
            </v-toolbar>
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
import Modal from './Modal.vue'
    export default {
    name: "DataTable",
    data: () => ({
        search: "",
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
            nomeAtleta: 0,
            pesoAtleta: 0,
            posicaoAtleta: 0,
            alturaAtleta: 0,
            pernaAtleta: 0,
            dtNascimentoAtleta: 0,
            paisNascimentoAtleta: 0
        },

        defaultItem: {
            name: "",
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },

    }),

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
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
        
        async deleteItemConfirm(idDelete) {

          const req = await fetch("http://localhost:8080/analise/"+idDelete, {
              method: "DELETE",
              headers: {"Content-Type": "application/json"},
          });
          alert("Atleta excluído com sucesso!")
          location.reload()
          this.closeDelete();
        },

        async updated(idEdit) {

          const data = {
              nomeAtleta: this.editedItem.nomeAtleta,
              apelidoAtleta: this.editedItem.apelidoAtleta,
              posicaoAtleta: this.editedItem.posicaoAtleta,
              dtNascimentoAtleta: this.editedItem.dtNascimentoAtleta,
              paisNascimentoAtleta: this.editedItem.paisNascimentoAtleta,
              pernaAtleta: this.editedItem.pernaAtleta,
              pesoAtleta: this.editedItem.pesoAtleta,
              alturaAtleta: this.editedItem.alturaAtleta
          }

          const dataJson = JSON.stringify(data);
          
          const req = await fetch("http://localhost:8080/analise/"+idEdit, {
              method: "PUT",
              headers: {"Content-Type": "application/json"},
              body: dataJson
          });

            alert("Atleta editado com sucesso!")
            location.reload()
            this.close();
        },

    },
    components: { Modal }
}
  </script>