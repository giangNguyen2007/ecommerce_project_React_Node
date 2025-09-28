import './SingleProduct.css'
import React, { useState, useEffect, useContext } from 'react'

import { useLocation } from 'react-router-dom'
import { adminRequest } from '../../axios'
import SelectAddCart from '../../components/SelectAndAddCart/SelectAddCartModule'
import { fetchSingleProduct } from '../../customHooks/cartAPI'
import { IProduct, IProductComment } from '../../Types'
import RatingAndComments from '../../components/RatingAndComments/RatingAndComments'
import CommentList from '../../components/Comments/CommentList'
import { fetchtProductComment } from '../../customHooks/productAPI'
import CssTest from '../../components/CSS_test/CSS_test'
import CommentForm from '../../components/Comments/CommentForm'
import { AuthContext } from '../../context/AuthContext'


const SingleProductPage = () => {

    console.log("rerender page")
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const {user} = useContext(AuthContext);

    const [product, setProduct] = useState<IProduct | null>(null);
    const [comments, setComments] = useState<IProductComment[] | null>(null);
    const [commentNb, setCommentNb] = useState<number>(0);
    const [isCommentSubmitted, setIsCommentSubmitted] = useState<boolean>(false);

    
    // fetch product data
    useEffect(() => {
        const getSingleProduct = async () => { 
            try {
                const fetchedProduct = await fetchSingleProduct(productId)
                setProduct(fetchedProduct)

                // set number of submitted comment
                setCommentNb(fetchedProduct.comments.length)
          
            } catch (error) {
                console.log(error)    
            }
        }
        getSingleProduct(); 
    
    }, [productId])

    // fetch product comments
    useEffect(() => {

        const getProductComments = async () => { 
            try {
                const fetchedComments = await fetchtProductComment(productId)
                setComments(fetchedComments)

                // set number of submitted comment
                // updated when user add or delete comment
                setCommentNb(fetchedComments.length)

                // check if user has already submitted comments
                // find user Id in the list of comments
                if (user){
                    const findIndex = fetchedComments.findIndex((comment) => comment.authorId === user.id)
                    if(findIndex > -1){
                        setIsCommentSubmitted(true)
                    } else {
                        setIsCommentSubmitted(false)
                    }
                } 

            } catch (error) {
                console.log(error)    
            }
        }
        getProductComments(); 
    
    }, [user, productId, commentNb])

    // handle function to change page state => refetch comments after comment change
    const handleAddComment = () => {
        setCommentNb(commentNb + 1);

    }
    const handleDeleteComment = () => {
        setCommentNb(commentNb - 1);
    }




  return (
        <div className="p-prod-single-wrapper">

            {/* <button onClick={(e) => handleAddComment()}>Change</button>
            <button onClick={(e) => handleDeleteComment()}>Reduce</button>
            <div>{newCommentNb}</div> */}

            <div className="main-section">
                <div className="img-container">
                    <img className='left-img'
                        src={product?.img} alt={"product image"}
                    />
                </div>

                <div className="info-container" >
                    <div className='product-title'>{product?.title}</div>

                    <p className='product-desc'>{product?.desc}</p>

                    <div className='price'>€ {product?.price}</div>

                    {product? <SelectAddCart product={product} /> : null}

                    <RatingAndComments rating={4} nbComments={commentNb} ratingSize='small' />
                </div>
            </div>

            {/* {isCommentSubmitted && <div> Comment submitted</div>} */}
            
            <div className="comment-section">
                {/* form for submitting new comment from identified user */}
                <CommentForm 
                        productId={productId}
                        isCommentSubmitted = {isCommentSubmitted}
                        handleAddComment={handleAddComment}
                />
                {/* list of all existing comments */}
                {comments && <CommentList comments = {comments} productId={productId} handleDelete={handleDeleteComment}/>}
                
            </div>
          
            
        </div>
  )
}

export default SingleProductPage