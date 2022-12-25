import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPeople, BsPerson } from 'react-icons/bs';
import { FiPlusSquare, FiSettings } from 'react-icons/fi';
import { SlOptions } from 'react-icons/sl';
import profile from '../images/profile.jpg'
import RandomPost from './randomPost';
import Loading from './loading';
import './mainPages.css';
import './loading.css';

const MainPages = () => {
    const [postings, setPostings] = useState([]);
    const [loading, setLoading] = useState(false);

    const baseURL = "http://localhost:5000/postings"


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
            setLoading(false)
        } catch (err) {
            setLoading(false)
            window.location.href = "/error"
        }
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
                                                            <SlOptions />
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
                        
                    </div>
                </div>
            </section>
        </div>
    </>
  )
}

export default MainPages

// {postings.slice(1, 3).map((posting, i) => {
//     return(
//         <>
//             <div className="card" key={i}>
//                 <div className="left__content">
//                     <div className="img__user">
//                         <img src={posting.url} alt={posting.name} />
//                     </div>
//                 </div>
//                 <div className="right__card">
//                     <div className="name__user">
//                         <h5>{posting.name}</h5>
//                     </div>
//                     <div className="desc__user">
//                         <p>{posting.desc}</p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// })}
