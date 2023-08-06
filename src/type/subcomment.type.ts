export interface SubCommentInterface {
    first_name: string
    last_name: string
    email: string
    code: string
    image: string
}

export interface SubCommentProps {
    user_id: string
    comment: string
}