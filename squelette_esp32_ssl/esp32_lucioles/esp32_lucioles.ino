#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h> // by Benoit Blanchon
#include <Wire.h>
#include <WiFiClientSecure.h>
#include <ssl_client.h>
#include "OneWire.h"
#include "DallasTemperature.h"
#include "net_misc.h"
#include <time.h>
WiFiClientSecure espClient; // Wifi
PubSubClient client(espClient) ; // MQTT client

String whoami; // Identification de CET ESP au sein de la flotte
int32_t i = 0;
//StaticJsonBuffer<200> jsonBuffer;
time_t now;
/*===== MQTT broker/server and TOPICS ========*/
//const char* mqtt_server = "192.168.1.100";
const char* mqtt_server = "broker.hivemq.com";

#define TOPIC_TEMP "sensors/temp"

/*=============== SETUP =====================*/

void setup () {
  // Serial
  Serial.begin (9600);
  
  /* Wifi */
 // Access Point of the infrastructure
 //const char* ssid = "HUAWEI-6EC2";
 //const char *password= "FGY9MLBL"; 
 //const char* ssid = "HUAWEI-553A";
 const char* ssid = "SSID";
 const char *password= "PSWD";
 Serial.println("\nConnecting Wifi to ");
 Serial.println(ssid);
 WiFi.setHostname("Thomas");
 WiFi.mode(WIFI_AP_STA);
 Serial.print("Attempting to connect ");
 WiFi.begin(ssid, password);
 while(WiFi.status() != WL_CONNECTED){
   delay(1000);
   Serial.print(".");
 }
  Serial.println();
  Serial.print("Connected to ");
  Serial.println(ssid);

  Serial.print("Setting time using SNTP");
  configTime(-5 * 3600, 0, "pool.ntp.org", "time.nist.gov");
  now = time(nullptr);
  while (now < 1510592825) {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
  }
  Serial.println("");
  struct tm timeinfo;
  gmtime_r(&now, &timeinfo);
  Serial.print("Current time: ");
  Serial.print(asctime(&timeinfo));

  espClient.setCACert(certificat);
  Serial.print("\nWiFi connected !\n");
  Serial.print("IP address: ");
  Serial.print(WiFi.localIP());
  Serial.print("\n");
  Serial.print("MAC address: ");
  Serial.print(WiFi.macAddress());
  Serial.print("\n");
  
  /*  L'ESP est un client du mqtt_server */
  client.setServer(mqtt_server, 1883);
  // set callback when publishes arrive for the subscribed topic
  // methode a effet local => on n'a pas a initier/verifier la connection.
  client.setCallback(mqtt_pubcallback);

  /* Choix d'une identification pour cet ESP ---*/
  // whoami = "esp1"; 
  whoami =  String(WiFi.macAddress());
}

/*============== MQTT CALLBACK ===================*/

void mqtt_pubcallback(char* topic, byte* message, unsigned int length) {
  /* 
   *  Callback if a message is published on this topic.
   */
  
  // Byte list to String ... plus facile a traiter ensuite !
  // Mais sans doute pas optimal en performance => heap ?
  String messageTemp ;
  for(int i = 0 ; i < length ; i++) {
    messageTemp += (char) message[i];
  }
  
  Serial.print("Message : ");
  Serial.println(messageTemp);
  Serial.print("arrived on topic : ");
  Serial.println(topic) ;

}

/*============= MQTT SUBSCRIBE =====================*/

void mqtt_mysubscribe(char* topicTemp) {
  /*
   * ESP souscrit a ce topic. Il faut qu'il soit connecte.
   */
  while(!client.connected()) { // Loop until we are reconnected
    Serial.print("Attempting MQTT connection...");
    if(client.connect("Thomas", "try", "try")) { // Attempt to connect 
      Serial.println("connected");
      // Subscribe aux topics
      client.subscribe(topicTemp);
    } else { // Connection failed
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println("try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5*1000);
    }
  }
}

/*============= ACCESSEURS ====================*/

float get_template() {
  float temp;
  return temp;
}

/*================= LOOP ======================*/
void loop () {
  char data[80];
  String payload; // Payload : "JSON ready" 
  int32_t period = 1000l; // Publication period
 
  
  /* Subscribe to TOPIC_LED if not yet ! */
  if (!client.connected()) {
    mqtt_mysubscribe((char*) (TOPIC_TEMP));
    
  }
  i++;
  if(i==60){
      /* Publish Temperature & Light periodically */
    i=0;
    payload = "{\"who\": \"";
    payload += whoami;   
    payload += "\", \"value\": " ;
    payload += get_template(); 
    payload += "}";
    
    payload.toCharArray(data, (payload.length() + 1)); // Convert String payload to a char array
    Serial.println(data);
    client.publish(TOPIC_TEMP, data);  // publish it 

  delay(period);
  client.loop(); // Process MQTT ... obligatoire une fois par loop()
  }
}
