#!/usr/bin/env bash

clear

leftBuffer=18
rightBuffer=18

currentDate=$(date '+%Y-%m-%d')

logDirectory="./logs"
logFilename="${currentDate}.log"

mode=${2:-"development"}

if [[ "$mode" != "production" && "$mode" != "development" ]]; then
    echo "[Hyde Runtime] Unrecognized mode '$2'. Defaulting to 'development' mode."

fi

case $1 in

    "hyde")
        echo "[Hyde Runtime] Launching Hyde in $mode mode"

        if [[ "$mode" == "production" ]]; then
            mkdir -p "${logDirectory}/hyde"

            logFullPath="${logDirectory}/hyde/${logFilename}"

            node --env-file=.env hyde.js | tee -a "${logFullPath}"

        else 
            node --env-file=.env hyde.js

        fi

    ;;
 
    "docker")
        echo "[Hyde Runtime] Launching Hyde inside of docker in $mode mode"

        if [[ "$mode" == "production" ]]; then
            mkdir -p "${logDirectory}/hydeDocker"

            logFullPath="${logDirectory}/hydeDocker/${logFilename}"

            sudo docker compose up | tee -a "${logFullPath}"

        else
            sudo docker compose up 

        fi

    ;;

    "fractal")
        echo "[Hyde Runtime] Launching Fractal CLI in $mode mode"

        if [[ "$mode" == "production" ]]; then
            mkdir -p "${logDirectory}/fractalCli"

            logFullPath="${logDirectory}/fractalCli/${logFilename}"

            node ./tools/fractalCli.js | tee -a "${logFullPath}"   

        else
            node ./tools/fractalCli.js

        fi

    ;;

    "fractalTest")
        echo "[Hyde Runtime] Launching Fractal test in $mode mode"

        if [[ "$mode" == "production" ]]; then
            mkdir -p "${logDirectory}/tests/fractalTest"

            logFullPath="${logDirectory}/tests/fractalTest/${logFilename}"

            node ./tests/fractalTest.js | tee -a "${logFullPath}"   

        else
            node ./tests/fractalTest.js

        fi

    ;;

    "hawkTestPerformance")
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

    "garbageCollector")
        echo "[Hyde Runtime] Launching Garbage Collector in $mode mode"

        if [[ "$mode" == "production" ]]; then
            mkdir -p "${logDirectory}/startupScripts/garbageCollector"

            logFullPath="${logDirectory}/startupScripts/garbageCollector/${logFilename}"

            node ./source/startupScripts/garbageCollector.js | tee -a "${logFullPath}"   

        else
            node ./source/startupScripts/garbageCollector.js

        fi

    ;;

    *)
    echo "[Hyde Runtime] Options overview"
    echo ""
    printf "%-${leftBuffer}s %-${rightBuffer}s\n" "hyde" "Launches hyde"
    printf "%-${leftBuffer}s %-${rightBuffer}s\n" "docker" "Launches hyde inside of docker"
    printf "%-${leftBuffer}s %-${rightBuffer}s\n" "fractal" "Launches Fractal CLI"
    echo ""
    printf "%-${leftBuffer}s %-${rightBuffer}s\n" "fractalTest" "Tests if Fractal interprets code correctly"
    printf "%-${leftBuffer}s %-${rightBuffer}s\n" "hawkTestPerformance" "Tests the performance of Hawk, requires Hawk instance running"
    echo ""
    printf "%-${leftBuffer}s %-${rightBuffer}s\n" "garbageCollector" "Cleans left over html and fsc files"
    echo ""
    printf "%-${leftBuffer}s %-${rightBuffer}s\n" "development" "Add behind options to run in development mode"
    printf "%-${leftBuffer}s %-${rightBuffer}s\n" "production" "Add behind options to run in production mode"

    ;;

esac