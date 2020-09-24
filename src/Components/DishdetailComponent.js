import React,{Component} from 'react'
import { Card ,CardBody,CardImg,CardText,CardTitle} from 'reactstrap';
class DishDetail extends Component{
    constructor(props){
        super(props);
    }

    renderDish(dishh){
        return(
            <div row="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg width="100%" src={dishh.image} alt={dishh.name}></CardImg>
                                <CardBody>
                                    <CardTitle>{dishh.name}</CardTitle>
                                    <CardText>{dishh.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
        )
    }
    renderComments(comments){
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
    render(){
        const dishh=this.props.selectedDish;
        if(dishh == null || dishh == undefined) return (<div></div>)
        return(
        
            <div>
                <div className="container">
                    <div className="row" >
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(dishh)}
                        </div>
                         <div className="col-12 col-md-5 m-1">
                            {this.renderComments(dishh.comments)}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
export default DishDetail;