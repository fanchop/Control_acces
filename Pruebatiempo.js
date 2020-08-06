var mysql = require('mysql');
var mqtt = require('mqtt');
var moment = require('moment');
var zona = require('./Zona_Horario')
//CREDENCIALES MYSQL

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lyftec2019",
  database: "admin_SmartControlAcces"
});

//CREDENCIALES MQTT
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

//SE REALIZA LA CONEXION
client.on('connect', function () {
  console.log("Conexión  MQTT Exitosa!");
  client.subscribe('+/#', function (err) {
    console.log("Subscripción exitosa!")
  });
})

//CUANDO SE RECIBE MENSAJE
client.on('message', function (topic, message) { // Inicio de ciclo
  console.log("Mensaje recibido desde -> " + topic + " Mensaje -> " + message.toString());

  var topic_splitted = topic.split("/");
  var serial_number = topic_splitted[0];
  var query = topic_splitted[1];
  var sentido = topic_splitted[2];

  if(query=="access"){
    var rfid_number = message.toString();
    var query = "SELECT Devices_id FROM Devices WHERE Devices_serie = '" + serial_number + "'";
    con.query(query, function (err, result, fields) {
      if (err) throw err;
      if(result.length==1){
        var devices_id = result[0].Devices_id;
        var query = "SELECT * FROM Users_Cards WHERE cards_serie = '" + rfid_number + "'";
        con.query(query, function (err, result, fields) {
          if (err) throw err;
          if(result.length==1){
            var users_name = result[0].Users_name;
            var users_id = result[0].Users_id;
            var user_tipo = result[0].Users_Tipo;
            var user_estado = result[0].Users_estado;
            var cards_estado = result[0].Cards_estado;
            var antipasback = result[0].Users_Antipasback;
            var zonahorario = result[0].Users_Zona_Horario_id;
            if (user_estado == 1 && cards_estado == 1)
            {
              if ( user_tipo == "0"){
                if (antipasback == "1"){
                  zona.casediasa(zonahorario,users_id,users_name,serial_number,sentido);
                }else{
                  zona.casediass(zonahorario,users_id,users_name,serial_number);
                }
              }
              if ( user_tipo == "1"){
                if (antipasback == "1"){
                  zona.casediasa(zonahorario,users_id,users_name,serial_number,sentido);
                }else{
                  zona.casediass(zonahorario,users_id,users_name,serial_number);
                }
              }
              if ( user_tipo == "2"){
                client.publish(serial_number + "/username",users_name);
                client.publish(serial_number + "/username/control",users_name + "/Autorizado");
                client.publish(serial_number + "/comandos","Autorizado");
                console.log("Antipasback y Zona de horario para Usuario Administrador no es Habilitado");
              }
            }
            else
            {
              client.publish(serial_number + "/comandos","Denegado");
              client.publish(serial_number + "/username/control","No Habilitado/Denegado");
            }
          }
          else {
            client.publish(serial_number + "/comandos","Denegado");
            client.publish(serial_number + "/username/control","ID no encontrado/Denegado");
          }
        });
      }
      else {
        client.publish(serial_number + "/comandos","Denegado");
        client.publish(serial_number + "/username/control","Equipo no encontrado/Denegado");
      }
    });
  }
  if (query == "config")
  {
    var mensaje = message.toString()
    if (mensaje == "Inicializando"){
    var query = "SELECT * FROM Devices WHERE Devices_serie = '" + serial_number + "'";
    con.query(query, function (err, result, fields) {
      if (err) throw err;
      var relay = result[0].Devices_time_relay
      var relay = relay.toString();
      client.publish(serial_number + "/config",relay)
    });
  }
  }
}); // Fin de ciclo

//nos conectamos
con.connect(function(err){
  if (err) throw err;

  //una vez conectados, podemos hacer consultas.
  console.log("Conexión a MYSQL exitosa!!!");

  //hacemos la consulta
  var query = "SELECT * FROM Devices WHERE 1";
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    if(result.length>0){
    }
  });

});
//para mantener la sesión con mysql abierta
/*
setInterval(function () {
  var query ='SELECT 1 + 1 as result';

  con.query(query, function (err, result, fields) {
    if (err) throw err;
  });

}, 5000);
*/

setInterval(function () {
  var hora = moment().locale("es").format('LT');
  var fecha = moment().locale("es").format('L');
  client.publish("fecha",fecha);
  client.publish("hora",hora);
}, 1000);

/*

var query = "INSERT INTO `admin_SmartControlAcces`.`Historico` (`Historico_users_id`, `Historico_devices_id`) VALUES ('" + users_id + "', '" + devices_id + "');";
con.query(query, function (err, result, fields) {
  if (err) throw err;
});

*/
