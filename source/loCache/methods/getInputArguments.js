export const getInputArguments = {
    getInputArguments(route) {
        return this.fractalInputArguments[this.routeMap[route]]
        
    }
}