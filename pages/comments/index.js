import {useState} from 'react'
function Comments(){
    const [comments,setComments] = useState([])
    const [input ,setInput] = useState('')
    const fetchComments = async () => {
        const resp = await fetch("http://localhost:3000/api/comments")
        const data = await resp.json()
        setComments(data)
    }
    const submitComment = async () => {
        const resp = await fetch("http://localhost:3000/api/comments",{
            method:'POST',
            body:JSON.stringify({comment:input}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await resp.json()
        console.log(data)
    }

    const deleteComment = async (id) => {
        const resp = await fetch(`http://localhost:3000/api/comments/${id}`,{
            method:'DELETE'
        })
        fetchComments();
    }
    return (
        <div>
            <input type={'text'} value={input} onChange={e => setInput(e.target.value)}/>
            <button onClick={submitComment}>Submit Comment</button>
            <button onClick={fetchComments}>Load Comments</button>
            {
                comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <h1>{comment.text}</h1>
                            <button onClick ={() => deleteComment(comment.id)}>Delete this comment</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Comments;