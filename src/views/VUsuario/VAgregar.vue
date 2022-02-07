<style module>
.input_txt {
  border: 1px solid #848484;
  padding: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 5px;
  color: #0b2f3a;
  max-width: 558px;
  min-width: 158px;
  text-transform: uppercase;
}

.form {
  font-family: Arial;
  font-size: 9pt;
  background-color: #e0ebeb;
  color: #008585;
  border: 1px solid #e0ebeb;
}
</style>

<template>
  <div class="container" :class="$style.form">
    <h4>
      {{ titulo }} <small style="color: #c6462b">(campo requerido *)</small>
    </h4>
    <hr />

    <form @submit.prevent="agr_usu">
      <table>
        <tbody>
          <tr>
            <td>
              <label>Nombre: <small style="color: #c6462b">*</small></label
              ><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Nombre"
                v-model="usuCuenta.perNombre"
              />
            </td>
            <td>
              <label>Apellido:<small style="color: #c6462b">*</small></label
              ><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Apellido"
                v-model="usuCuenta.perApellido"
              />
            </td>
            <td>
              <label
                >Tipo de Documento:
                <small style="color: #c6462b">*</small></label
              ><br />
              <select :class="$style.input_txt" v-model="selec">
                <option selected disabled value="null">
                  [Seleccione]
                </option>
                <option>Cédula de Ciudadanía</option>
                <option>Tarjeta de Identidad</option>
                <option>Cédula de Extranjeria</option>
                <option>PEP</option>
              </select>
            </td>
            <td>
              <label>Documento: <small style="color: #c6462b">*</small></label
              ><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Documento"
                v-model="usuCuenta.perDocumento"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label
                >Fecha Nacimiento <small style="color: #c6462b">*</small></label
              ><br />
              <input
                type="date"
                required
                :class="$style.input_txt"
                placeholder="Digite Fecha Nacimiento"
                v-model="usuCuenta.perFecNacimiento"
              />
            </td>
            <td>
              <label>Teléfono <small style="color: #c6462b">*</small></label
              ><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Teléfono"
                v-model="usuCuenta.perTelefono"
              />
            </td>
            <td>
              <label>Departamento <small style="color: #c6462b">*</small></label
              ><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Departamento"
                v-model="usuCuenta.perDepartamento"
              />
            </td>
            <td>
              <label>Municipio <small style="color: #c6462b">*</small></label
              ><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Municipio"
                v-model="usuCuenta.perMunicipio"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Login <small style="color: #c6462b">*</small></label
              ><br />
              <input
                required
                type="email"
                :class="$style.input_txt"
                placeholder="Digite Correo"
                v-model="email"
              />
            </td>
            <td>
              <label>Contraseña <small style="color: #c6462b">*</small></label
              ><br />
              <input
                type="password"
                :class="$style.input_txt"
                placeholder="Digite Contraseña"
                required
                v-model="password"
              />
            </td>
            <td>
              <label>Rol <small style="color: #c6462b">*</small></label
              ><br />
              <select
                :class="$style.input_txt"
                v-model="selec1"
                @change="onChange(selec1)"
              >
                <option selected disabled value="null">[Seleccione]</option>
                <option v-for="r in rol" :key="r.key" :value="r">
                  {{ r.rolNombre }}
                </option>
              </select>
            </td>
            <div v-if="this.variableGlobal == true">
              <td>
                <label>Especialidad:</label><br />
                <select :class="$style.input_txt" v-model="selec2">
                  <option selected disabled value="null">
                    [Seleccione]
                  </option>
                  <option v-for="e in esp" :key="e.key" :value="e">
                    {{ e.espCups + " " + e.espNombre }}
                  </option>
                </select>
              </td>
              <td>
                <label>Registro Profesional: </label><br />
                <input
                  type="text"
                  :class="$style.input_txt"
                  placeholder="Digite Registro"
                  required
                  v-model="usuCuenta.perRegProfesional"
                />
              </td>
            </div>
          </tr>
        </tbody>
      </table>
      <br />
      <div class="form-row">
        <div class="form-group col-md-2">
          <button
            class="btn btn-primary btn-block"
            style="background-color: #7752CA;"
            id="button"
          >
            Registrar
          </button>
        </div>

        <div class="form-group col-md-2">
          <router-link class="btn btn-danger btn-block" to="/lis_usu"
            >Regresar</router-link
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { db, auxFirebaseSession } from "../../firebaseDb";

