import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../state-management/context/AuthContext'
import { Card, Row, Col } from 'react-bootstrap'



//searching
import { useDispatch,useSelector } from 'react-redux'
import { getTweetsRequest  } from "../../state-management/actions/tweets-action-saga"

import TweetForm from './TweetForm'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Home(props) {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const[loadNum,setLoadNum]=useState(1)
 

const{tweets,socket,totalTweets}=props
const {user}=useAuth()
//console.log("tweets in home.js",tweets)

//modal
const [modal, setModal] = useState(false);
    //const {data} = props.products 

    const toggle = () => {
        setModal(!modal)
        //dispatch(setServerErrors([]))
    }

useEffect(() => {
  // Fetch original data when the component mounts
 // dispatch(startGetOffices(''));

  // Clear search results when component unmounts
  return () => {
    setSearch('');
    dispatch(getTweetsRequest());
    setLoadNum(1)
  };
}, [dispatch])

// handleChange
  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);

    // Invoke debounced search function
   // handleSearch(value);
  }

  // Debounce function
  // const debounce = (func, delay) => {
  //   let timeoutId;
  //   return function (...arg) {
  //     console.log(arg)
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {func(arg[0])}, delay);
  //   };
  // };

  // Function to handle searching
  // const handleSearch = debounce((name) => {
  //   // Perform search operation using the search term
  //   console.log(name)
  //   dispatch(getTweetsRequest(name))
  //   // Here you can call your API or perform any other search operation
  // }, 1000); // Adjust the delay as needed (e.g., 300 milliseconds)

//handling the button
// const handleClick=(e)=>{
//   dispatch(getTweetsRequest(1,search))
//   socket.emit("sendNotification", {
//     search
//   });
// }

const handlePost=()=>{
  if (user){
    toggle()
  }else{
    alert("You must login to post")
  }
}

const handleClick = (e) => {
  dispatch(getTweetsRequest(1, search));

  setTimeout(() => {
    socket.emit("sendNotification", {
      search,socketId:socket.id
    });
  }, 500);  // Adjust the delay time as needed

  setSearch("")
};

const handleClick2=(e)=>{
  setLoadNum(loadNum+1)
  if(search==""){
    dispatch(getTweetsRequest(loadNum))
  }else{
    dispatch(getTweetsRequest(loadNum,search))
  }

}

 // console.log("search in home",search)



  return (
  <div className='row'>

       <div className='col-4 col-sm-2 col-md-2 col-lg-2 bg-light' style={{height:'535px'}} >

        <button className="btn btn-primary m-2" onClick={handlePost}>POST A TWEET</button>
     
    
    </div>

  <div className='col-6 col-sm-6 col-md-8 col-lg-8 '>
    <div className=' p-3 offset-2 bg-light' >
  <input
                type="text"
                placeholder="search username"
                value={search}
                onChange={handleChange}
            />{"   "}
     <button className="btn btn-primary" onClick={handleClick}>Search</button>
    </div>
            
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

{tweets.length!==0 && 
tweets.length!==totalTweets ?
<button onClick={handleClick2}>Load More..</button>:(tweets.length==0?<p style={{color:"red"}}>No tweet is found</p>:<p style={{color:"red"}}>No more tweets to upload</p>)
}



</div>
<Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> Post a Tweet</ModalHeader>
        <ModalBody>
            {/* <TweetForm myTweet={myTweet} editId={editId} toggle={toggle} /> */}
            <TweetForm  toggle={toggle} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal> 

</div>

  )
}

export default Home