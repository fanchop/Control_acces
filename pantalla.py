import serial
import paho.mqtt.client as mqtt
import time

nextion = serial.Serial('/dev/ttyAMA0',baudrate=9600)

serial_number="SCA00000000"

def ante_conexion_exitosa(client, userdata, flags, rc):
    client.subscribe(serial_number + "/username")
    client.subscribe(serial_number + "/username/control")
    client.subscribe("hora")
    client.subscribe("fecha")
    print("Conexion Exitosa")

def ante_llegada_mensaje(client, userdata, masagge):
    topic_str = masagge.topic
    if topic_str == "fecha":
        fecha = masagge.payload.decode("utf-8")
        fecha_nex(fecha)
    if topic_str == "hora":
        hora = masagge.payload.decode("utf-8")
        hora_nex(hora)
    while topic_str == serial_number + "/username/control":
        user = masagge.payload.decode("utf-8")
        user_split = user.split("/")
        user_name = user_split[0]
        control = user_split[1]
        if control == "Autorizado":
            print(user_name)
            print(control)
            acces_nex()
            controlacces_nex(control)
            usurio_nex(user_name)
            topic_str =""
        if control == "Denegado":
            print(user_name)
            print(control)
            dene_nex()
            controlacces_nex(control)
            usurio_nex(user_name)
            topic_str =""


def nextionend():
    ter="\xFF\xFF\xFF"
    nextion.write(str(ter))

def usurio_nex(username):
    usu = "Nombre.txt=\"" + username + "\""
    print(usu)
    nextionend()
    nextion.write(str(usu))
    nextionend()

def controlacces_nex(control):
    con = "AccesControl.txt=\"" + control + "\""
    print(con)
    nextionend()
    nextion.write(str(con))
    nextionend()

def inicio_nex():
    ini = "page espera"
    nextionend()
    nextion.write(str(ini))
    nextionend()

def acces_nex():
    acces = "page Autorizado"
    nextionend()
    nextion.write(str(acces))
    nextionend()

def dene_nex():
    acces = "page Denegado"
    nextionend()
    nextion.write(str(acces))
    nextionend()

def hora_nex(hora):
    hor = "Hora.txt=\"" + hora + "\""
    nextionend()
    nextion.write(str(hor))
    nextionend()

def fecha_nex(fecha):
    fech = "Fecha.txt=\"" + fecha + "\""
    nextionend()
    nextion.write(str(fech))
    nextionend()

client = mqtt.Client()
client.on_connect = ante_conexion_exitosa
client.on_message = ante_llegada_mensaje

client.username_pw_set("lyftec","lyftec2019")
client.connect("localhost", 1883, 60)

while True:
    client.loop()
