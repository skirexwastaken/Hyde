// Function that outputs print calls
// The purpose of this function rather than adding this code snipet directly to the main Fractal code where it's called is to allow customization of the output
// It could be also used for logging for example if desired
export const shellOutput = {
    shellOutput(line){
        this.shellOutputBuffer.push(line)
    }
}