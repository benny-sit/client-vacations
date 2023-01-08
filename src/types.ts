
export type Vacation = {
    id: number,
    
    destination: string,
    description: string,
    
    startDate: Date,
    endDate: Date,

    price: number,
    imageUrl: string,

    isFollowing: boolean,
}


export type CurrentUser = {
    username: string,
    userId: number,
} | null