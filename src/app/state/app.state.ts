import { postReducer, PostState } from "./post/post.reducer";
import { selectPostState } from "./post/post.selector";

export const reducers={
    posts:postReducer,

}

export type AppState={
    // posts: PostState;
    [K in keyof typeof reducers]: ReturnType<typeof reducers[K]> // creating custom type from the reducer
}