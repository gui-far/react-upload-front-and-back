//Router...
const routes = require('express').Router();

//Upload lib
const multer = require('multer')

//Multer cfg
const multerConfig  = require('./config/multer')

const Post = require('./models/Post')


/*************GET************** */
/*************GET************** */
routes.get('/posts', async(req, res) => {
    
    const posts = await Post.find();

    return res.json(posts);
})

/*************POST************** */
/*************POST************** */

//multer().single('file') => Will allow only one file upload for each request
//multer().array('file') => Will allow more than 1
//But with single options you will be able to manager each upload progression

//'file' => The field name used for the upload

routes.post('/posts', multer(multerConfig).single('file'), async (req, res)=> {
    
    //url = "" if url not defined
    const { originalname: name, size, key, location: url = "" } = req.file;
        
    const post = await Post.create({
        name,
        size,
        key,
        url
    })

    return res.json(post);
})


/*************DELETE************** */
/*************DELETE************** */

routes.delete('/posts/:id', async(req, res) => {

    const post = await Post.findById(req.params.id)

    await post.remove();

    return res.send();
})

module.exports = routes;