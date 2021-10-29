import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App"

import { HeartIcon, FilledHeartIcon } from "./icons";

const Home = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        fetch('/allpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.posts)
            })
    }, [])

    const likePost = (id) => {
        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })

        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })

    }
    const unlikePost = (id) => {
        fetch('/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })

        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })

    }
    const deletePost = (postid) => {
        fetch(`/deletepost/${postid}`, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
            })
    }
    return (
        <div className="home">
            {
                data.map(item => {
                    return (
                        <div className="card home-card" key={item.id}>

                            <h5>{item.postedBy.name} {item.postedBy._id == state._id
                                && <i className="material-icons" style={{
                                    float: "right",color:"red"
                                }}
                                    onClick={() => deletePost(item._id)}
                                >delete</i>
                            }</h5>

                            <div className="card-image">
                                <img src={item.photo} />

                            </div>
                            <div className="card-content">
                               
                                {item.likes.includes(state._id)
                                    ?
                                     <FilledHeartIcon  onClick={() => { unlikePost(item._id) }} />
                                    
                                    :
                                    <HeartIcon  onClick={() => { likePost(item._id) }} />
                                    
                                }



                                <h6>{item.likes.length} likes</h6>
                                <h6 style={{color:"blue"}}>{item.title}</h6>
                                <p>{item.body}</p>

                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}


export default Home;