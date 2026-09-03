export const asyncSleep = {
    asyncSleep (millisecond) {
        return new Promise((resolve) => setTimeout(resolve, millisecond));
    }
}