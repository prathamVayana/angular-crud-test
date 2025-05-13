export interface Post{
    readonly id:number
    title?:string
    body?:string
    tags?:string[]
    reactions:reactions
    views:number
    userId:number
}

interface reactions{
    likes?:number
    dislikes?:number
}