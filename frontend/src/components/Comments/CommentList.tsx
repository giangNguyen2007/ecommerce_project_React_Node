import './CommentList.css'
import { AccountBoxRounded, DeleteOutlined } from '@material-ui/icons'
import { Rating } from '@mui/material'
import React, {useContext} from 'react'
import { IProductComment } from '../../Types'
import { AuthContext } from '../../context/AuthContext'
import { baseRequest } from '../../axios'

type CommentListProps = {
  productId: string
  comments : IProductComment[]
  handleDelete: () => void
}

type SingleCommentProps = {
  productId: string
  commentId: string
  authorName: string
  authorId: string
  userId?: string
  content : string
  rating: number
  handleDelete: () => void
}

const CommentList = ( {comments, productId, handleDelete}: CommentListProps) => {
  const {user } = useContext(AuthContext);

  return (
    <div className = 'comment-list-wrapper'>
        {comments.map(
            comment => (<SingleComment
                                        key={comment.id}
                                        productId= {productId}
                                        authorName={comment.author.username}
                                        commentId= {comment.id} 
                                        authorId={comment.authorId}
                                        userId={user?.id} 
                                        content={comment.content}
                                        rating={comment.rating}
                                        handleDelete={handleDelete}
                        />)
          )
        }
    </div>
  
  )
}

const SingleComment = ( {commentId, authorName, authorId, content, rating, userId, productId, handleDelete}: SingleCommentProps) => {

  const handleDeleteComment = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { 
    if (userId === authorId){
        try {
            const res = await baseRequest.delete(`/comment/${commentId}`);
            // const res = await baseRequest.delete(`/comment?authorId=${authorId}&productId=${productId}`);

            // call function passed from page => update page state and reload page
            handleDelete();
        } catch (error: any) {
            throw Error(error)
        }
    }
  }

  return (
    <div className = 'single-comment-wrapper'>

        <div className="left-block">
            <div className='user-block'>
                <AccountBoxRounded/>
                <div> {authorName}</div>
            </div>
            <Rating value={rating} readOnly size={"small"}/>
        </div>
        
        <div className="comment-content"> {content}</div>
   
        <div className={ (authorId===userId)? "delete-icon active" : "delete-icon inactive"}
              onClick={handleDeleteComment}>
            <DeleteOutlined/>
        </div>

    </div>
  )
}
export default CommentList;