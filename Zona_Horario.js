var moment = require("moment");
var mysql = require('mysql');
var mqtt = require('mqtt');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lyftec2019",
  database: "admin_SmartControlAcces"
});

var options = {
  port: 1883,
  host: '127.0.0.1',
  clientId: 'acces_control_server_' + Math.round(Math.random() * (0- 10000) * -1) ,
  username: 'lyftec',
  password: 'lyftec2019',
  keepalive: 60,
  reconnectPeriod: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clean: true,
  encoding: 'utf8'
};

var client = mqtt.connect(options);

function casediasa(zonahorario,users_id,users_name,serial_number,sentido){
  var dia = moment().locale("es").format('dddd');
  switch (dia){
    case "lunes":
    var query = "SELECT * FROM Zona_Horaria WHERE Zona_Horaria_id = '" + zonahorario + "'";
    con.query(query, function (err, result, fields) {
      if (err) throw err;
      var d_i = result[0].Zona_Horaria_01_Horario_I;
      var d_t = result[0].Zona_Horaria_01_Horario_T;
      var d_i = moment(d_i,"HH:mm:ss");
      var d_t = moment(d_t,"HH:mm:ss");
      console.log(d_i);
      console.log(d_t);
      var dif = moment().isBetween(d_i, d_t);
      console.log(dif);
      if ( dif == true){
        var query = "SELECT Users_sentido FROM Users WHERE " + users_id + "";
        con.query(query, function (err, result, fields) {
          if (err) throw err;
          var users_sentido = result[0].Users_sentido;
          if (users_sentido == sentido){
            client.publish(serial_number + "/comandos","Denegado");
            client.publish(serial_number + "/username/control","Antipasback/Denegado");
            console.log("Usuario ya entro por esta puerta");
          }
          if (users_sentido != sentido){
            client.publish(serial_number + "/username",users_name);
            client.publish(serial_number + "/username/control",users_name + "/Autorizado");
            client.publish(serial_number + "/comandos","Autorizado");
            console.log("Usuario se le permite ingreso por Antipasback");
            var query = "UPDATE `admin_SmartControlAcces`.`Users` SET `Users_Sentido`='" + sentido + "' WHERE  `Users_id`=" + users_id + ";";
            con.query(query, function (err, result, fields) {
              if (err) throw err;
            });
          }
        });
      }else{
        client.publish(serial_number + "/comandos","Denegado");
        client.publish(serial_number + "/username/control","Horario incorrecto/Denegado");
        console.log("Usuario no autorizado por horario");
      }
    });
    break;
    case "martes":
    var query = "SELECT * FROM Zona_Horaria WHERE Zona_Horaria_id = '" + zonahorario + "'";
    con.query(query, function (err, result, fields) {
      if (err) throw err;
      var d_i = result[0].Zona_Horaria_02_Horario_I;
      var d_t = result[0].Zona_Horaria_02_Horario_T;
      var d_i = moment(d_i,"HH:mm:ss");
      var d_t = moment(d_t,"HH:mm:ss");
      console.log(d_i);
      console.log(d_t);
      var dif = moment().isBetween(d_i, d_t);
      console.log(dif);
      if ( dif == true){
        var query = "SELECT Users_sentido FROM Users WHERE " + users_id + "";
        con.query(query, function (err, result, fields) {
          if (err) throw err;
          var users_sentido = result[0].Users_sentido;
          if (users_sentido == sentido){
            client.publish(serial_number + "/comandos","Denegado");
            client.publish(serial_number + "/username/control","Antipasback/Denegado");
            console.log("Usuario ya entro por esta puerta");
          }
          if (users_sentido != sentido){
            client.publish(serial_number + "/username",users_name);
            client.publish(serial_number + "/username/control",users_name + "/Autorizado");
            client.publish(serial_number + "/comandos","Autorizado");
            console.log("Usuario se le permite ingreso por Antipasback");
            var query = "UPDATE `admin_SmartControlAcces`.`Users` SET `Users_Sentido`='" + sentido + "' WHERE  `Users_id`=" + users_id + ";";
            con.query(query, function (err, result, fields) {
              if (err) throw err;
            });
          }
        });
      }else{
        client.publish(serial_number + "/comandos","Denegado");
        client.publish(serial_number + "/username/control","Horario incorrecto/Denegado");
        console.log("Usuario no autorizado por horario");
      }
    });
    break;
    case "miércoles":
    var query = "SELECT * FROM Zona_Horaria WHERE Zona_Horaria_id = '" + zonahorario + "'";
    con.query(query, function (err, result, fields) {
      if (err) throw err;
      var d_i = result[0].Zona_Horaria_03_Horario_I;
      var d_t = result[0].Zona_Horaria_03_Horario_T;
      var d_i = moment(d_i,"HH:mm:ss");
      var d_t = moment(d_t,"HH:mm:ss");
      console.log(d_i);
      console.log(d_t);
      var dif = moment().isBetween(d_i, d_t);
      console.log(dif);
      if ( dif == true){
        var query = "SELECT Users_sentido FROM Users WHERE " + users_id + "";
        con.query(query, function (err, result, fields) {
          if (err) throw err;
          var users_sentido = result[0].Users_sentido;
          if (users_sentido == sentido){
            client.publish(serial_number + "/comandos","Denegado");
            client.publish(serial_number + "/username/control","Antipasback/Denegado");
            console.log("Usuario ya entro por esta puerta");
          }
          if (users_sentido != sentido){
            client.publish(serial_number + "/username",users_name);
            client.publish(serial_number + "/username/control",users_name + "/Autorizado");
            client.publish(serial_number + "/comandos","Autorizado");
            console.log("Usuario se le permite ingreso por Antipasback");
            var query = "UPDATE `admin_SmartControlAcces`.`Users` SET `Users_Sentido`='" + sentido + "' WHERE  `Users_id`=" + users_id + ";";
            con.query(query, function (err, result, fields) {
              if (err) throw err;
            });
          }
        });
      }else{
        client.publish(serial_number + "/comandos","Denegado");
        client.publish(serial_number + "/username/control","Horario incorrecto/Denegado");
        console.log("Usuario no autorizado por horario");
      }
    });
    break;
    case "jueves":
    var query = "SELECT * FROM Zona_Horaria WHERE Zona_Horaria_id = '" + zonahorario + "'";
    con.query(query, function (err, result, fields) {
      if (err) throw err;
      var d_i = result[0].Zona_Horaria_04_Horario_I;
      var d_t = result[0].Zona_Horaria_04_Horario_T;
      var d_i = moment(d_i,"HH:mm:ss");
      var d_t = moment(d_t,"HH:mm:ss");
      console.log(d_i);
      console.log(d_t);
      var dif = moment().isBetween(d_i, d_t);
      console.log(dif);
      if ( dif == true){
        var query = "SELECT Users_sentido FROM Users WHERE " + users_id + "";
        con.query(query, function (err, result, fields) {
          if (err) throw err;
          var users_sentido = result[0].Users_sentido;
          if (users_sentido == sentido){
            client.publish(serial_number + "/comandos","Denegado");
            client.publish(serial_number + "/username/control","Antipasback/Denegado");
            console.log("Usuario ya entro por esta puerta");
          }
          if (users_sentido != sentido){
            client.publish(serial_number + "/username",users_name);
            client.publish(serial_number + "/username/control",users_name + "/Autorizado");
            client.publish(serial_number + "/comandos","Autorizado");
            console.log("Usuario se le permite ingreso por Antipasback");
            var query = "UPDATE `admin_SmartControlAcces`.`Users` SET `Users_Sentido`='" + sentido + "' WHERE  `Users_id`=" + users_id + ";";
            con.query(query, function (err, result, fields) {
              if (err) throw err;
            });
          }
        });
      }else{
        client.publish(serial_number + "/comandos","Denegado");
        client.publish(serial_number + "/username/control","Acceso denegado por /n horario/Denegado");
        console.log("Usuario no autorizado por horario");
      }
    });
    break;
    case "viernes":
    var query = "SELECT * FROM Zona_Horaria WHERE Zona_Horaria_id = '" + zonahorario + "'";
    con.query(query, function (err, result, fields) {
      if (err) throw err;
      var d_i = result[0].Zona_Horaria_05_Horario_I;
      var d_t = result[0].Zona_Horaria_05_Horario_T;
      var d_i = moment(d_i,"HH:mm:ss");
      var d_t = moment(d_t,"HH:mm:ss");
      console.log(d_i);
      console.log(d_t);
      var dif = moment().isBetween(d_i, d_t);
      console.log(dif);
      if ( dif == true){
        var query = "SELECT Users_sentido FROM Users WHERE " + users_id + "";
        con.query(query, function (err, result, fields) {
          if (err) throw err;
          var users_sentido = result[0].Users_sentido;
          if (users_sentido == sentido){
            client.publish(serial_number + "/comandos","Denegado");
            client.publish(serial_number + "/username/control","Antipasback/Denegado");
            console.log("Usuario ya entro por esta puerta");
          }
          if (users_sentido != sentido){
            client.publish(serial_number + "/username",users_name);
            client.publish(serial_number + "/username/control",users_name + "/Autorizado");
            client.publish(serial_number + "/comandos","Autorizado");
            console.log("Usuario se le permite ingreso por Antipasback");
            var query = "UPDATE `admin_SmartControlAcces`.`Users` SET `Users_Sentido`='" + sentido + "' WHERE  `Users_id`=" + users_id + ";";
            con.query(query, function (err, result, fields) {
              if (err) throw err;
            });
          }
        });
      }else{
        client.publish(serial_number + "/comandos","Denegado");
        client.publish(serial_number + "/username/control","Horario incorrecto/Denegado");
        console.log("Usuario no autorizado por horario");
      }
    });
    break;
    case "sábado":
    var query = "SELECT * FROM Zona_Horaria WHERE Zona_Horaria_id = '" + zonahorario + "'";
    con.query(query, function (err, result, fields) {
      if (err) throw err;
      var d_i = result[0].Zona_Horaria_06_Horario_I;
      var d_t = result[0].Zona_Horaria_06_Horario_T;
      var d_i = moment(d_i,"HH:mm:ss");
      var d_t = moment(d_t,"HH:mm:ss");
      console.log(d_i);
      console.log(d_t);
      var dif = moment().isBetween(d_i, d_t);
      console.log(dif);
      if ( dif == true){
        var query = "SELECT Users_sentido FROM Users WHERE " + users_id + "";
        con.query(query, function (err, result, fields) {
          if (err) throw err;
          var users_sentido = result[0].Users_sentido;
          if (users_sentido == sentido){
            client.publish(serial_number + "/comandos","Denegado");
            client.publish(serial_number + "/username/control","Antipasback/Denegado");
            console.log("Usuario ya entro por esta puerta");
          }
          if (users_sentido != sentido){
            client.publish(serial_number + "/username",users_name);
            client.publish(serial_number + "/username/control",users_name + "/Autorizado");
            client.publish(serial_number + "/comandos","Autorizado");
            console.log("Usuario se le permite ingreso por Antipasback");
            var query = "UPDATE `admin_SmartControlAcces`.`Users` SET `Users_Sentido`='" + sentido + "' WHERE  `Users_id`=" + users_id + ";";
            con.query(query, function (err, result, fields) {
              if (err) throw err;
            });
          }
        });
      }else{
        client.publish(serial_number + "/comandos","Denegado");
        client.publish(serial_number + "/username/control","Horario incorrecto/Denegado");
        console.log("Usuario no autorizado por horario");
      }
    });
    break;
    case "domingo":
    var query = "SELECT * FROM Zona_Horaria WHERE Zona_Horaria_id = '" + zonahorario + "'";
    con.query(query, function (err, result, fields) {
      if (err) throw err;
      var d_i = result[0].Zona_Horaria_07_Horario_I;
      var d_t = result[0].Zona_Horaria_07_Horario_T;
      var d_i = moment(d_i,"HH:mm:ss");
      var d_t = moment(d_t,"HH:mm:ss");
      console.log(d_i);
      console.log(d_t);
      var dif = moment().isBetween(d_i, d_t);
      console.log(dif);
      if ( dif == true){
        var query = "SELECT Users_sentido FROM Users WHERE " + users_id + "";
        con.query(query, function (err, result, fields) {
          if (err) throw err;
          var users_sentido = result[0].Users_sentido;
          if (users_sentido == sentido){
            client.publish(serial_number + "/comandos","Denegado");
            client.publish(serial_number + "/username/control","Antipasback/Denegado");
            console.log("Usuario ya entro por esta puerta");
          }
          if (users_sentido != sentido){
            client.publish(serial_number + "/username",users_name);
            client.publish(serial_number + "/username/control",users_name + "/Autorizado");
            client.publish(serial_number + "/comandos","Autorizado");
            console.log("Usuario se le permite ingreso por Antipasback");
            var query = "UPDATE `admin_SmartControlAcces`.`Users` SET `Users_Sentido`='" + sentido + "' WHERE  `Users_id`=" + users_id + ";";
            con.query(query, function (err, result, fields) {
              if (err) throw err;
            });
          }
        });
      }else{
        client.publish(serial_number + "/comandos","Denegado");
        client.publish(serial_number + "/username/control","Horario incorrecto/Denegado");
        console.log("Usuario no autorizado por horario");
      }
    });
    break;
  }
}

