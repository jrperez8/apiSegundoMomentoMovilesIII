import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
//import { findDOMNode } from "react-dom";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TextInput_Student_ID: "",
      TextInput_Student_Name: "",
      TextInput_Student_Class: "",
      TextInput_Student_Phone_Num: "",
      TextInput_Student_Email: "",
    };
  }

  InsertStudent = () => {
    fetch("http://localhost:80/apireactnativeacademic/InsertStudentData.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_name: this.state.TextInput_Student_Name,
        student_class: this.state.TextInput_Student_Class,
        student_phone_num: this.state.TextInput_Student_Phone_Num,
        student_email: this.state.TextInput_Student_Email,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  FindStudent = () => {
    fetch("http://localhost:80/apireactnativeacademic/ShowStudentxId.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: this.state.TextInput_Student_ID,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          TextInput_Student_Name: responseJson[0]["student_name"],
          TextInput_Student_Class: responseJson[0]["student_class"],
          TextInput_Student_Phone_Num: responseJson[0]["student_phone_num"],
          TextInput_Student_Email: responseJson[0]["student_email"],
        });
      })
      .catch((error) => {
        alert("No se encuentra el Id");
        this.setState({
          TextInput_Student_ID: "",
          TextInput_Student_Name: "",
          TextInput_Student_Class: "",
          TextInput_Student_Phone_Num: "",
          TextInput_Student_Email: "",
        });
      });
  };
  UpdateStudent = () => {
    fetch(
      "http://localhost:80/apireactnativeacademic/UpdateStudentRecord.php",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: this.state.TextInput_Student_ID,
          student_name: this.state.TextInput_Student_Name,
          student_class: this.state.TextInput_Student_Class,
          student_phone_num: this.state.TextInput_Student_Phone_Num,
          student_email: this.state.TextInput_Student_Email,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        alert("Estudiante actualizado correctamente ...");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  DeleteStudent = () => {
    fetch(
      "http://localhost:80/apireactnativeacademic/DeleteStudentRecord.php",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: this.state.TextInput_Student_ID,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        alert("Estudiante eliminado correctamente ...");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  AllStudents = () =>{
    fetch(
      "http://localhost:80/apireactnativeacademic/ShowAllStudentsList.php",
      {
        method:"POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
        })
      }
    )
  };
  CleanStudents = () => {
    this.setState({
      TextInput_Student_ID: "",
      TextInput_Student_Name: "",
      TextInput_Student_Class: "",
      TextInput_Student_Phone_Num: "",
      TextInput_Student_Email: "",
    });
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 7 }}>
          {" "}
          Registro de Estudiante{" "}
        </Text>
        <TextInput
          placeholder="Ingrese el Id del estudiante"
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Student_ID: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={this.state.TextInput_Student_ID}
        />
        <TextInput
          placeholder="Ingrese el nombre del estudiante"
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Student_Name: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={this.state.TextInput_Student_Name}
          autoFocus={true}
        />
        <TextInput
          placeholder="Ingrese la clase del estudiante"
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Student_Class: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={this.state.TextInput_Student_Class}
        />
        <TextInput
          placeholder="Ingrese número de teléfono"
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Student_Phone_Num: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={this.state.TextInput_Student_Phone_Num}
        />
        <TextInput
          placeholder="Ingrese el correo electrónico"
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Student_Email: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          value={this.state.TextInput_Student_Email}
        />
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.InsertStudent}
        >
          <Text style={styles.TextStyle}> Agregar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.FindStudent}
        >
          <Text style={styles.TextStyle}> Buscar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.UpdateStudent}
        >
          <Text style={styles.TextStyle}> Editar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.DeleteStudent}
        >
          <Text style={styles.TextStyle}> Eliminar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
        >
          <Text style={styles.TextStyle}> Listar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.CleanStudents}
        >
          <Text style={styles.TextStyle}> Limpiar </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    alignItems: "center",
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#fff",
  },

  TextInputStyleClass: {
    textAlign: "center",
    width: "90%",
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: "#FF5722",
    borderRadius: 5,
  },

  TouchableOpacityStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: "90%",
    backgroundColor: "orange",
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center",
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
