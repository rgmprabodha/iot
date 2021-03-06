#include <string.h>
#include <SPI.h>
#include <WiFiNINA.h>
#include <Wire.h>
#include <DHT.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <MQTT.h>

/* Objects to handle WiFi connectivity */
WiFiClient wifi_client ;
MQTTClient mqtt_client ;

/* Server address */
byte server[] = { 192, 168, 1, 131 }; 

/*Potentiometer is connected to Analog pin 4*/
#define POTENTIOMETER_PIN A4 

#define BUTTON_PIN 2

/* Wifi info*/
const char* wifi_ssid     = "lab-iot-1"; 
const char* wifi_password = "lab-iot-1"; 

/*MQTT info*/
const char* mqtt_host = "max.isasecret.com" ;
const uint16_t mqtt_port =  1723 ;

/* Some variables to handle measurements. */
int potentiometerValue ;
int buttonState = 0;         
int pot0 = 0;

/*MQTT topic for switch light*/
String topic = "/switchLight/-10"  ;

uint32_t t0, t ;

/* Time between displays. */
#define DELTA_T 10000

void Wifireconnect() {
// Loop until we're reconnected
 while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(LED_BUILTIN, HIGH) ;
    delay(500);
    digitalWrite(LED_BUILTIN, LOW) ;
    Serial.print(".");
    delay(500);
  }

  Serial.print("\n");
  Serial.print("WiFi connected\n");
  Serial.print("IP address: \n");
  Serial.print(WiFi.localIP());
  Serial.print("\n") ;
}

void setup() {
  Serial.begin(9600) ;
  delay(100) ;
  Serial.println("Initializing...\n") ;
  
  WiFi.begin(wifi_ssid, wifi_password) ;
  Wifireconnect();
  mqtt_client.begin(mqtt_host, wifi_client) ;
//  mqtt_client.onMessage() ;
  
  // initialize the Potentiometer and button pin as inputs:
  pinMode(POTENTIOMETER_PIN, INPUT);
  pinMode(BUTTON_PIN, INPUT);

  // Time begins now!
  t0 = t = millis() ;
}

void loop() {
   mqtt_client.loop() ;
     if ( ! mqtt_client.connected() ) {
   }
   
   t = millis() ;
   if ( (t - t0) >= DELTA_T ) {
    Wifireconnect();
    t0 = t ;
    
    // read the states:
    buttonState = digitalRead(BUTTON_PIN);
    potentiometerValue = analogRead(POTENTIOMETER_PIN); 
    
    Serial.print("potentiometer value: ");
    Serial.print(potentiometerValue);

    Serial.print(" ; button value: ");
    Serial.println(buttonState);

    if(buttonState ==1)
        {
        Serial.println("button pressed");
        
        if (wifi_client.connect(server, 80)) {
            Serial.println("connected to server");
            // Make a HTTP request:
            wifi_client.println("PUT /api/0KX7DYkM6LgQ2rDmuF3zr94QY5TrsYLAqWmeIGQN/lights/15/state HTTP/1.1");
            wifi_client.println("Host: 192.168.1.131");
            wifi_client.println("Connection: keep-alive");
            wifi_client.println("Content-Type: application/json");
            wifi_client.println("Content-Length: 51");
            wifi_client.println();
            wifi_client.println("{\"on\":true}");
             mqtt_client.publish(String(topic + "/HELLO").c_str(), String(millis())) ;                 
          }
          else{
        Serial.println("not connected/sending");
         } 
  }
   
  if (abs(pot0-potentiometerValue) > 10){
    if (wifi_client.connect(server, 80)){      
        wifi_client.println("PUT /api/0KX7DYkM6LgQ2rDmuF3zr94QY5TrsYLAqWmeIGQN/lights/15/state HTTP/1.1");        
        wifi_client.println("Host: 192.168.1.131");
        wifi_client.println("Connection: keep-alive");
        wifi_client.println("Content-Type: application/json");
        wifi_client.println("Content-Length: 51");
        wifi_client.println();
        wifi_client.print("{\"on\":true,\"sat\":255,\"bri\":");
        wifi_client.print(potentiometerValue);
        wifi_client.println("}");
        Serial.println("sent");         
    }
    else{
        Serial.println("not connected/sending");
     }
  }
  pot0=potentiometerValue;
   
   // TODO get current status of light to make the switch flexible
 /* String getLightStatus(){
     if (wifi_client.connect(server, 80)) {
            Serial.println("connected to server");
            // Make a HTTP request:
            wifi_client.println("GET /api/0KX7DYkM6LgQ2rDmuF3zr94QY5TrsYLAqWmeIGQN/lights/14/state HTTP/1.1");
            wifi_client.println("Host: 192.168.1.131");
            wifi_client.println("Connection: keep-alive");
            wifi_client.println("Content-Type: application/json");
            wifi_client.println("Content-Length: 51");
            wifi_client.println();
            wifi_client.println("{\"on\":true}");                                
          }
          else{
        Serial.println("not connected/sending");
         }    
    }*/  
}

}
