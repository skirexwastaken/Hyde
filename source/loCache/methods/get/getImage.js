export const getImage = {
    getImage(route) {
        return this.imageFiles[this.imageRouteMap[route]]
        
    }
}