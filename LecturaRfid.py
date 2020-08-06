#Se importan las librerias correspondientes
import threading
import RPi.GPIO as GPIO
import time
import paho.mqtt.client as mqtt
import serial

Entrada=serial.Serial('/dev/ttyUSB0',baudrate=9600)  #Comunicacion puerto usb
Salida=serial.Serial('/dev/ttyUSB1',baudrate=9600) #Comunicacion puerto usb
GPIO.setmode(GPIO.BOARD)
GPIO.setup(7, GPIO.OUT)


# Declaracion de Variables
configuracion = False
txt=""
Rfid=""
serial_number="SCA00000000"
ta =5
#Formatos de envio pantalla nextion

#funciones

def ante_conexion_exitosa(client, userdata, flags, rc):
    client.subscribe(serial_number + "/comandos")
    Client.subscribe(serial_number + "/username")
    print("Conexion exitosa")

def ante_llegada_mensaje(client, userdata, masagge):
    topic_str = masagge.topic
    if topic_str == serial_number + "/comandos":
        mensaje = masagge.payload.decode("utf-8")
        if mensaje == "Autorizado":
            print("Puerta Abierta")
            Abrir(ta)
        if mensaje == "Denegado":
            print("Puerta Cerrada")
        if mensaje == "Abrir":
            Abrir(ta)
        if mensaje == "Cerrar":
            print("Puerta Cerrada")


def Abrir(x):
    GPIO.output(7, True)
    time.sleep(x)
    GPIO.output(7, False)

client = mqtt.Client()
client.on_connect = ante_conexion_exitosa
client.on_message = ante_llegada_mensaje

client.username_pw_set("lyftec","lyftec2019")
client.connect("localhost", 1883, 60)
client.publish(serial_number + "/config","Inicializando")

#Comienzo de programa
while True:
    client.loop()
    while Entrada.inWaiting() > 0:
        txt = Entrada.read().decode(encoding="utf-8")
        Rfid += txt
        Sentido ="/Entrada"
    while Salida.inWaiting() > 0:
        txt = Salida.read().decode(encoding="utf-8")
        Rfid +=txt
        Sentido="/Salida"
    if Rfid !="":
        client.publish(serial_number + "/access" + Sentido, Rfid)
        Rfid =""
        Sentido=""
