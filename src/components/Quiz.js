import React, { useEffect, useState } from 'react'
import Questions from './Questions'
import {MoveNextQuestion, MovePrevQuestion} from '../hooks/FetchQuestion'

/**  Redux store import **/
import { useSelector, useDispatch} from 'react-redux'
import { PushAnswer } from '../hooks/setResult'
import { Navigate } from 'react-router-dom'

export default function Quiz() {
    
    const[check, setChecked] = useState(undefined)
    const result = useSelector(state => state.result.result);
    const {queue, trace} = useSelector(state => state.questions);
    const dispatch = useDispatch()

    // useEffect(()=>{
    //    //console.log(state)
    // })

    /* Next button event handler*/
    function onNext(){
        //console.log('ON next click')
        if(trace < queue.length){
            /* update the trace value by one using move next action */
            dispatch(MoveNextQuestion());
            /* insert a new result in the array */
            if(result.length <= trace){
                dispatch(PushAnswer(check))
            }
        }

        /* reset the value of the checked variable */
        setChecked(undefined)
    }
    
    /* Previous button event handler*/
    function onPrev(){
        console.log('ON prev click')
        if(trace > 0){
            /* update the trace value by one using move next action */
            dispatch(MovePrevQuestion())
        }
         
    }

    function onChecked(check){
        //console.log(check)
        setChecked(check)
    }

    // finish exam after lasty question
    if(result.length && result.length>= queue.length){
        return <Navigate to={'/Result'} replace={true}></Navigate>
    }
  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>

        {/* Display Question */}
        <Questions onChecked={onChecked} />
        <div className='grid'>
            {trace > 0 ? <button className='btn prev' onClick={onPrev}>Previous</button> : <div></div>}
            <button className='btn next' onClick={onNext}>Next</button>
        </div>
    </div>
  )
}
