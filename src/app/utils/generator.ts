export function generateUniqueRoomId() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    const roomId = `${timestamp}${randomNum}`;
    return roomId;
}