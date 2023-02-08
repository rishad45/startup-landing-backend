const express = require('express');
const router = express();

const controller = require('../controllers/indexController');

router.post('/create-testimonials', controller.createTestimonial)

router.get('/view-testimonials', controller.viewTestimonials);

router.post('/edit-testimonial', controller.editTestimonial);

router.post('/delete-testimonial', controller.deleteTestimonial);

module.exports = router
