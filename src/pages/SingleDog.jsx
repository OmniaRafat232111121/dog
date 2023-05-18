import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const SingleDog = () => {
    const [dog, setDog] = useState([]);
    const {name}=useParams();
    useEffect(()=>{
        const fetchsingleDog=async()=>{
           try{
            const res=await fetch (`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
            const data=await res.json();
            setDog(data);
           }
           catch(error){
            console.log(error)
           }
        }
        fetchsingleDog();

    },[name])

  return (
    <section className="max-w-full h-screen flex items-center justify-center    bg-green-800">
    {dog.map((item) => (
                <div key={item.id} className="grid grid-cols-2 gap-8 p-8 md:grid-cols-2 md:place-items-center ">
                    <article>
                        <img src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`} alt=""/>
                    </article>
                    <article className='text-left '>
                        {item.description && <p>{item.description}</p>}
                        <ul className="text-sm text-slate-400 leading-loose lg:text-base lg:leading-relaxed  ">

                            <li>
                            <span className="font-bold text-slate-200">Bredfor:</span>{" "}
                                {item.bred_for}
                            </li>
                            <li>
                            <span className="font-bold text-slate-200">Height:</span>{" "}
                                {item.height.metric} cm
                                </li>
                            <li>
                            <span className="font-bold text-slate-200">Weight:</span>{" "}
                                {item.weight.metric} kgs
                            </li>
                            <li>
                            <span className="font-bold text-slate-200">Breedgroup:</span>{" "}
                                {item.breed_group}
                            </li>
                            <li>
                               <span className="font-bold text-slate-200">Lifespan:</span> 
                               {item.life_span}
                               </li>
                            <li>
                              <span className="font-bold text-slate-200">Temperament:</span>{" "}
                                {item.temperament}
                            </li>
                        </ul>
                <Link
                to="/"
                className="inline-block  bg-slate-600 py-2 px-6 rounded mt-8 text-white hover:bg-slate-500 transition-all duration-200"
              >
                &larr; Back
              </Link>
                    </article>
                    </div>
            ))}
        

      
    </section>
  )
}

export default SingleDog
