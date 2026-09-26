#!/usr/bin/env bash

clear

# Formating used in the default case
shortcutBuffer=5
commandBuffer=21

# Building the log directory path
currentDate=$(date '+%Y-%m-%d')

logDirectory="./logs"
logFilename="${currentDate}.log"

# If the mode argument is missing, it defaults to development mode
mode=${2:-"development"}

# Translating mode shortcuts
if [[ "$mode" == "d" ]]; then
    mode="development"

elif [[ "$mode" == "p" ]]; then
    mode="production"

fi

# If the mode value is invalid, it defaults to development mode
if [[ "$mode" != "production" && "$mode" != "development" ]]; then
    echo "[Hyde Runtime] Unrecognized mode '$2'. Defaulting to 'development' mode."

fi

# Helper functions that makes sure that privateKey and publicCertificate exists
checkSSL() {
    if [ ! -f ./certificates/privateKey.pem ]; then
        echo "[Hyde Runtime] Generating Private Key"

        openssl genrsa -out ./certificates/privateKey.pem 2048

    fi

    if [ ! -f ./certificates/publicCertificate.pem ]; then
        echo "[Hyde Runtime] Generating Public Certificate"

        openssl req -new -x509 -key ./certificates/privateKey.pem -out ./certificates/publicCertificate.pem -days 365

    fi

}

# Main logic of the script
case $1 in

    # hyde or h launches hyde
    "hyde"|"h")
        echo "[Hyde Runtime] Launching Hyde in $mode mode"

        checkSSL

        if [[ "$mode" == "production" ]]; then
            mkdir -p "${logDirectory}/hyde"

            logFullPath="${logDirectory}/hyde/${logFilename}"

            node --env-file=.env hyde.js | tee -a "${logFullPath}"

        else 
            node --env-file=.env hyde.js

        fi

    ;;
    
    # docker or d launches hyde inside of a docker container
    "docker"|"d")
        echo "[Hyde Runtime] Launching Hyde inside of docker in $mode mode"

        checkSSL

        if [[ "$mode" == "production" ]]; then
            mkdir -p "${logDirectory}/hydeDocker"

            logFullPath="${logDirectory}/hydeDocker/${logFilename}"

            sudo docker compose up | tee -a "${logFullPath}"

        else
            sudo docker compose up 

        fi

    ;;

    # fractal or f launches the Fractal CLI
    "fractal"|"f")
        echo "[Hyde Runtime] Launching Fractal CLI in $mode mode"

        if [[ "$mode" == "production" ]]; then
            mkdir -p "${logDirectory}/fractalCli"

            logFullPath="${logDirectory}/fractalCli/${logFilename}"

            node ./tools/fractalCli.js | tee -a "${logFullPath}"   

        else
            node ./tools/fractalCli.js

        fi

    ;;

    # fractalTest or ft launches the Fractal test which checks if all functions return expected values
    "fractalTest"|"ft")
        echo "[Hyde Runtime] Launching Fractal test in $mode mode"

        if [[ "$mode" == "production" ]]; then
            mkdir -p "${logDirectory}/tests/fractalTest"

            logFullPath="${logDirectory}/tests/fractalTest/${logFilename}"

            node ./tests/fractalTest.js | tee -a "${logFullPath}"   

        else
            node ./tests/fractalTest.js

        fi

    ;;

    # hawkTestPerformance or htp launches a simple performance test using curl
    "hawkTestPerformance"|"htp")
        echo "[Hyde Runtime] Launching Hawk test in $mode mode"

        if [[ "$mode" == "production" ]]; then
            mkdir -p "${logDirectory}/tests/hawkTestPerformance"

            logFullPath="${logDirectory}/tests/hawkTestPerformance/${logFilename}"

            ./tests/hawkTestPerformance.sh 1 | tee -a "${logFullPath}"  

            ./tests/hawkTestPerformance.sh 10 | tee -a "${logFullPath}"  

            ./tests/hawkTestPerformance.sh 100 | tee -a "${logFullPath}"   

        else
            ./tests/hawkTestPerformance.sh 1

            ./tests/hawkTestPerformance.sh 10

            ./tests/hawkTestPerformance.sh 100

        fi

    ;;

    # garbageCollector or gc launches the Garbage Collector which cleans left over files
    "garbageCollector"|"gc")
        echo "[Hyde Runtime] Launching Garbage Collector in $mode mode"

        if [[ "$mode" == "production" ]]; then
            mkdir -p "${logDirectory}/startupScripts/garbageCollector"

            logFullPath="${logDirectory}/startupScripts/garbageCollector/${logFilename}"

            node ./source/startupScripts/garbageCollector.js | tee -a "${logFullPath}"   

        else
            node ./source/startupScripts/garbageCollector.js

        fi

    ;;

    # Default helper function that shows all available options
    *)
    echo "[Hyde Runtime] Options overview"

    # First argument part
    echo ""
    echo "> First Argument"
    echo ""

    # Hyde and Fractal
    printf "%-${commandBuffer}s %-${shortcutBuffer}s %-s\n" "hyde" "h" "Launches hyde"
    printf "%-${commandBuffer}s %-${shortcutBuffer}s %-s\n" "docker" "d" "Launches hyde inside of docker"
    printf "%-${commandBuffer}s %-${shortcutBuffer}s %-s\n" "fractal" "f" "Launches Fractal CLI"

    echo ""

    # Tests
    printf "%-${commandBuffer}s %-${shortcutBuffer}s %-s\n" "fractalTest" "ft" "Tests if Fractal interprets code correctly"
    printf "%-${commandBuffer}s %-${shortcutBuffer}s %-s\n" "hawkTestPerformance" "htp" "Tests the performance of Hawk, requires Hawk instance running"

    echo ""

    # Other utilities
    printf "%-${commandBuffer}s %-${shortcutBuffer}s %-s\n" "garbageCollector" "gc" "Cleans left over html and fsc files"

    echo ""
    echo "> Second Argument"
    echo ""

    # Mode options
    printf "%-${commandBuffer}s %-${shortcutBuffer}s %-s\n" "development" "d" "Run in development mode"
    printf "%-${commandBuffer}s %-${shortcutBuffer}s %-s\n" "production" "p" "Run in production mode"

    echo ""

    ;;

esac