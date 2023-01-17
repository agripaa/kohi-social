import Postings from '../Models/Posting.Model';
import path from 'path';
import fs from 'fs';

export const getPostings =  async(req, res) => {
    try {
        const result = await Postings.findAll();
        res.status(200).json({status: "OK", datas: result})
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "error!", error: err.message})
    }
}

export const getPostingsById =  async(req, res) => {
    try {
        const result = await Postings.findOne({
            where: {id: req.params.id}
        });
        if(!result) return res.status(404).json({msg: "data is not found"})
        res.status(200).json({status: "OK", datas: result})
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "error!", error: err.message})
        
    }
}

export const savePostings = async(req, res) => {
    const files = req.files;
    if(files === null) return res.status(400).json({msg: "No file uploaded!"});

    const {name, desc} = req.body;
    const file = files.file;
    const size = file.data.length;
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    const allowedTypePhotos = [
        '.png',
        '.jpg',
        'jpeg'
    ];

    if(!allowedTypePhotos.includes(ext.toLowerCase())) return res.status(422).json({msg: "invalid images"})
    if(size > 5000000) return res.status(422).json({msg: "image must be less than 5 MB"});
    file.mv(`./public/images/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message});

        try {
            await Postings.create({
                name:name,
                desc:desc,
                image:fileName,
                url:url
            });
            res.status(201).json({msg: "Product created successfully."});
        } catch (err) {
            console.error(err);
            res.status(500).json({msg: "error!", error: err.message})
        }
    })
}

export const updatePostings = async(req, res) => {
    let fileName;
    const files = req.files;
    const posting = await Postings.findOne({where: {id: req.params.id}})

    if(!posting) return res.status(404).json({msg: 'Data not found'});

    if(files === null){
        fileName = Postings.image;
    }else{
        const file = files.file;
        const size = file.data.length;
        const ext = path.extname(file.name)
        fileName = file.md5 + ext;
        const allowedTypePhotos = [
            '.png',
            '.jpg',
            '.jpeg'
        ];
        if(!allowedTypePhotos.includes(ext.toLowerCase())) return res.status(422).json({msg: "invalid images"})
        if(size > 5000000) return res.status(422).json({msg: "image must be less than 5 MB"});

        const filePath = `./public/images/${posting.image}`
        fs.unlinkSync(filePath)

        file.mv(`./public/images/${fileName}`, err => {
            if(err) return res.status(500).json({msg: err.message});    
        })
    }

    const { name, desc } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    try {
        const result = await Postings.update({
            name: name,
            desc: desc,
            image: fileName,
            url: url
        },{
            where: {
                id: req.params.id
            }
        })

        if(!result) return res.status(404).json({msg: 'Data not found'});   
        res.status(200).json({msg: 'product updated successfully'})
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "error!", error: err.message})
    }
}

export const deletePostings = async(req, res) => {
    const posting = await Postings.findOne({
        where: {
            id: req.params.id
        }
    })

    if(!posting) return res.status(404).json({msg: 'Data not found'});

    try {
        const filePath = `./public/images/${posting.image}`
        fs.unlinkSync(filePath);
        
        await Postings.destroy({
            where: {
                id: req.params.id
            }
        })
        
        res.status(202).json({msg: 'data deleted successfully'});
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "error!", error: err.message})
    }
}