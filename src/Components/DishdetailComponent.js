import React from 'react'
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                {comments.map((comm)=>{
                    return(
                        <ul className ='list-unstyled' key = {comm.id}>
                        <li>
                            <div>{comm.comment}</div>
                            <div>{`-- ${comm.author} , ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comm.date)))}`}</div>
                        </li>
                        </ul>
                    )  
                })}
            </div>)
        }
        else{
            return(<div/>)
        }
    }
const DishDetail=(props)=>{
        const dish=props.dish;
        
        if(dish == null || dish === undefined) return (<div></div>)
        return(
        
            <div>
                <div className="container">
                    <div className="row" >
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    </div>
                    <div className="row">
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