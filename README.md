# GVH Abfahrtzeiten
![screenshot](doc/bild.png)
Die Anwendung zeigt die nächsten 4 Abfahrtzeiten von der gewählte Haltestelle (station) an. Default ist die Haltestelle Messe-Ost. Liegen keiner Echtzeitinformationen vor, so wird die Zeitanzeige in kursiv dargestellt.
## Installation
Zunächst müssen die Abhängigkeiten installiert werden, via
```
npm install
```
Anschließend kann der Server gestartet werden über..
```
npm start
```
Nun kann über einen Browser die Seite **http://localhost:8999** aufgerufen werden!

Alternativ kann ser Server auch wie folgt gestartet werden:
```
node Server.js [station] [Port]
```
- station: Stationsnummer 
- port: Portnummer 
## Docker Container
Es existiert auch ein Dockercontainer. Dieser kann wie folgt gestartet werden:
```
docker run -p 8999:8999 service.joerg-tuttas.de:5555/root/gvhanzeige

```
Als Umgebungsvariable kann STATION auf einen anderen Wert gesetzt werden.
```
docker run -p 8999:8999 -e STATION=25001795  service.joerg-tuttas.de:5555/root/gvhanzeige
```

