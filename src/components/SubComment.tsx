import { useEffect, useState } from "react";
import { Image, ListGroup } from "react-bootstrap"
import { get_user } from "../api/store";
import { SubCommentInterface, SubCommentProps } from "../type/subcomment.type";

export const SubComment: React.FC<SubCommentProps> = ({user_id, comment}: SubCommentProps) => {
    const  [account, setAccount] = useState<SubCommentInterface|null>(null);
    useEffect(() => {
        handleDataUser();
    }, [])

    const handleDataUser = async() => {
    const {data} = await get_user(user_id);
    setAccount({...data.result.user});
    }
    return (
        <>
            <ListGroup.Item>
                <Image src={account?.image}/>
                <strong>{account?.first_name===""?account.email:account?.first_name+""+account?.last_name}</strong>: {comment}
            </ListGroup.Item>
        </>
    )
}