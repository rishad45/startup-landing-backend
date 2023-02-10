const buffer = require('buffer');
const cloudinary = require('../cloudinary')
const repository = require('../Repositories/indexRepo');
const DatauriParser=require("datauri/parser");
const parser = new DatauriParser();
const path = require('path')

module.exports = {
    // API to create testimonials
    createTestimonial: async (req, res) => {
        try {
            console.log("req.file object",req.file)
            const extName = path.extname(req.file.originalname).toString();
            const file64 = parser.format(extName, req.file.buffer);

            cloudinary(file64.content).then(async (result) => {
                console.log('res after post', result)
                const payload = {
                    ...req.body,
                    photo: result,
                }
                await repository.createTestimonial(payload)
                .then((result) => {
                    return res.status(200).send({message: 'Testimonial created succesfully'})
                })
                .catch((err) => {
                    return res.status(403).send({message: `can't create Testimonial`})
                })
            })
            .catch((err) => {
                return res.status(403).send({message: `can't create Testimonial`})
            })
              
        } catch (error) {
            console.log(error)
            return res.status(500).send({message: 'Internal Server error'});
        }
    },

    // API to fetch all testimonials
    viewTestimonials: async (req, res) => {
        console.log('requested')
        try {
            await repository.fetchTestimonial().then(result => {
                console.log('fetched', result)
                return res.status(200).send({message: 'Fetched succefully', result})
            })
        } catch (error) {
            console.log('error is',error);
           return res.status(500).send({message: 'Internal server error'})
        }
    },

    // API to edit testimonials
    editTestimonial: async (req,res) => {
        try {
            await repository.editTestimonial(req.body)
            .then( result => {
                if(result?.modifiedCount === 1) return res.status(200).send({message: 'Testimonial succefully Edited'})
                return res.status(403).send({message: `can't Edit Testimonial`})
            })
        } catch (error) {
            
        }
    },

    // API to delete testimonial
    deleteTestimonial: async (req, res) => {
        try {
            await repository.deleteTestimonial(req.body.id)
            .then( result => {
                if(result?.modifiedCount === 1) return res.status(200).send({message: 'Testimonial succefully deleted'})
                return res.status(403).send({message: `can't delete Testimonial`})
            })
        } catch (error) {
           return res.status(500).send({message: 'Internal server error'});
        }
    },

}