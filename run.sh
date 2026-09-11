echo "[Hyde Runtime Helper] Processing your request"

case $1 in

    "hyde")
        node hyde.js

    ;;

    "docker")
        sudo docker-compose up

    ;;

    "cli")
        node ./tools/fractalCli.js        

    ;;

esac