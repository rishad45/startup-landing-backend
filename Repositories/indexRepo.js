const testimonial = require('../models/testimonialModel');

module.exports = {
    // function to create testimonial
    createTestimonial: async ({ name, photo, post, description }) => {
        try {
            await testimonial.create({
                name,
                photo,
                post,
                description,
            }).then(res => {
                console.log(res)
                return true
            })
        } catch (err) {
            console.log(err)
            return err
        }
    },

    // function to edit testimonial
    editTestimonial: async ({id, name, post, description}) => {
        try {
            await testimonial.updateOne({_id: id},
                {$set: {
                    name,
                    post,
                    description,
                }}).then( res => {
                    if(res.modifiedCount === 1) return true
                    return false
                })
        } catch (error) {
            return error;
        }
    },
    // function to fetch all testimonial
    fetchTestimonial: async () => {
        try {
            return await testimonial.find({active: true})
        } catch (error) {
            console.log(error)
            return error;
        }
    },
    // function to delete testimonial
    deleteTestimonial: async (id) => {
        try {
            return await testimonial.updateOne({_id: id},{$set: { active: false }});
        } catch (error) {
            return error;
        }
    }
}