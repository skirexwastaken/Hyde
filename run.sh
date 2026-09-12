#!/usr/bin/env bash

clear

leftBuffer=12
rightBuffer=12

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

            node hyde.js | tee -a "${logFullPath}"

        else 
            node hyde.js

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

    *)
    echo "[Hyde Runtime] Options overview"
    echo ""
    printf "%-${leftBuffer}s %${rightBuffer}s\n" "hyde" "Launches hyde"
    printf "%-${leftBuffer}s %${rightBuffer}s\n" "docker" "Launches hyde inside of docker"
    printf "%-${leftBuffer}s %${rightBuffer}s\n" "fractal" "Launches Fractal CLI"
    echo ""
    printf "%-${leftBuffer}s %${rightBuffer}s\n" "fractalTest" "Launches test of Fractal"
    echo ""
    printf "%-${leftBuffer}s %${rightBuffer}s\n" "development" "Add behind options to run in development mode"
    printf "%-${leftBuffer}s %${rightBuffer}s\n" "production" "Add behind options to run in production mode"

    ;;

esac