function casediass(zonahorario,users_id,users_name,serial_number){
  var dia = moment().locale("es").format('dddd');
  switch (dia) {
    case "lunes":
    var query = "SELECT * FROM Zona_Horaria WHERE Zona_Horaria_id = '" + zonahorario + "'";
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        var d_i = result[0].Zona_Horaria_01_Horario_I;
        var d_t = result[0].Zona_Horaria_01_Horario_T;
        var d_i = moment(d_i,"HH:mm:ss");
        var d_t = moment(d_t,"HH:mm:ss");
        console.log(d_i);
        console.log(d_t);
        var dif = moment().isBetween(d_i, d_t);
        console.log(dif);
        if ( dif == true ){
          client.publish(serial_number + "/username",users_name);
          client.publish(serial_number + "/username/control",users_name + "/Autorizado");
          client.publish(serial_number + "/comandos","Autorizado");
        }else{
          client.publish(serial_number + "/username/control","Horario incorrecto/Denegado");
          client.publish(serial_number + "/comandos","Denegado");
        }
    });
    break;
    case "martes":
    var query = "SELECT * FROM Zona_Horaria WHERE Zona_Horaria_id = '" + zonahorario + "'";
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        var d_i = result[0].Zona_Horaria_02_Horario_I;
        var d_t = result[0].Zona_Horaria_02_Horario_T;
        var d_i = moment(d_i,"HH:mm:ss");
        var d_t = moment(d_t,"HH:mm:ss");
        console.log(d_i);
        console.log(d_t);
        var dif = moment().isBetween(d_i, d_t);
        console.log(dif);
        if ( dif == true ){
          client.publish(serial_number + "/username",users_name);
          client.publish(serial_number + "/username/control",users_name + "/Autorizado");
          client.publish(serial_number + "/comandos","Autorizado");
        }else{
          client.publish(serial_number + "/username/control","Horario incorrecto/Autorizado");
          client.publish(serial_number + "/comandos","Denegado");
        }
    });
    break;
    case "miércoles":
    var query = "SELECT * FROM Zona_Horaria WHERE Zona_Horaria_id = '" + zonahorario + "'";
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        var d_i = result[0].Zona_Horaria_03_Horario_I;
        var d_t = result[0].Zona_Horaria_03_Horario_T;
        var d_i = moment(d_i,"HH:mm:ss");
        var d_t = moment(d_t,"HH:mm:ss");
        console.log(d_i);
        console.log(d_t);
        var dif = moment().isBetween(d_i, d_t);
        console.log(dif);
        if ( dif == true ){
          client.publish(serial_number + "/username",users_name);
          client.publish(serial_number + "/username/control",users_name + "/Autorizado");
          client.publish(serial_number + "/comandos","Autorizado");
        }else{
          client.publish(serial_number + "/username/control","Horario incorrecto/Autorizado");
          client.publish(serial_number + "/comandos","Denegado");
        }
    });
    break;
    case "jueves":
    var query = "SELECT * FROM Zona_Horaria WHERE Zona_Horaria_id = '" + zonahorario + "'";
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        var d_i = result[0].Zona_Horaria_04_Horario_I;
        var d_t = result[0].Zona_Horaria_04_Horario_T;
        var d_i = moment(d_i,"HH:mm:ss");
        var d_t = moment(d_t,"HH:mm:ss");
        console.log(d_i);
        console.log(d_t);
        var dif = moment().isBetween(d_i, d_t);
        console.log(dif);
        if ( dif == true ){
          client.publish(serial_number + "/username",users_name);
          client.publish(serial_number + "/username/control",users_name + "/Autorizado");
          client.publish(serial_number + "/comandos","Autorizado");
        }else{
          client.publish(serial_number + "/username/control","Horario incorrecto/Autorizado");
          client.publish(serial_number + "/comandos","Denegado");
        }
    });
    break;
    case "viernes":
    var query = "SELECT * FROM Zona_Horaria WHERE Zona_Horaria_id = '" + zonahorario + "'";
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        var d_i = result[0].Zona_Horaria_05_Horario_I;
        var d_t = result[0].Zona_Horaria_05_Horario_T;
        var d_i = moment(d_i,"HH:mm:ss");
        var d_t = moment(d_t,"HH:mm:ss");
        console.log(d_i);
        console.log(d_t);
        var dif = moment().isBetween(d_i, d_t);
        console.log(dif);
        if ( dif == true ){
          client.publish(serial_number + "/username",users_name);
          client.publish(serial_number + "/username/control",users_name + "/Autorizado");
          client.publish(serial_number + "/comandos","Autorizado");
        }else{
          client.publish(serial_number + "/username/control","Horario incorrecto/Denegado");
          client.publish(serial_number + "/comandos","Denegado");
        }
    });
    break;
    case "sábado":domingo
    var query = "SELECT * FROM Zona_Horaria WHERE Zona_Horaria_id = '" + zonahorario + "'";
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        var d_i = result[0].Zona_Horaria_06_Horario_I;
        var d_t = result[0].Zona_Horaria_06_Horario_T;
        var d_i = moment(d_i,"HH:mm:ss");
        var d_t = moment(d_t,"HH:mm:ss");
        console.log(d_i);
        console.log(d_t);
        var dif = moment().isBetween(d_i, d_t);
        console.log(dif);
        if ( dif == true ){
          client.publish(serial_number + "/username",users_name);
          client.publish(serial_number + "/username/control",users_name + "/Autorizado");
          client.publish(serial_number + "/comandos","Autorizado");
        }else{
          client.publish(serial_number + "/username/control","Horario incorrecto/Autorizado");
          client.publish(serial_number + "/comandos","Denegado");
        }
    });
    break;
    case "domingo":
    var query = "SELECT * FROM Zona_Horaria WHERE Zona_Horaria_id = '" + zonahorario + "'";
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        var d_i = result[0].Zona_Horaria_07_Horario_I;
        var d_t = result[0].Zona_Horaria_07_Horario_T;
        var d_i = moment(d_i,"HH:mm:ss");
        var d_t = moment(d_t,"HH:mm:ss");
        console.log(d_i);
        console.log(d_t);
        var dif = moment().isBetween(d_i, d_t);
        console.log(dif);
        if ( dif == true ){
          client.publish(serial_number + "/username",users_name);
          client.publish(serial_number + "/username/control",users_name + "/Autorizado");
          client.publish(serial_number + "/comandos","Autorizado");
        }else{
          client.publish(serial_number + "/username/control","Horario incorrecto/Autorizado");
          client.publish(serial_number + "/comandos","Denegado");
        }
    });
    break;
  }
  }

exports.casediasa=casediasa;
exports.casediass=casediass;
