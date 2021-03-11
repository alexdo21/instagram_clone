import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Comment from './Comment'

// redux
import { connect } from 'react-redux'
import { get_post } from '../app/actions/PostActions'
import { get_comments, like_comment, add_comment } from '../app/actions/CommentActions'
import PropTypes from 'prop-types'

// style imports
import { withStyles } from '@material-ui/core/styles';

// material-ui components
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton'
import { Card, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core'

// material-ui icons
import MoreHoriz from '@material-ui/icons/MoreHoriz'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined'
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';


const useStyles = theme => ({
    base: {
        marginTop: 50,
        marginBottom: 50 
    },
    // root: {
    //     height: '100%'
    // },
    // details: {
    //     display: 'flex',
    // },
    media: {
      //height: '100%',
      //width: '100%'
        paddingTop: '56.25%' // 16:9
    },
    input: {
        // marginLeft: theme.spacing(1),
        // flex: 1,
        width: '87%'
    }

  });


class Post extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            comment_content: ""
        }
    }

    componentDidMount() {
        this.props.get_post()
        this.props.get_comments()
        console.log(this.props.post)
        console.log(this.props.comments)
        //this.setState({isLoading: false})
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = async e => {
        e.preventDefault()
        const data = { 
            post_id: this.props.post_id,
            time: "just now",
            comment_user: localStorage.getItem("user"),
            content: this.state.comment_content
        }
        await this.props.add_comment(data)
    }

    handleClick = async e => {
        await this.props.like_comment(e.target.value)
    }

    render() {
        const { classes } = this.props
        // if (this.state.isLoading) {
        //     return <div></div>
        // }
        return (
            <Container>
                <Paper className={classes.base} elevation={3}>
                    <Card className={classes.root}>
                        {/* HEADER */}
                        <CardHeader 
                            avatar={
                                <Avatar alt="Alice Dubin" src={this.props.post.user_avatar}/>
                            }
                            action={
                                <IconButton>
                                    <MoreHoriz />
                                </IconButton>
                            }
                            title={this.props.post.post_user}
                            subheader={this.props.post.post_location}
                        />
                        {/* 3 */}
                        <CardMedia
                            className={classes.media}
                            image={this.props.post.post_media}
                            title="Image"
                        />

                        {/* 4 */}
                        <div className={classes.details}>
                            <CardContent>
                                {/* 4a */}
                                <CardActions>
                                    <IconButton aria-label="like post" edgeStart>
                                        <FavoriteBorderOutlinedIcon />
                                    </IconButton>
                                    <IconButton aria-label="comment post" edgeStart>
                                        <ModeCommentOutlinedIcon />
                                    </IconButton>
                                    <IconButton aria-label="send post" edgeStart>
                                        <SendOutlinedIcon />
                                    </IconButton>
                                    <IconButton aria-label="bookmark post" edgeEnd>
                                        <BookmarkBorderOutlinedIcon />
                                    </IconButton>
                                </CardActions>

                                {/* 4b */}
                                <div className="post-likes">
                                    <Typography variant="h6">
                                        {this.props.post.likesCount} likes
                                    </Typography>
                                </div>

                                {/* 4c */}
                                <div className="wrapper">
                                    {/* 4c1 */}
                                    <Typography variant="body2">
                                        <p><strong> {this.props.post.post_user} </strong>
                                        { this.props.post.caption }
                                        </p>
                                    </Typography>

                                    {/* 4c2 */}
                                    <div className="comment-section">
                                        {/* 4c2a */}
                                        <Button component={Link} to="/landscape">View all {this.props.post.commentsCount} comments</Button>
                                        {/* 4c2b */}
                                        {/* 4c2c */}
                                        {this.props.comments.map((comment) =>
                                            <div>
                                                <Typography variant="body3">
                                                    <strong>{ comment.comment_user }</strong> { comment.content }
                                                </Typography>
                                                <IconButton sizeSmall edge="end" value={comment.id} onClick={this.handleClick.bind(this)}>
                                                    <FavoriteBorderOutlinedIcon />
                                                </IconButton>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 4d */}
                                <div className="post-time">
                                    <Typography variant="h7">
                                        { this.props.post.time }
                                    </Typography>
                                </div>

                                <Divider />
                                {/* 4e */}
                                <div className="add-comment">
                                    <form onSubmit={this.handleSubmit.bind(this)}>
                                        <IconButton>
                                            <SentimentSatisfiedOutlinedIcon />
                                        </IconButton>
                                        <InputBase
                                            className={classes.input}
                                            placeholder="Add a comment..."
                                            name="comment_content"
                                            onChange={this.handleChange.bind(this)}
                                        />
                                        <Button size="small" color="primary" type="submit">
                                            Post
                                        </Button>
                                    </form>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                </Paper>
            </Container>
        );
    }
}

Post.propTypes = {
    get_post: PropTypes.func.isRequired,
    get_comments: PropTypes.func.isRequired,
    like_comment: PropTypes.func.isRequired,
    add_comment: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    comments: PropTypes.array
}

const mapStateToProps = state => ({
    post: state.Post.post,
    comments: state.Comments.comments
})

export default connect(mapStateToProps, { get_post, get_comments, like_comment, add_comment})(withStyles(useStyles)(Post));