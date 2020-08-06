import serial
import time
import hashlib
import MySQLdb
from pyfingerprint.pyfingerprint import PyFingerprint

db = MySQLdb.connect(host="localhost", user="root", passwd="lyftec2019", db="admin_SmartControlAcces")
curs= db.cursor()

def fingerscan():
    try:
        f = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)
        if ( f.verifyPassword() == False ):
            raise ValueError('El lector biometrico no tiene la clave correcta')
    except Exception as e:
        print('El lector de huella no se a iniciado')
        print('Problema siguiente: ' + str(e))
        exit(1)
    try:
        print('Coloque el dedo')
        while ( f.readImage() == False ):
            pass
        f.convertImage(0x01) ## Se convierte una imagen en el bufer 1
        result = f.searchTemplate()
        positionNumber = result[0]

        if ( positionNumber >= 0 ):
            print('Template already exists at position #' + str(positionNumber))
            exit(1)
        print('Sacar dedo')
        time.sleep(2)
        print('Coloque el mismo dedo otra vez')

        while ( f.readImage() == False ):
            pass

        f.convertImage(0x02)

        if ( f.compareCharacteristics() == 0 ):
            raise Exception('Fingers do not match')
        f.createTemplate()
        positionNumber = f.storeTemplate()
        print('Finger enrolled successfully!')
        f.loadTemplate(positionNumber, 0x01)
        char_store =  str(f.downloadCharacteristics(0x01))
        return positionNumber, char_store

    except Exception as e:
        print('Operacion fallida')
        print('Mensaje de ecepcion: ' + str(e))
        exit(1)

def fingerdelete():
    try:
        f = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)

        if ( f.verifyPassword() == False ):
            raise ValueError('The given fingerprint sensor password is wrong!')

    except Exception as e:
        print('The fingerprint sensor could not be initialized!')
        print('Exception message: ' + str(e))
        exit(1)

    ## Gets some sensor information
    print('Currently used templates: ' + str(f.getTemplateCount()) +'/'+ str(f.getStorageCapacity()))

    ## Tries to delete the template of the finger
    try:
        positionNumber = input('Please enter the template position you want to delete: ')
        positionNumber = int(positionNumber)

        if ( f.deleteTemplate(positionNumber) == True ):
            print('Template deleted!')

    except Exception as e:
        print('Operation failed!')
        print('Exception message: ' + str(e))
        exit(1)

def fingersearch():
    try:
        f = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)

        if ( f.verifyPassword() == False ):
            raise ValueError('The given fingerprint sensor password is wrong!')

    except Exception as e:
        print('The fingerprint sensor could not be initialized!')
        print('Exception message: ' + str(e))
        exit(1)

    ## Gets some sensor information
    print('Currently used templates: ' + str(f.getTemplateCount()) +'/'+ str(f.getStorageCapacity()))

    ## Tries to search the finger and calculate hash
    try:
        print('Waiting for finger...')

        ## Wait that finger is read
        while ( f.readImage() == False ):
            pass

        ## Converts read image to characteristics and stores it in charbuffer 1
        f.convertImage(0x01)

        ## Searchs template
        result = f.searchTemplate()

        positionNumber = result[0]
        accuracyScore = result[1]

        if ( positionNumber == -1 ):
            print('No match found!')
            exit(0)
        else:
            print('Found template at position #' + str(positionNumber))
            print('The accuracy score is: ' + str(accuracyScore))

        ## OPTIONAL stuff
        ##

        ## Loads the found template to charbuffer 1
        f.loadTemplate(positionNumber, 0x01)

        ## Downloads the characteristics of template loaded in charbuffer 1
        characterics = str(f.downloadCharacteristics(0x01)).encode('utf-8')

        ## Hashes characteristics of template
        print('SHA-2 hash of template: ' + hashlib.sha256(characterics).hexdigest())

    except Exception as e:
        print('Operation failed!')
        print('Exception message: ' + str(e))
        exit(1)

def fingeruplead():
    try:
        f = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)

        if ( f.verifyPassword() == False ):
            raise ValueError('The given fingerprint sensor password is wrong!')

    except Exception as e:
        print('The fingerprint sensor could not be initialized!')
        print('Exception message: ' + str(e))
        exit(1)

    try:
        print('Currently used templates: ' + str(f.getTemplateCount()) +'/'+ str(f.getStorageCapacity()))
        curs.execute("SELECT * FROM Finger WHERE Finger_users_id = '1' && Finger_id_templete = '0'")
        results = curs.fetchall()
        for row in results:
            fingerid = row[2]
            fingertemple = row[3]
            print(fingerid)
            print(fingertemple)

    except Exception as e:
        print('Exception message: ' + str(e))
        exit(1)

while True:
    print("Que desea hacer")
    flag = True
    while flag == True:
        eleccion = input('1:Registrar 2:Borrar 3:Scanear 4:Subir Huella  ')
        eleccion = int(eleccion)
        if eleccion == 1:
            result = fingerscan()
            curs.execute("INSERT INTO `admin_SmartControlAcces`.`Finger` (`Finger_users_id`, `Finger_id_templete`, `Finger_templete`) VALUES ('%s', '%s', '%s')" %(1,result[0],result[1]))
            db.commit()
            print("Dedo insertado")
            flag = False
        if eleccion == 2:
            fingerdelete()
            flag = False
        if eleccion ==3:
            fingersearch()
            flag = False
        if eleccion ==4:
            fingeruplead()
            flag = False
