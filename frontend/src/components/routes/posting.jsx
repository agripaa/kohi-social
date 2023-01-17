import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Posting = () => {
    const [ values, setValues ] = useState({
        name: "",
        desc: ""
    });
    const [ file, setFile ] = useState("")
    const [ preview, setPreview ] = useState("")
    const [ error, setError ] = useState(false);

    const navigate = useNavigate();
    const baseURL = "http://localhost:5000/postings";

    function loadPhoto(e) {
        const img = e.target.files[0];
        setFile(img);
        setPreview(URL.createObjectURL(img));
    } 

    async function handleSubmit(e){
        e.preventDefault();
        const { name, desc } = values;
        const formData  = new FormData();
        formData.append('name', name);
        formData.append('desc', desc);
        formData.append('file', file);
        try {
            const result = await axios.post(baseURL, formData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if(result.status >= 400) return alert("Data invalid")
            navigate('/')
        } catch (err) {
            console.error(err);
            // window.location.href = "/error"
        }
    }

    function handleChange(e) {
        setValues({...values,[e.target.name]: e.target.value});
    }

  return (
    <>
        <div className="container">
            <div className="form__content">
                <div className="header__form">
                    <img src="" alt="logo" />
                    <h1>Kohi Social</h1>
                </div>
                <div className="body__form">
                    <form onSubmit={e => handleSubmit(e)}>
                        <input 
                        type="text"
                        placeholder='Jhon well'
                        name='name'
                        onChange={e => handleChange(e)}
                        />
                        <input 
                        type="text"
                        placeholder='desc...'
                        name='desc'
                        onChange={e => handleChange(e)}
                        />
                        <input 
                        type="file"
                        placeholder='input file'
                        name='file'
                        onChange={e => loadPhoto(e)}
                        />
                        {preview ? (
                            <figure className="image is-128x128">
                                <img src={preview} alt="preview image" />
                            </figure>
                        ):("")}
                        <button type='submit'>Create</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Posting
