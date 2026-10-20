/*
GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) 2026 Daniel Hora

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url"

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))

const coreProjectFiles = [
    // Source

        // Constants
            "../../source/constants/macros.js",
            "../../source/constants/paths.js",

        // Fractal
            "../../source/fractal/constants/functions.js",
            "../../source/fractal/constants/instructionLimit.js",

            // coreTools

                // methods

                    // inputOutput
                        "../../source/fractal/coreTools/methods/inputOutput/clearShell.js",
                        "../../source/fractal/coreTools/methods/inputOutput/codeInput.js",
                        "../../source/fractal/coreTools/methods/inputOutput/shellOutput.js",

                    // math
                        "../../source/fractal/coreTools/methods/math/convertToNumberUsingAscii.js",
                        "../../source/fractal/coreTools/methods/math/fractalEval.js",
                        "../../source/fractal/coreTools/methods/math/isNumber.js",

                "../../source/fractal/coreTools/coreTools.js",

            // memoryManager

                // methods
                    "../../source/fractal/memoryManager/methods/allocateMemorySpace.js",
                    "../../source/fractal/memoryManager/methods/getVariableValue.js",
                    "../../source/fractal/memoryManager/methods/setVariableValue.js",


                "../../source/fractal/memoryManager/memoryManager.js",

            // methods
                // argumentsSupport
                    "../../source/fractal/methods/argumentsSupport/checkInputArguments.js",
                    "../../source/fractal/methods/argumentsSupport/generateOutputArguments.js",
                    "../../source/fractal/methods/argumentsSupport/loadInputArguments.js",

                // compiler
                    "../../source/fractal/methods/compiler/argumentCounter.js",
                    "../../source/fractal/methods/compiler/argumentCountVerifier.js",
                    "../../source/fractal/methods/compiler/compile.js",
                    "../../source/fractal/methods/compiler/lexer.js",
                    "../../source/fractal/methods/compiler/parser.js",
                    "../../source/fractal/methods/compiler/scanner.js",

                // interpreter
                    "../../source/fractal/methods/interpreter/execute.js",
                    "../../source/fractal/methods/interpreter/interpreter.js",

            "../../source/fractal/fractal.js",

        // hawk

            // methods
                "../../source/hawk/methods/assembleResponse.js",
                "../../source/hawk/methods/initServer.js",
                "../../source/hawk/methods/runServer.js",

            // workerPool

            // methods
                "../../source/hawk/workerPool/methods/addWorker.js",
                "../../source/hawk/workerPool/methods/initWorkers.js",
                "../../source/hawk/workerPool/methods/processQueue.js",
                "../../source/hawk/workerPool/methods/runTask.js",

            "../../source/hawk/workerPool/workerPool.js",

            "../../source/hawk/hawk.js",

        // loCache

            // constants
                "../../source/loCache/constants/initCacheContent.js",

            // methods

                "../../source/loCache/methods/cacheFile.js",
                "../../source/loCache/methods/getFile.js",
                "../../source/loCache/methods/initCache.js",

            "../../source/loCache/loCache.js",

        // marker

            // methods

                // inputOutput
                    "../../source/marker/methods/inputOutput/loadMarkdown.js",
                    "../../source/marker/methods/inputOutput/saveHtml.js",

                // segmentSpecific

                    // fractal
                        "../../source/marker/methods/segmentSpecific/fractal/compileFractalCode.js",
                        "../../source/marker/methods/segmentSpecific/fractal/extractFractal.js",

                    "../../source/marker/methods/segmentSpecific/processJsonWeb.js",
                    "../../source/marker/methods/segmentSpecific/processWrapper.js",

                "../../source/marker/methods/convert.js",
                "../../source/marker/methods/generateHtml.js",
                "../../source/marker/methods/reflowMarkdown.js",

            "../../source/marker/marker.js",

        // mytharis
            "../../source/mytharis/mytharis.js",

        // startupScripts
            "../../source/startupScripts/consoleCleaner.js",
            "../../source/startupScripts/consoleDebug.js",
            "../../source/startupScripts/fileIntegrityCheck.js",
            "../../source/startupScripts/garbageCollector.js",
            "../../source/startupScripts/systemLog.js",

        // static

            // folders
                "../../static/icons/",
                "../../static/images/",
                "../../static/scripts/",
                "../../static/styles/",

            // CSS template
                "../../static/styles/template.css",

        // templates

            // folders
                "../../templates/html/",
                "../../templates/markdown"

]

for (const coreFile of coreProjectFiles) {
    const fullFilePath = path.resolve(currentDirectory, coreFile)

    if (!(fs.existsSync(fullFilePath))) {
        console.info(`[File Integrity Check] File ${coreFile} is missing`)

        process.exit(1)

    }
}

console.log("[File Integrity Check] All files were found")

process.exit(0)