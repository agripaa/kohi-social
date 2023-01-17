import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPeople, BsPerson } from 'react-icons/bs';
import { FiPlusSquare, FiSettings } from 'react-icons/fi';
import { SlOptions } from 'react-icons/sl';
import profile from '../images/profile.jpg'
import Loading from './loading';
import Popup from './Popup';
import './mainPages.css';
import './loading.css';

const MainPages = () => {
    const [postings, setPostings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [btnPopup, setBtnPopup] = useState(false);

    const baseURL = "http://localhost:5000/postings"
    let RandNum1 = getRandomId(1, 5)
    let RandNum2 = getRandomId(1, 20)

    useEffect(() => {
        getPostings(); 
    },[])

    async function getPostings() {
        setLoading(true)
        try {
            await axios.get(baseURL)
        .then(({data}) => {
            setLoading(false)
            setPostings(data.datas)
        })
        } catch (err) {
            setLoading(false)
            window.location.href = "/error"
        }
    }

    

    async function deletePostings(posting){
        setLoading(true)
        try {
            await axios.delete(`${baseURL}/${posting}`)
            window.location.reload()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            window.location.href = "/error"
        }
    }

    function getRandomId(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    }

  return (
    <>
        <div className='content'>
            <section className='container'>
                <div className='wrapper'>
                    <div className="stand"></div>
                    <div className='sidebar'>
                        <ul className='links'>
                            <li><a className='link' href='/'><div><AiOutlineHome /></div> &nbsp; Beranda</a></li>
                            <li><a className='link' href='/friend-list'><div><BsPeople /></div> &nbsp; Friend</a></li>
                            <li><a className='link' href='/posting'><div><FiPlusSquare /></div> &nbsp; Posting</a></li>
                            <li><a className='link' href='/profile'><div><BsPerson /></div> &nbsp; Profile</a></li>
                        </ul>
                        <ul className='darkmode'>
                            <li><a className='link' href=""><FiSettings /> &nbsp; Setting</a></li>
                        </ul>
                    </div>
                    <div className="main">
                        <nav>
                            <h3>Kohi Social</h3>
                        </nav>
                        <div className='main__content'>
                            {loading ? (
                                <>
                                    <Loading />
                                </>
                            ) : (
                                <>
                                    {postings.map((posting, i) => {
                                        return(
                                            <div key={i} className='contents'>
                                                <div className="box">
                                                    <div className='header'>
                                                        <img src={profile} alt='profile' /> 
                                                        <div className="text">
                                                            <p>{posting.name}</p>
                                                            <p className='type'>user</p>
                                                        </div>
                                                        <div className="option">
                                                            <SlOptions
                                                            onClick={() => setBtnPopup(true)} 
                                                            />
                                                            <Popup 
                                                            trigger={btnPopup} 
                                                            setTrigger={setBtnPopup}>
                                                                <a 
                                                                onClick={() => deletePostings(posting.id)}
                                                                >Delete</a>
                                                            </Popup>    
                                                        </div>
                                                    </div>
                                                    <div className='images'>
                                                        <img src={posting.url} alt={posting.name} />
                                                    </div>
                                                    <div className='desc'>
                                                        <b>{posting.name}</b> 
                                                        <p>{posting.desc}</p>
                                                    </div>
                                                    <span>{posting.createdAt.split('T').join(' || ').split('Z').join('').split('.000')}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="stand"></div>
                    <div className='new__upload'>
                        {postings.slice(RandNum1, RandNum2).map((posting, i) => {
                            return(
                                <>
                                    <div className="card" key={i}>
                                        <div className="left__card">
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
                    </div>
                </div>
            </section>
        </div>
    </>
  )
}

export default MainPages

