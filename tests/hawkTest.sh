#!/bin/bash

totalRequests=${1:-1}

echo "[Hawk] Running performance test with the following amount of requests: ${totalRequests}"

start=$(date +%s%N)

for ((requestIndex = 0; requestIndex < $totalRequests; requestIndex ++)); do
    curl -s "http://localhost:8080/example" > /dev/null

done

end=$(date +%s%N)

duration=$(( ( end - start ) / 1000000))

echo "[Hawk] Test finished in $duration miliseconds"