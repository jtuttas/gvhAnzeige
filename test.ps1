$r=Invoke-RestMethod "https://efa107.efa.de/efaws2/default/XML_DM_REQUEST?outputFormat=JSON&sessionID=0&requestID=0&language=de&useRealtime=1&coordOutputFormat=WGS84[DD.ddddd]&locationServerActive=1&mode=direct&dmLineSelectionAll=1&depType=STOPEVENTS&useAllStops=1&command=null&type_dm=stop&name_dm=25001811&itdTime=1655&itdDate=20200228&outputEncoding=UTF-8&inputEncoding=UTF-8&mId=efa_www"
foreach ($d in $r.departureList) {
    $time=$d.realDateTime
    $time
}