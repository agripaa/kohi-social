import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomPost = () => {
    const [ random, setRandom ] = useState();
    const [ loading, setLoading ] = useState(false);
    const baseURL = "http://localhost:5000/postings";

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        setLoading(true);
        try {
            await axios.get(baseURL)
            .then(({data}) => {
                setLoading(false);
                setRandom(data.datas);
            })
        } catch (err) {
            console.error(err);
            setLoading(false)
            window.location.href = "/error"
        }
    }

    function sample(arr, req) {
        arr = arr.sort(()=>{ return 0.5 - Math.random() }) ;
        let i = 0,
            array = [];
        while (i < req) {
            array.push(arr[i])
                ++i
                break;
        }
        return array
    }

    let randomPost = sample(random, 2) 

  return (
    <>
     {randomPost.map((posting, i) => {
        return(
            <>
                <div className="card" key={i}>
                    <div className="left__content">
                        <div className="img__user">
                            <img src={posting.url} alt={posting.name} />
                        </div>
                    </div>
                    <div className="right__card">
                        <div className="name__user">
                            <h5>{posting.name}</h5>
                        </div>
                        <div className="desc__user">
                            <p>{posting.desc}</p>
                        </div>
                    </div>
                </div>
            </>
            )
        })}
    </>
  )
}

export default RandomPost