export const getBytecode = {
    getBytecode(route) {
        return this.fractalBytecodes[this.htmlRouteMap[route]]
        
    }
}