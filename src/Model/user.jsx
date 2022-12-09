class User {
    constructor(response) {
        this.userId = response['user']['id'];
        this.username = response['user']['username'];
        this.password = response['user']['password'];
        this.myPhotos = response['user']['myPhotos'];
        this.likedList = response['user']['likedList'];
    }
}

export {User};