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

            "../../source/hawk/hawk.js",

        // loCache

            // constants
                "../../source/loCache/constants/initCache.js",

            // methods

                // cache
                    "../../source/loCache/methods/cache/cacheCss.js",
                    "../../source/loCache/methods/cache/cacheIcon.js",
                    "../../source/loCache/methods/cache/cacheImage.js",
                    "../../source/loCache/methods/cache/cacheMarkdown.js",

                // get´
                    "../../source/loCache/methods/get/getFile.js",

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
                "../../source/marker/methods/processMarkdown.js",

            "../../source/marker/marker.js",

        // mytharis
            "../../source/mytharis/mytharis.js",

        // startupScripts
            "../../source/startupScripts/consoleCleaner.js",
            "../../source/startupScripts/consoleDebug.js",
            "../../source/startupScripts/fileIntegrityCheck.js",
            "../../source/startupScripts/garbageCollector.js",
            "../../source/startupScripts/systemLog.js",

        // workerPool

            // methods
                "../../source/workerPool/methods/addWorker.js",
                "../../source/workerPool/methods/initWorkers.js",
                "../../source/workerPool/methods/processQueue.js",
                "../../source/workerPool/methods/runTask.js",

            "../../source/workerPool/workerPool.js",

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

        process.exit()

    }
}

console.log("[File Integrity Check] All files were found")