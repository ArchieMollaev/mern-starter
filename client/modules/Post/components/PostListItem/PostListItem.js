import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Comments from '.././PostComments/PostComments';
// Import Style
import styles from './PostListItem.css';


class PostListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showComments: false,
            hideStyle: {},
            icon: ''
        }
    }

    showComments() {
        if (this.state.showComments == false) {
            this.setState({showComments: true,
                           hideStyle: {maxHeight: "500px"},
                           icon: '✖'
            })
        } else {
            this.setState({hideStyle: {maxHeight: 0},
                           icon: ''
            });
            setTimeout(() => {
                this.setState({showComments: false});
            }, 400)
        } 
    }

    render() {
        let showCommentsPanel = () => {
            if (this.state.showComments == true) {
                return <Comments style={this.state.hideStyle} data-reactid={this.props.post.cuid} />
            }
        }
        return (
          <div className={styles['single-post']}>
            <h3 className={styles['post-title']}>
              <Link to={`/posts/${this.props.post.slug}-${this.props.post.cuid}`} >
                {this.props.post.title}
              </Link>
            </h3>
            <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.post.name}</p>
            <p className={styles['post-desc']}>{this.props.post.content}</p>
            <p className={styles['post-action']}><a href="#" onClick={this.props.onDelete}><FormattedMessage id="deletePost" /></a></p>
            <button type="button" className={styles['show-comments']} 
                                  onClick={this.showComments.bind(this)}>✍ Comments 
                                  <span className={styles['close-comments']}> {this.state.icon}</span></button>
            {showCommentsPanel()}
            <hr className={styles.divider} />
          </div>
        );
    }
}


PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
