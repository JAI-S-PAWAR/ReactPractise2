import React, { Component } from 'react'
import {Card,CardImg,CardText,CardBody,CardTitle,Modal,ModalHeader,ModalBody,Breadcrumb,BreadcrumbItem,Button,Row,Col,Label} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from 'react-router-dom';

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

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
function RenderComments({comments, addComment, dishId}){
        if(comments!=null){
            return(
            <div row="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map((comm,i)=>{
                    return(
                        <ul className ='list-unstyled' key = {comm.id}>
                        <li>
                            <div>{comm.comment}</div>
                            <div>{`-- ${comm.author} , ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comm.date)))}`}</div>
                        </li>
                        </ul>
                    )  
                })}
                <CommentForm dishId={dishId} addComment={addComment}/>
            </div>)
        }
        else{
            return(<div/>)
        }
    }
const DishDetail=(props)=>{
        const dish=props.dish;
        const comments=props.comments;
        
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
                            <RenderComments comments={comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}/>
                    </div>
                    </div>
                    

                </div>
            </div>
        );
    }

class CommentForm extends Component{
    
    constructor (props) {
		super (props)
		this.state = {
			isModalOpen: false
		}
		this.toggleModal = this.toggleModal.bind(this)
    this.handleAddComment = this.handleSubmit.bind(this)    
    }
    
    toggleModal () {
		this.setState ({
			isModalOpen: !this.state.isModalOpen
		})
    }

    handleSubmit (values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
	  }
    
    render(){
		return (
			<div>
				<Button outline onClick = {this.toggleModal}><span className = 'fa fa-pencil fa-lg'></span> Add Comment</Button>
				<Modal isOpen = {this.state.isModalOpen} toggle = {this.toggleModal} >
					<ModalHeader toggle = {this.toggleModal} >Submit Comment</ModalHeader>
                    <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  Rating
                </Label>
                <Col md={{ size: 12 }}>
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={12}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows={5}
                    className="form-control"
                  />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
				</Modal>
			</div>
		)
	}
}

export default DishDetail;