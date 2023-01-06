import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getServerData } from "../helper/helper"

/* Redux Actions */
import * as Action from '../redux/question_reducer'

/** fetch question hook to fetch api data and set value to store **/ 
export const  useFetchQuestion = ()=>{
    const dispatch = useDispatch();
    const [getdata, setGetData] = useState({isLoading: false, apiData : [], serverError : null })

    useEffect(()=>{
        setGetData(prev => ({...prev, isLoading : true}));
        /* Async function fetch backed data */
        (async () =>{
            try{
                //let question = await Data;

                const [{ questions, answers }] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data)=> data)
                //console.log({ questions, answers })
                if(questions.length > 0){
                    setGetData(prev => ({...prev, isLoading : false}));
                    setGetData(prev => ({...prev, apiData : { questions, answers }}));

                    /* Dispatch an action */
                    dispatch(Action.startExamAction({ question: questions, answers }))
                }
                else{
                    throw new Error("No question available");
                }
            }
            catch(error){
                setGetData(prev => ({...prev, isLoading : false}));
                setGetData(prev => ({...prev, serverError : error}));
            }
        })();
    },[dispatch]);
    return [getdata, setGetData];
}



/* Move Action Dipatch function */
export const MoveNextQuestion = ()=>async(dispatch)=>{
    try{
        dispatch(Action.moveNextAction()); // Increase trace value by 1
    }catch(error){
        console.log(error)
    }
}

/* previous Action Dipatch function */
export const MovePrevQuestion = ()=>async(dispatch)=>{
    try{
        dispatch(Action.movePrevAction()); // Decrease trace value by 1
    }catch(error){
        console.log(error)
    }
}