export default {
  data() {
    return {
      titulo: "AGREGAR USUARIO",
      usuCuenta: {},
      selec: null,
      selec1: null,
      selec2: null,
      email: "",
      password: "",
      esp: [],
      rol: [],
      variableGlobal: false
    };
  },

  name: "agr_usu",
  methods: {
    onChange(selec1) {
      if (selec1.rolNombre == "medico") {
        this.variableGlobal = true;
        console.log("medico");
      } else {
        this.variableGlobal = false;
      }
    },

    agr_usu() {
      //Creación de la cuenta con la sesión secundaria
      //agrego cuenta autenticada con firebase
      auxFirebaseSession
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(userCredential => {
          //agrego el usuario persona

          if (this.selec2 != null) {
            db.collection("persona")
              .add({
                idUsuario: userCredential.user.uid,
                perNombre: this.usuCuenta.perNombre,
                perApellido: this.usuCuenta.perApellido,
                perTipDocumento: this.selec,
                perDocumento: this.usuCuenta.perDocumento,
                perFecNacimiento: this.usuCuenta.perFecNacimiento,
                perTelefono: this.usuCuenta.perTelefono,
                perDepartamento: this.usuCuenta.perDepartamento,
                perMunicipio: this.usuCuenta.perMunicipio,
                perEntidad: "IPS NUEVA POPAYAN",
                tipoRol: this.selec1.rolNombre,
                idEspecialidad: this.selec2,
                perRegProfesional: this.usuCuenta.perRegProfesional
              })
              .then(() => {
                alert("Cuenta de usuario creado correctamente!");
                this.usuCuenta.perNombre = "";
                this.usuCuenta.perApellido = "";
                this.selec = "";
                this.usuCuenta.perFecNacimiento = "";
                this.usuCuenta.perTelefono = "";
                this.usuCuenta.perDepartamento = "";
                this.usuCuenta.perApellido = "";
                this.usuCuenta.perMunicipio = "";
                this.usuCuenta.perRegProfesional = "";
                this.email = "";
                this.password = "";
                this.selec1 = "";
                this.selec2 = "";
                this.$router.replace("/lis_usu");
                //  router.push('/lis_usu')
              });
          } else {
            db.collection("persona")
              .add({
                idUsuario: userCredential.user.uid,
                perNombre: this.usuCuenta.perNombre,
                perApellido: this.usuCuenta.perApellido,
                perTipDocumento: this.selec,
                perDocumento: this.usuCuenta.perDocumento,
                perFecNacimiento: this.usuCuenta.perFecNacimiento,
                perTelefono: this.usuCuenta.perTelefono,
                perDepartamento: this.usuCuenta.perDepartamento,
                perMunicipio: this.usuCuenta.perMunicipio,
                tipoRol: this.selec1.rolNombre,
                idEspecialidad: this.selec2,
                perRegProfesional: this.usuCuenta.perRegProfesional
              })
              .then(() => {
                alert("Cuenta de usuario creado correctamente!");
                this.usuCuenta.perNombre = "";
                this.usuCuenta.perApellido = "";
                this.selec = "";
                this.usuCuenta.perFecNacimiento = "";
                this.usuCuenta.perTelefono = "";
                this.usuCuenta.perDepartamento = "";
                this.usuCuenta.perApellido = "";
                this.usuCuenta.perMunicipio = "";
                this.usuCuenta.perRegProfesional = "";
                this.email = "";
                this.password = "";
                this.selec1 = "";
                this.selec2 = "";
                this.$router.replace("/lis_usu");
                //  router.push('/lis_usu')
              });
          }
        })
        .catch(error => {
          console.log(error);
        });

      //Cierro la nueva sesión de la cuenta auxiliar
      auxFirebaseSession.auth().signOut();
    }
  },
  created() {
    db.collection("especialidad").onSnapshot(snapshotChange => {
      this.esp = [];
      snapshotChange.forEach(doc => {
        this.esp.push({
          key: doc.id,
          espCups: doc.data().espCups,
          espNombre: doc.data().espNombre
        });
      });
    }),
      db
        .collection("rol")
        .where("rolNombre", "!=", "administrador")
        .onSnapshot(snapshotChange => {
          this.rol = [];
          snapshotChange.forEach(doc => {
            this.rol.push({
              key: doc.id,
              rolNombre: doc.data().rolNombre
            });
          });
        });
  }
};
</script>
