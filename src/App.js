import React, { useState, useEffect}from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import wordsToNumbers from 'words-to-numbers'

import logo1 from "./image/logo1.PNG";

import useStyles from './style.js';
import NewsCards from './components/NewsCards/NewsCards';

//got the key from alan
const alankey = '922624116d01b85174fc98160547d3cf2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = ( ) => {
    const [newsArticles, setNewsArticles] = useState([]); //empty array
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();
    
    //it is for intializing alan button
    useEffect(() => {
        alanBtn({
            key : alankey,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if (command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if(command === 'open') {
                    const parseNumber = number.length > 2 ? wordsToNumbers(number,{fuzzy : true}) : number;
                    const article = articles[parseNumber - 1];

                    if( parseNumber > 20){
                        alanBtn().playText('Please try that again.')
                    } else if(article){
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening.....')
                    }

                }

            }
        })
    }, [])

    return(
        <div>
            <div className = {classes.logoConatiner}>
                <img src = {logo1} className = {classes.alanlogo} alt = "alan logo"/>

            </div>
            <NewsCards articles = {newsArticles} activeArticle = {activeArticle}/>
        </div>
    )
}

export default App;