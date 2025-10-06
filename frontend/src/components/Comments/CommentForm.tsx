import './CommentForm.css'
import { AccountBoxRounded } from '@material-ui/icons'
import { Rating } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { createProductComment, fetchtProductComment } from '../../apiServices/productAPI'
import { IProductComment } from '../../Types'

type CommentFormProps = {
  isCommentSubmitted: boolean
  productId : string
  handleAddComment: () => void
}

const CommentForm = ({isCommentSubmitted, productId, handleAddComment} : CommentFormProps) => {

  const {user} = useContext(AuthContext);
  const [content, setContent] = useState<string>('')
  const [rating, setRating] = useState<number|null>(null)
  

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>)  => { 
    e.preventDefault();

    if (user && rating){
      const newComment = {
        id: "newComment",
        content: content,
        authorId: user.id,
        author: {
          username: user.username
        }
      }

      try {
        // send creat commnet request to backend
        const createdProduct = await createProductComment(productId, user, content, rating);

        // const fetchedComments = await fetchtProductComment(productId)
        // console.log(`form fetched comment length ${fetchedComments.length}`)
        // // update comment state
        // // handleAddComment(newComment);
        // // console.log("comment state updated")
        handleAddComment();
        setContent("")
      } catch (e){
        console.log(e);
      }

    }

  }

  return (
    <div className="comment-form-container">
        <form className="form" onSubmit={ handleSubmit}>

          <div className="rating-section">
              <p>Rating :</p>
              <Rating 
                name="simple-control"
                precision={1}
                defaultValue={3}
                onChange={ (event, newValue) => { setRating(newValue)}}
              />
          </div>

          <p>Comment:</p>
          <textarea 
              // rows={5}
              // cols={3}
              onChange={(e) => setContent(e.target.value)}
              placeholder={content}
          >
          </textarea>

          <button disabled={(!user || !content || isCommentSubmitted || (rating==null))} 
              className={isCommentSubmitted||(rating==null)||(!content)||(!user)? "inactive" : "active"}
          >
              Send
          </button>

        </form>

    </div>
  
  )
}

export default CommentForm;