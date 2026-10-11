#!/bin/bash

# GNU GENERAL PUBLIC LICENSE
# Version 3, 29 June 2007
#
# Copyright (C) 2026 Daniel Hora
# 
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <https://www.gnu.org/licenses/>.

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