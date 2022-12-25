import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Posting = () => {
    const [ values, setValues ] = useState({
        name: "",
        desc: ""
    });
    const [ file, setFile ] = useState("")
    const [ preview, setPreview ] = useState("")

    const navigate = useNavigate();
    const baseURL = "http://localhost:5000/postings";
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      };

    function loadPhoto(e) {
        const img = e.target.files[0];
        setFile(img);
        setPreview(URL.createObjectURL(img));
    } 

    async function handleSubmit(e){
        e.preventDefault();
        const formData  = new FormData();
        formData.append('name', values.name);
        formData.append('desc', values.desc);
        formData.append('file', file);
        if(validateForm()){
            try {
                await axios.post(baseURL, formData,{
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                navigate('/')
            } catch (err) {
                console.error(err);
                window.location.href = "/error"
            }
        }
    }

    function validateForm(){
        const { name, desc } = values;
        if(name.length < 3) {
            toast.warn("Name cannot be less than 3 letters ", toastOptions);
            return false;
        }else if(desc.length < 200) {
            toast.warn("Your desc is too long", toastOptions);
            return false;
        }else if(name && desc === null) {
            toast.warn("Cannot be null", toastOptions);
            return false;
        }
        if(file.data.length > 5000000) return toast.warn(data.msg, toastOptions);
        return true;
    }

    function handleChange(e) {
        setValues({...values,[e.target.name]: e.target.value});
    }

  return (
    <div>
          <form onSubmit={e => handleSubmit(e)}>
          <div className="brand">
            <img src="" alt="logo" />
            <h1>Kohi Chat</h1>
          </div>
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
  )
}

export default Posting
