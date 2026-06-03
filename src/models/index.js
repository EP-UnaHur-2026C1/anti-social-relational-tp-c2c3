import User from './User.js';
import Post from './Post.js';
import PostImage from './PostImage.js';
import Comment from './Comment.js';
import Tag from './Tag.js';


User.hasMany(Post, { foreignKey: 'user_nickName', sourceKey: 'nickName'  });
Post.belongsTo(User, { foreignKey: 'user_nickName', targetKey: 'nickName' });

Post.hasMany(PostImage, { foreignKey: 'post_id' });
PostImage.belongsTo(Post, { foreignKey: 'post_id' });


User.hasMany(Comment, { foreignKey: 'user_nickName', sourceKey: 'nickName' });
Comment.belongsTo(User, { foreignKey: 'user_nickName', targetKey: 'nickName' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

Post.belongsToMany(Tag, { through: 'Post_Tags', foreignKey: 'post_id' });
Tag.belongsToMany(Post, { through: 'Post_Tags', foreignKey: 'tag_id' });


export { User, Post, PostImage, Comment, Tag };