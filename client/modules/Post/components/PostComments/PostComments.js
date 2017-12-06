import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import ReactDOM from "react-dom";
// Import Style
import styles from './PostComments.css';


export default class PostComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
        newComment: {id: '', content: [] }
    }
  }
  componentDidMount() {
      console.log(this.props.post);
  }

  pushComment(e) {
    e.preventDefault();
    let userName = this.refs.userName.value,
        text = this.refs.comment.value,
        articleId = this.refs.data.getAttribute('data-reactid');
    if (this.state.newComment.content.length == 0) {
        let data = {id: articleId, content: [{user: userName, comment: text}] };
        this.setState({newComment: data});
    } else {
        let data = Object.assign({}, this.state.newComment);
        data.content.push({user: userName, comment: text});
        this.setState({newComment: data});
    }
    this.refs.userName.value = '';
    this.refs.comment.value = '';
  }

  render() {
    return (
      <div ref="data" className={styles['comments']} style={this.props.style} data-reactid={this.props['data-reactid']}>
          <form onSubmit={this.pushComment.bind(this)} id={styles['comment-panel']}>
              <input className={styles['form-field']} placeholder="Your name" ref="userName" required/>
              <textarea className={styles['form-field']} placeholder="your text..." ref="comment" required/>
              <button type="submit" htmlFor="comments" className={styles['post-submit-button']}>add comment</button>
          </form> 
          <div className={styles['comments-list']}>
          {
            this.state.newComment.content.map((item, i, arr) => {
                return  <div className={styles['user-comment']} key={arr.length++}>
                            <h3 className={styles['user-comment-name']}>{item.user}</h3>
                            <article>{item.comment}</article>
                            <button className={styles['delete-comment']} type="button">&times;</button>
                        </div>        
            })
          }
          </div>
      </div>
    )
  }
}
