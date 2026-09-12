clear

leftBuffer=10
rightBuffer=10

currentDate=$(date '+%Y-%m-%d')

logDirectory="./logs"
logFilename="${currentDate}.log"

echo "${logFullPath}"

case $1 in

    "hyde")
        echo "[Hyde Runtime] Launching Hyde"

        logFullPath="${logDirectory}/hyde/${logFilename}"

        node hyde.js | tee -a "${logFullPath}"

    ;;
 
    "docker")
        echo "[Hyde Runtime] Launching Hyde inside of docker"

        logFullPath="${logDirectory}/hydeDocker/${logFilename}"

        sudo docker-compose up | tee -a "${logFullPath}"

    ;;

    "cli")
        echo "[Hyde Runtime] Launching Fractal CLI"

        logFullPath="${logDirectory}/fractalCli/${logFilename}"

        node ./tools/fractalCli.js | tee -a "${logFullPath}"   

    ;;

    *)
    echo "[Hyde Runtime] Options overview"
    echo ""
    printf "%-${leftBuffer}s %${rightBuffer}s\n" "hyde" "Launches hyde"
    printf "%-${leftBuffer}s %${rightBuffer}s\n" "docke" "Launches hyde inside of docker"
    printf "%-${leftBuffer}s %${rightBuffer}s\n" "cli" "Launches Fractal CLI"

    ;;

esac