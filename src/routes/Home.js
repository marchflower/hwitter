import { addDoc, collection, getDocs } from '@firebase/firestore';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        const dbNweets = await getDocs(collection(dbService, "nweets"));
        dbNweets.forEach((document) => {
            setNweets((prev) => [document.data(), ...prev]);
        });
    }

    useEffect( () => {
        getNweets();    
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"),{
                nweet,
                createAt: Date.now(),
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (err){
            console.error("Error adding document: ", err);
        };

        setNweet("");
    };
    const onChange = (event) => {
        const { target: {value}, } = event;
        setNweet(value);
    };
    console.log(nweets);
    return (
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="submit" value="Nweet" />
        </form>
    )
};

export default Home;
