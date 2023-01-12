export const MQTT_PYTHON_CODE = `
import paho.mqtt.client as paho

def on_subscribe(client, userdata, mid, granted_qos):
    print("Subscribed: "+str(mid)+" "+str(granted_qos))

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.qos)+" "+str(msg.payload))   
    global res
    res = str(msg.payload)[2:]
    res = res.replace("'","")

    # print(res) 

client = paho.Client()
client.on_subscribe = on_subscribe
client.on_message = on_message
client.connect('broker.hivemq.com', 1883)
client.subscribe('MY_TOPIC/#', qos=2)

client.loop_forever()
print(res)
` as const;