#!/bin/bash

# First argument or 1
totalRequests=${1:-1}

echo "[Hawk] Running performance test with the following amount of requests: ${totalRequests}"

# Start time in seconds
start=$(date +%s%N)

for ((requestIndex = 0; requestIndex < $totalRequests; requestIndex ++)); do
    curl -s "http://localhost:8080/example" > /dev/null

done

# End time in seconds
end=$(date +%s%N)

# Durating on miliseconds
duration=$(( ( end - start ) / 1000000))

echo "[Hawk] Test finished in $duration miliseconds"