import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    const [dogs,setDogs]=useState([]);
    const [text,setText]=useState();
    const [searched, setSearched] = useState(false)

    useEffect(()=>{
     const fetchDogs = async()=>{
       try{
        const res=await fetch('https://api.thedogapi.com/v1/breeds');
        const data= await res.json();
        setDogs(data);
        setSearched(false)
       
     }
     catch(err){
        console.error(err)
     }
    }
    fetchDogs();
    },[])
    const searchdog=async()=>{
        try{
            const res=await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${text}`);
            const data=await res.json();
            setDogs(data);
        }catch(error){
            console.error(error)
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        searchdog();
        setSearched(true)

    }
  return (
    <>
       {!dogs ?
        <div className='flex items-center justify-center font-bold uppercase h-screen text-3xl bg-slate-900 text-white transition-all duration-150'>
         Loading..
       </div>:(
        <section className='p-8 max-w-full h-full mx-auto  bg-slate-900'>     
        <div>
            <h2 className='flex items-center justify-center text-center px-5 text-3xl font-bold lg:text-5xl text-white'>The Dog App</h2>
            <p className=' my-8 text-white'>The Application powered By {" "}
            <a
                  href="https://thedogapi.com"
                  className="text-indigo-600 underline active:text-orange-400"
                >
                  The Dog Api
                </a>
            </p>

            <form 
            className='max-w-xl mx-auto'
            onSubmit={handleSubmit}
            autoComplete="off"
            
            >
                <input
                className='px-4 py-2 rounded shadow bg-slate-400 placeholder-white text-white border-none outline-0 w-full'
                type='text'
                value={text}
                id="search"
                name="search"
                placeholder="Search for a dog / breed"
                onChange={(e)=>setText(e.target.value)}
                
                />
            </form>
            

        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 my-20 lg:my-20'>
            {!searched ? (
          dogs.map((dog)=>{
            return(
              <Link 
              to={`/${dog.name}`}
              className='bg-slate-700 rounded hover:bg-slate-300  transition-all duration-200 '
              >
                <article key={dog.id} className='px-4 py-3'>
                 
                   <img
                     src={dog.image.url}
                    alt={dog.id}
                    loading='lazy'
                    className='rounded w-full h-72 object-cover '/>
                    <h3 className="text-slate-400  hover:text-slate-900 mt-3 " >{dog.name}</h3>
                    <p className="text-slate-400  hover:text-slate-900 p-2 ">Bred For: {dog.bred_for}</p>
                </article>
              </Link>
            )
        })
            ):(
               <>
               {dogs.map((dog)=>{
                return(
                  <Link 
                  to={`/${dog.name}`}
                  className='bg-slate-700 rounded hover:bg-slate-300  transition-all duration-200 '
                  >
                    <article key={dog.id} className='px-4 py-3'>
                     
                       <img

                      src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}

                        alt={dog.id}
                        loading='lazy'
                        className='rounded w-full h-72 object-cover '/>
                        <h3 className="text-slate-400  hover:text-slate-900 mt-3 " >{dog.name}</h3>
                        <p className="text-slate-400  hover:text-slate-900 p-2 ">Bred For: {dog.bred_for}</p>
                    </article>
                  </Link>
                )
            })}
               </>
            )}
            
        </div>
        </section>
       
       )}
      
    </>
  )
}

export default Home
