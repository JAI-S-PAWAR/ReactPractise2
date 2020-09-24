import React from 'react'
import { Card ,CardBody,CardImg,CardText,CardTitle} from 'reactstrap';


function RenderDish({dish}){
        return(
            <div row="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
        )
    }
function RenderComments({comments}){
        if(comments!=null){
            return(
            <div row="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comm=>{
                    return(<div key={comm.id}>
                        <p>{comm.comment}</p>
                        <p>-- {comm.author}</p>
                    </div>)
                    
                })}
            </div>)
        }
        else{
            return(<div/>)
        }
    }
const DishDetail=(props)=>{
        const dish=props.selectedDish;
        
        if(dish == null || dish === undefined) return (<div></div>)
        return(
        
            <div>
                <div className="container">
                    <div className="row" >
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={dish}/>
                        </div>
                         <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={dish.comments}/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
export default DishDetail;