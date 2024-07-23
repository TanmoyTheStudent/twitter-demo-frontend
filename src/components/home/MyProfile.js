import {useSelect,useEffect} from 'react'
import Account from '../userAuthorization/Account'
import { Card, Row, Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { getMyTweetsRequest  } from "../../state-management/actions/tweets-action-saga"

function MyProfile() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMyTweetsRequest())
        console.log("dispatched")
      }, [dispatch])
  
    const tweets = useSelector((state) => {
        return state.tweets.myTweets
     })

  return (
    <div className='row'>

       <div className='col-4 col-sm-2 col-md-2 col-lg-2 bg-light' style={{height:'535px'}} >

        <Account/>
     
    
    </div>

    <div className='col-6 col-sm-6 col-md-8 col-lg-8 '>
   
            
{tweets.length>0 &&
  
  <ul>
    { tweets.map((ele) => {
                
               return (
                

                   <div className='bg-light p-2 border-bottom border-dark col-7' key={ele._id}>
                         
                    <Card>
                    <Card.Body>
                      <Row>
                        <Col>
                          <h4>{ele.user.username}</h4><br/>
                            {ele.text}<br/>
                            <img src={`http://localhost:3033/${ele.image}`} alt="Image" style={{height:"300px",width:"250px",border:"2px solid black",margin:"50px"}}/>
                        </Col>

                        </Row>
                      </Card.Body>
                    </Card>
                                          
                 </div>
                        )
                        
})}
                                        

        </ul>
                          
}
    </div>
    </div>
  )
}

export default MyProfile