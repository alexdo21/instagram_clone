import React, { Component } from 'react';

// redux
import { connect } from 'react-redux'
import { get_post } from '../app/actions/PostActions'
import { get_comments, get_replies, like_comment, add_comment, reply_comment } from '../app/actions/CommentActions'
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
import {List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core'


// material-ui icons
import MoreHoriz from '@material-ui/icons/MoreHoriz'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined'
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';

const useStyles = theme => ({
    base: {
        flexDirection: 'column',
        marginTop: 50,
        marginBottom: 50 
    },
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto'
    },
    cover: {
        width: '92%'
    },
    commentSection: {
        width: '100%',
        maxWidth: '36ch',
        maxHeight: "100%",
        overflow: "auto"
    },
    inline: {
        display: 'inline',
    }
})
class PostLandscape extends Component {
    constructor() {
        super()
        this.state = {
            comment_content: ""
        }
    }
    
    componentDidMount() {
        this.props.get_post()
        this.props.get_comments()
        console.log(this.props.post)
        console.log(this.props.comments)
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state.comment_content)
        console.log(this.props.comments)
    }

    // handles adding comment
    handleSubmit = async e => {
        e.preventDefault()
        const data = { 
            post_id: this.props.post.id,
            content: this.state.comment_content
        }
        await this.props.add_comment(data)
        await this.props.get_comments()
        this.setState({comment_content: ""})
        this.refs.commentForm.reset()

    }

    handleLike = async e => {
        await this.props.like_comment(e)
        await this.props.get_comments()
    }

    handleReply = async e => {
        this.setState({comment_content: `@${e.target.value} `})
    }

    render() {
        const { classes } = this.props

        return (
            <Container>
                <Paper className={classes.base} elevation={3}>
                    <Card className={classes.root}>
                        <CardMedia 
                            className={classes.cover}
                            image={this.props.post.post_media}
                            title="Image"
                        />
                        <div className={classes.details}>
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
                            <Divider />

                            <CardContent>
                                <List style={{maxHeight: 400, maxWidth: '100%', overflow: 'auto'}}>
                                    {this.props.comments.map((comment) =>
                                        <ListItem key={comment.id} alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt={comment.comment_user} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={`${comment.comment_user} ${comment.content}`}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="subtitle1"
                                                            className={classes.inline}
                                                        >
                                                        {comment.time} {comment.likesCount} likes
                                                        <Button value={comment.comment_user} onClick={this.handleReply.bind(this)}>reply</Button>
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                            <IconButton sizeSmall edge="end" onClick={(e) => this.handleLike(comment.id)}>
                                                <FavoriteBorderOutlinedIcon />
                                            </IconButton>
                                        </ListItem>
                                    )}
                                </List>

                                <Divider />

                                <CardActions disableSpacing>
                                    <IconButton aria-label="like post">
                                        <FavoriteBorderOutlinedIcon />
                                    </IconButton>
                                    <IconButton aria-label="comment post">
                                        <ModeCommentOutlinedIcon />
                                    </IconButton>
                                    <IconButton aria-label="send post">
                                        <SendOutlinedIcon />
                                    </IconButton>
                                    <IconButton aria-label="bookmark post">
                                        <BookmarkBorderOutlinedIcon />
                                    </IconButton>
                                </CardActions>

                                <div className="post-likes">
                                    <Typography variant="h6">
                                        {this.props.post.likesCount} likes
                                    </Typography>
                                </div>
                                <div className="post-time">
                                    <Typography variant="h7">
                                        { this.props.post.time }
                                    </Typography>
                                </div>

                                <div className="add-comment">
                                    <form ref="commentForm" onSubmit={this.handleSubmit.bind(this)}>
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

PostLandscape.propTypes = {
    get_post: PropTypes.func.isRequired,
    get_comments: PropTypes.func.isRequired,
    like_comment: PropTypes.func.isRequired,
    add_comment: PropTypes.func.isRequired,
    reply_comment: PropTypes.func,
    post: PropTypes.object.isRequired,
    comments: PropTypes.array
}

const mapStateToProps = state => ({
    post: state.Post.post,
    comments: state.Comments.comments
})

export default connect(mapStateToProps, { get_post, get_comments, get_replies, like_comment, add_comment, reply_comment})(withStyles(useStyles)(PostLandscape));